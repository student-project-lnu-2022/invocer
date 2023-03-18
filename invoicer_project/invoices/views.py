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
        except Invoice.DoesNotExist:
            return JsonResponse({'error': 'Invoice not found'}, status=404)
        serializer = InvoiceSerializer(invoice, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
        buffer = BytesIO()
        p = canvas.Canvas(buffer)
        pdfmetrics.registerFont(TTFont('TimesNewRoman', 'static/fonts/Royal_Times_New_Roman.ttf'))
        p.setFont('TimesNewRoman', 20)
        p.drawString(225, 800, f"{serializer.data['name']}")
        p.setFont('TimesNewRoman', 14)
        p.drawString(50, 765, f"Ціна накладної: {serializer.data['price']}")
        p.drawString(50, 748, f"Дата початку: {serializer.data['date_of_invoice']}")
        p.drawString(400, 750, f"Дата кінця: {serializer.data['date_of_payment']}")
        p.showPage()
        p.save()
        buffer.seek(0)
        response = HttpResponse(buffer, content_type='application/pdf')
        response['Content-Disposition'] = f'attachment; filename=invoice-{invoice.id}.pdf'
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