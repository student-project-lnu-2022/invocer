from django.shortcuts import render, get_object_or_404
from .models import AdditionalUnit, Item
from .itemserializer import AdditionalUnitSerializer, ItemSerializer
from django.http import JsonResponse
from clients.views import get_user_from_jwt
from rest_framework.permissions import IsAuthenticated
from rest_framework import viewsets
from rest_framework.parsers import JSONParser

class ItemViewSet(viewsets.ViewSet):
    model = Item
    queryset = Item.objects.all()
    serializer_class = ItemSerializer
    permission_classes = [IsAuthenticated]

    def list(self, request):
        user = get_user_from_jwt(request.headers)
        items = Item.objects.filter(user_id=user['user_id'])
        items_json = ItemSerializer(items, many=True)
        data = {'content': items_json.data}
        return JsonResponse(data, status=200, safe=False)
    

    def create(self, request):
        data = JSONParser().parse(request)
        data["user"] = get_user_from_jwt(request.headers)['user_id']
        serializer = self.serializer_class(data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=200)
        return JsonResponse(serializer.errors, status=400)
    
    def destroy(self, request, item_id):
        user = get_user_from_jwt(request.headers)
        item = get_object_or_404(Item, id=item_id, user_id=user['user_id'])
        item.delete()
        return JsonResponse({}, status=204)

class UnitViewSet(viewsets.ViewSet):
    model = AdditionalUnit
    queryset = AdditionalUnit.objects.all()
    serializer_class = AdditionalUnitSerializer
    permission_classes = [IsAuthenticated]

    def create(self, request):
        data = JSONParser().parse(request)
        serializer = self.serializer_class(data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=200)
        return JsonResponse(serializer.errors, status=400)

