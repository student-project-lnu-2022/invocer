from django.shortcuts import render
from .models import Item
from .itemserializer import ItemSerializer
from django.http import JsonResponse
from clients.views import get_user_from_jwt
from rest_framework.permissions import IsAuthenticated
from rest_framework import viewsets

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
