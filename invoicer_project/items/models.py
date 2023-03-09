from django.db import models
from django.core.validators import RegexValidator
from user.models import User

string_validation = RegexValidator(
    regex=r'^[A-Z][a-z]+',
    message="Item name has to be entered in the format: 'Apple'."
)
price_validation = RegexValidator(
    regex=r'^\d+([., ]?(\d){1,2}?)?$',
    message="Price has to be entered in the format: '25.55'."
)
currency_validation = RegexValidator(
    regex=r'^[A-Z]+$',
    message="Currency has to be entered in the format: 'UAH'."
)
unit_validation = RegexValidator(
    regex=r'^[a-zA-Z]+$',
    message="Basic unit has to be entered in the format: 'kg'."
)
barcode_validation = RegexValidator(
    regex=r'^\d{7}$',
    message="Barcode has to be entered in the format: '1234567'."
)

class Item(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='items')
    name = models.CharField(max_length=35, validators=[string_validation])
    price = models.IntegerField(validators=[price_validation])
    currency = models.CharField(max_length=7, validators=[currency_validation])
    basic_unit = models.CharField(max_length=10, validators=[unit_validation])
    amount_in_stock = models.IntegerField()
    barcode = models.CharField(max_length=14, validators=[barcode_validation])
    
class AdditionalUnit(models.Model):
    item = models.ForeignKey(Item, on_delete=models.CASCADE, related_name='additional_units')
    additional_unit_name = models.CharField(max_length=35, validators=[unit_validation])
    quantity = models.PositiveIntegerField()

    @property
    def basic(self):
        return self.item.basic_unit