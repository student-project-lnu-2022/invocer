from django.shortcuts import render, get_object_or_404
from .models import OrderedItem, Invoice
from .invoiceserializer import OrderedItemSerializer, InvoiceSerializer
from django.http import JsonResponse
from clients.views import get_user_from_jwt
from rest_framework.permissions import IsAuthenticated
from rest_framework import viewsets
from rest_framework.parsers import JSONParser

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