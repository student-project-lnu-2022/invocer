from .models import OrderedItem, Invoice
from .invoiceserializer import OrderedItemSerializer, InvoiceSerializer
from django.http import JsonResponse
from clients.views import get_user_from_jwt
from rest_framework.permissions import IsAuthenticated
from rest_framework import viewsets
from rest_framework.parsers import JSONParser
from django.http import HttpResponse
from .invoice import create_pdf
from django.core.mail import EmailMessage
from django.http import HttpResponse
from django.conf import settings
import os


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
        pdf = create_pdf(serializer, items)
        response = HttpResponse(pdf, content_type='application/pdf')
        response['Content-Disposition'] = f"attachment; filename=Invoice-{serializer.data['id']}.pdf"
        return response

    def send_email(self, request, invoice_id, recipient_email):
        try:
            user = get_user_from_jwt(request.headers)
            invoice = Invoice.objects.get(id=invoice_id, user_id=user['user_id'])
            ordered_items = OrderedItem.objects.filter(invoice=invoice_id)
        except Invoice.DoesNotExist:
            return JsonResponse({'error': 'Invoice not found'}, status=404)

        serializer = InvoiceSerializer(invoice)
        items = OrderedItemSerializer(ordered_items, many=True)
        pdf = create_pdf(serializer, items)

        email = EmailMessage(
            subject=f"{serializer.data['name']}",
            body='Насолоджуйтесь вашою накладною',
            from_email=settings.EMAIL_HOST_USER,
            to=[recipient_email],
        )
        email.attach(f"Invoice-{invoice_id}.pdf", pdf, 'application/pdf')
        try:
            email.send()
        except:
            return JsonResponse({'message': 'Failed to send email!'})
        return JsonResponse({'message': 'PDF was sent!'})

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
