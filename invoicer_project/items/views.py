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
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)

    def destroy(self, request):
        user = get_user_from_jwt(request.headers)
        item_ids = request.data['elementsIds']
        items = Item.objects.filter(id__in=item_ids, user_id=user['user_id'])
        items.delete()
        return JsonResponse({}, status=204)
    
    def partial_update(self, request, item_id):
        try:
            user = get_user_from_jwt(request.headers)
            item = self.queryset.get(id=item_id, user_id=user['user_id'])
        except Item.DoesNotExist:
            return JsonResponse({'error': 'Item not found'}, status=404)
        request.data['user'] = user['user_id']
        serializer = ItemSerializer(item, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data)
        return JsonResponse(serializer.errors, status=400)
    def retrieve(self, request, item_id):
        item = self.queryset.get(id=item_id)
        if item is not None:
            serializer = ItemSerializer(item)
            return JsonResponse(serializer.data)
        else:
            return JsonResponse({'error': 'Item not found'}, status=404)
        
        
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
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)

    def destroy(self, request, additional_unit_id):
        additional_unit = get_object_or_404(AdditionalUnit, id=additional_unit_id)
        additional_unit.delete()
        return JsonResponse({}, status=204)

    def partial_update(self, request, additional_unit_id):
        try:
            additional_unit = self.queryset.get(id=additional_unit_id)
            user = get_user_from_jwt(request.headers)
            user_of_needed_item = additional_unit.item.user.pk
        except AdditionalUnit.DoesNotExist:
            return JsonResponse({'error': 'Additional unit not found'}, status=404)
        if user_of_needed_item != user['user_id']:
            return JsonResponse({'error': 'This user is trying to edit wrong unit.'}, status=400)
        serializer = AdditionalUnitSerializer(additional_unit, partial=True, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data)
        return JsonResponse(serializer.errors, status=400)

    def retrieve(self, request, additional_unit_id):
        additional_unit = self.queryset.get(id=additional_unit_id)
        if additional_unit is not None:
            serializer = AdditionalUnitSerializer(additional_unit)
            return JsonResponse(serializer.data)
        else:
            return JsonResponse({'error': 'Additional unit not found'}, status=404)
        
    def get_units_by_item_id(self, request, item_id):
        additional_units = AdditionalUnit.objects.filter(item_id=item_id)
        units_json = AdditionalUnitSerializer(additional_units, many=True)
        data = {'content': units_json.data}
        return JsonResponse(data, status=200, safe=False)


