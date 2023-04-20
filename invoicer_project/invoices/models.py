import datetime
from django.db import models
from django.core.validators import RegexValidator
from clients.models import Client
from items.models import Item
from user.models import User
from django.db.models import F, Sum


float_number_validation = RegexValidator(
    regex=r'^\d+([., ]?(\d){1,2}?)?$',
    message="Amount has to be entered in the format: '25.55'."
)

unit_validation = RegexValidator(
    regex=r'^[a-zа-яіїєґA-ZA-ЯІЇЄҐ]+$',
    message="Unit has to be entered in the format: 'kg'."
)

currency_validation = RegexValidator(
    regex=r'^[A-Z]+$',
    message="Currency has to be entered in the format: 'UAH'."
)

class Invoice(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='invoices')
    name = models.CharField(max_length=100)
    client = models.ForeignKey(Client, on_delete=models.CASCADE, related_name='invoices')
    price = models.FloatField(validators=[float_number_validation], blank=True, default=0)
    discount = models.FloatField(validators=[float_number_validation], default=0)
    date_of_invoice = models.DateField()
    date_of_payment = models.DateField()
    currency = models.CharField(max_length=7, null=True, validators=[currency_validation])

    def update_client(self):
        client = Client.objects.get(id=self.client.id)
        client.debt += self.price
        client.save(update_fields=["debt"])


class OrderedItem(models.Model):
    invoice = models.ForeignKey(Invoice, on_delete=models.CASCADE, related_name='ordered_items')
    item = models.ForeignKey(Item, on_delete=models.CASCADE, related_name='ordered_items')
    amount = models.FloatField(validators=[float_number_validation])
    unit = models.CharField(max_length=10, validators=[unit_validation])
    price = models.FloatField(validators=[float_number_validation], default=True)

    def update_item(self, amount_in_unit):
        if self.item.amount_in_stock < amount_in_unit:
            raise Exception("Not enough amount in stock")
        item = Item.objects.get(id=self.item.id)
        item.amount_in_stock -= amount_in_unit
        item.save(update_fields=["amount_in_stock"])