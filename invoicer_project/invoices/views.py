from django.shortcuts import render, get_object_or_404
from .models import OrderedItem, Invoice
from .invoiceserializer import OrderedItemSerializer, InvoiceSerializer
from django.http import JsonResponse
from clients.views import get_user_from_jwt
from rest_framework.permissions import IsAuthenticated
from rest_framework import viewsets
from rest_framework.parsers import JSONParser
from django.http import HttpResponse
from io import BytesIO
from django.http import HttpResponse
from reportlab.pdfgen import canvas
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.platypus import Table, TableStyle


class InvoiceViewSet(viewsets.ViewSet):
    model = Invoice
    queryset = Invoice.objects.all()
    serializer_class = InvoiceSerializer
    permission_classes = [IsAuthenticated]

    def list(self, request):
        user = get_user_from_jwt(request.headers)
        invoices = Invoice.objects.filter(user_id=user['user_id'])
        invoices_json = self.serializer_class(invoices, many=True)
        data = {'content': invoices_json.data}
        return JsonResponse(data, status=200, safe=False)

    def create(self, request):
        data = JSONParser().parse(request)
        data["user"] = get_user_from_jwt(request.headers)['user_id']
        serializer = self.serializer_class(data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)

    def destroy(self, request):
        user = get_user_from_jwt(request.headers)
        invoice_ids = request.data['elementsIds']
        invoices = Invoice.objects.filter(id__in=invoice_ids, user_id=user['user_id'])
        invoices.delete()
        return JsonResponse({}, status=204)

    def download_data(self, request, invoice_id):
        try:
            user = get_user_from_jwt(request.headers)
            invoice = self.queryset.get(id=invoice_id, user_id=user['user_id'])
            ordered_items = OrderedItem.objects.filter(invoice=invoice_id)
        except Invoice.DoesNotExist:
            return JsonResponse({'error': 'Invoice not found'}, status=404)
        serializer = InvoiceSerializer(invoice, data=request.data, partial=True)
        items = OrderedItemSerializer(ordered_items, many=True)
        if serializer.is_valid():
            serializer.save()
        buffer = BytesIO()
        p = canvas.Canvas(buffer, pagesize=letter)
        pdfmetrics.registerFont(TTFont('TimesNewRoman', 'static/fonts/Royal_Times_New_Roman.ttf'))
        p.setFont('TimesNewRoman', 20)
        p.drawString(225, 760, f"{serializer.data['name']}")
        p.setFont('TimesNewRoman', 16)
        table_headers = ['Назва товару', 'Кількість', 'Ціна']
        table_header_x = 50
        table_header_y = 700
        table_header_spacing = 80
        for i, header in enumerate(table_headers):
            p.drawString(table_header_x + i * table_header_spacing, table_header_y, header)

        p.setFont('TimesNewRoman', 14)
        table_row_x = table_header_x
        table_row_spacing = table_header_spacing
        table_row_y = table_header_y - 30

        for i, data in enumerate(items.data):
            name = data['item_name']
            price = str(data['item_price'])
            amount = str(data['amount'])

            p.drawString(table_row_x, table_row_y - i * 30, name)
            p.drawString(table_row_x + table_row_spacing, table_row_y - i * 30, price)
            p.drawString(table_row_x + 2 * table_row_spacing, table_row_y - i * 30, amount)
        p.showPage()
        p.save()
        buffer.seek(0)
        response = HttpResponse(buffer, content_type='application/pdf')
        response['Content-Disposition'] = f"attachment; filename=Invoice-{serializer.data['id']}.pdf"
        return response


class OrderedItemViewSet(viewsets.ViewSet):
    model = OrderedItem
    queryset = OrderedItem.objects.all()
    serializer_class = OrderedItemSerializer
    permission_classes = [IsAuthenticated]

    def create(self, request):
        data = JSONParser().parse(request)
        serializer = self.serializer_class(data=data)
        if serializer.is_valid():
            try:
                serializer.save()
                return JsonResponse(serializer.data, status=201)
            except Exception as exc:
                return JsonResponse({"errors": str(exc)}, status=400)
        return JsonResponse(serializer.errors, status=400)