import datetime
from django.db import models
from django.core.validators import RegexValidator
from clients.models import Client
from items.models import Item
from user.models import User


float_number_validation = RegexValidator(
    regex=r'^\d+([., ]?(\d){1,2}?)?$',
    message="Amount has to be entered in the format: '25.55'."
)

unit_validation = RegexValidator(
    regex=r'^[a-zа-яіїєґA-ZA-ЯІЇЄҐ]+$',
    message="Unit has to be entered in the format: 'kg'."
)


class Invoice(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='invoices')
    name = models.CharField(max_length=100)
    client = models.ForeignKey(Client, on_delete=models.CASCADE, related_name='invoices')
    date_of_invoice = models.DateField()
    date_of_payment = models.DateField()


class OrderedItem(models.Model):
    invoice = models.ForeignKey(Invoice, on_delete=models.CASCADE, related_name='ordered_items')
    item = models.ForeignKey(Item, on_delete=models.CASCADE, related_name='ordered_items')
    amount = models.FloatField(validators=[float_number_validation])
    unit = models.CharField(max_length=10, validators=[unit_validation])

    def save(self, *args, **kwargs):
        if self.item.amount_in_stock < self.amount:
            raise Exception("Not enough money")
        item = Item.objects.get(id=self.item.id)
        item.amount_in_stock -= self.amount
        item.save(update_fields=["amount_in_stock"])
        return super(OrderedItem, self).save(*args, **kwargs)
