from rest_framework import serializers
from .models import AdditionalUnit, Item


class ItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Item
        fields = '__all__'

class AdditionalUnitSerializer(serializers.ModelSerializer):
    class Meta:
        model = AdditionalUnit
        fields = '__all__'
