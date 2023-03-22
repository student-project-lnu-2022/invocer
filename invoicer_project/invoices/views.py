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
        pdfmetrics.registerFont(TTFont('TimesNewRoman', 'static/fonts/Roboto-Regular.ttf'))
        p.setFont('TimesNewRoman', 20)
        p.drawString(40, 740, f"{serializer.data['name']} від {serializer.data['date_of_payment'].split('-')[2]}.{serializer.data['date_of_payment'].split('-')[1]}.{serializer.data['date_of_payment'].split('-')[0]}р.")
        p.line(40, 730, 565, 730)
        p.setFont('TimesNewRoman', 13)
        p.drawString(40, 710, f"Постачальник:  {serializer.data['user_first_name']} {serializer.data['user_last_name']}")
        p.drawString(40, 690, f"Покупець:  {serializer.data['client_first_name']} {serializer.data['client_last_name']}")
        table_headers = ['№', 'Назва товару', 'К-сть', 'Од.', 'Ціна', 'Сума']
        table_header_x = 40
        table_header_y = 670
        table_row_x = table_header_x
        table_row_y = table_header_y - 30

        id_width = 30
        name_width = 300
        amount_width = 50
        unit_width = 40
        price_width = 45
        sum_width = 60

        p.setFont('TimesNewRoman', 11)
        for i, data in enumerate(items.data):
            item_id = str(i + 1)
            name = data['item_name']
            price = str(data['price'])
            amount = str(data['amount'])
            unit = str(data['unit'])
            sum_price = str(data["price"]*data["amount"])

            if i == 0:
                p.rect(table_row_x, table_row_y, id_width, 20)
                p.rect(table_row_x + id_width, table_row_y, name_width, 20)
                p.rect(table_row_x + id_width + name_width, table_row_y, amount_width, 20)
                p.rect(table_row_x + id_width + name_width + amount_width, table_row_y, unit_width, 20)
                p.rect(table_row_x + id_width + name_width + amount_width + unit_width, table_row_y, price_width, 20)
                p.rect(table_row_x + id_width + name_width + amount_width + unit_width + price_width, table_row_y,
                       sum_width, 20)

                p.drawString(table_row_x + 5, table_row_y + 5, table_headers[0])
                p.drawString(table_row_x + id_width + 5, table_row_y + 5, table_headers[1])
                p.drawString(table_row_x + id_width + name_width + 5, table_row_y + 5, table_headers[2])
                p.drawString(table_row_x + id_width + name_width + amount_width + 5, table_row_y + 5, table_headers[3])
                p.drawString(table_row_x + id_width + name_width + amount_width + unit_width + 5, table_row_y + 5,
                             table_headers[4])
                p.drawString(table_row_x + id_width + name_width + amount_width + unit_width + price_width + 5,
                             table_row_y + 5,
                             table_headers[5])
                table_row_y -= 20

            p.rect(table_row_x, table_row_y, id_width, 20)
            p.rect(table_row_x + id_width, table_row_y, name_width, 20)
            p.rect(table_row_x + id_width + name_width, table_row_y, amount_width, 20)
            p.rect(table_row_x + id_width + name_width + amount_width, table_row_y, unit_width, 20)
            p.rect(table_row_x + id_width + name_width + amount_width + unit_width, table_row_y, price_width, 20)
            p.rect(table_row_x + id_width + name_width + amount_width + unit_width + price_width, table_row_y,
                   sum_width, 20)

            p.drawString(table_row_x + 5, table_row_y + 5, item_id)
            p.drawString(table_row_x + id_width + 5, table_row_y + 5, name)
            p.drawString(table_row_x + id_width + name_width + 5, table_row_y + 5, amount)
            p.drawString(table_row_x + id_width + name_width + amount_width + 5, table_row_y + 5, unit)
            p.drawString(table_row_x + id_width + name_width + amount_width + unit_width + 5, table_row_y + 5, price)
            p.drawString(table_row_x + id_width + name_width + amount_width + unit_width + price_width + 5, table_row_y + 5, sum_price)
            table_row_y -= 20

        p.setFont('TimesNewRoman', 14)
        p.drawString(375, table_row_y - 20,f"Всього: {serializer.data['price']} {items.data[0]['item_currency']}")
        p.line(40, table_row_y - 50, 565, table_row_y - 50)
        p.drawString(40, table_row_y - 93, f"Від постачальника")
        p.drawString(310, table_row_y - 93, f"Отримав(ла)")
        p.line(40, table_row_y - 125, 280, table_row_y - 125)
        p.line(310, table_row_y - 125, 565, table_row_y - 125)

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