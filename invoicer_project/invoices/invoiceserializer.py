from rest_framework import serializers
from .models import OrderedItem, Invoice

class OrderedItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderedItem
        fields = '__all__'


class InvoiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Invoice
        fields = '__all__'


    def create(self, validated_data):
        invoice = Invoice.objects.create(**validated_data)
        invoice.update_client()
        invoice.save()
        return invoice