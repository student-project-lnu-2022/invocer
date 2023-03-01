from django.db import models
from django.core.validators import RegexValidator
from user.models import User

string_validation = RegexValidator(
    regex=r'^[A-Z][a-z]+',
    message="Item name has to be entered in the format: 'Apple'."
)
price_validation = RegexValidator(
    regex=r'^\d+([., ]?(\d){2}?)?$',
    message="Price has to be entered in the format: '25.55'."
    )
currency_validation = RegexValidator(
    regex=r'^[A-Z]+$',
    message="Currency has to be entered in the format: 'UAH'."
)
basic_unit_validation = RegexValidator(
    regex=r'^[A-Z][a-z].+$',
    message="Basic unit has to be entered in the format: 'kg'."
)
barcode_validation = RegexValidator(
    regex=r'^\d{7}$',
    message="Barcode has to be entered in the format: '1234567'."
)

class Item(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='items')
    name = models.CharField(max_length=35, validators=[string_validation])
    price = models.FloatField(validators=[price_validation]) # remember bugs, needs improving ?
    currency = models.CharField(max_length=7, validators=[currency_validation])
    basic_unit = models.CharField(max_length=10, validators=[basic_unit_validation])
    amount_in_stock = models.IntegerField()
    barcode = models.CharField(max_length=7, validators=[barcode_validation], unique=True)
    
