from rest_framework import serializers
from clients.models import Client
from .models import OrderedItem, Invoice
from user.models import User


class OrderedItemSerializer(serializers.ModelSerializer):
    item_name = serializers.SerializerMethodField()
    item_price = serializers.SerializerMethodField()
    item_barcode = serializers.SerializerMethodField()
    item_currency = serializers.SerializerMethodField()
    amount_in_unit = serializers.FloatField(write_only = True)

    class Meta:
        model = OrderedItem
        fields = '__all__'

    def get_item_name(self, obj):
        return obj.item.name

    def get_item_price(self, obj):
        return obj.item.price

    def get_item_barcode(self, obj):
        return obj.item.barcode

    def get_item_currency(self, obj):
        return obj.item.currency
    
    def create(self, validated_data):
        amount = validated_data.pop('amount_in_unit')
        ordered_item = OrderedItem.objects.create(**validated_data)
        ordered_item.update_item(amount)
        ordered_item.save()
        return ordered_item


class InvoiceSerializer(serializers.ModelSerializer):
    client_first_name = serializers.SerializerMethodField()
    client_last_name = serializers.SerializerMethodField()
    user_first_name = serializers.SerializerMethodField()
    user_last_name = serializers.SerializerMethodField()

    class Meta:
        model = Invoice
        fields = '__all__'

    def get_client_first_name(self, obj):
        return obj.client.first_name

    def get_client_last_name(self, obj):
        return obj.client.last_name

    def get_user_first_name(self, obj):
        return obj.user.first_name

    def get_user_last_name(self, obj):
        return obj.user.last_name

    def create(self, validated_data):
        invoice = Invoice.objects.create(**validated_data)
        invoice.update_client()
        invoice.save()
        return invoice