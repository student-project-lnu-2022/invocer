from django.db import models
from django.core.validators import RegexValidator
from user.models import User

string_validation = RegexValidator(
    regex=r'''^("?[A-Za-zА-Яа-яІіЇїЄєҐґ][a-zа-яіїєґ"‘'ʼ.’\u0027\\U+02BC']+)(?:\s("?[A-Za-zА-Яа-яІіЇїЄєҐґ][a-zа-яіїєґ"‘ʼ'.’\u0027\\U+02BC']+))*$''',
    message="Item name has to be entered in the format: 'Apple'."
)
float_number_validation = RegexValidator(
    regex=r'^\d+([., ]?(\d){1,2}?)?$',
    message="Price has to be entered in the format: '25.55'."
)
currency_validation = RegexValidator(
    regex=r'^[A-Z]+$',
    message="Currency has to be entered in the format: 'UAH'."
)
unit_validation = RegexValidator(
    regex=r'^[a-zа-яіїєґA-ZA-ЯІЇЄҐ]+\.?$',
    message="Basic unit has to be entered in the format: 'kg' or 'kg.'"
)
barcode_validation = RegexValidator(
    regex=r'^\d{3,43}$',

    message="Barcode has to be entered in the format: '12345678910'."
)


class Item(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='items')
    name = models.CharField(max_length=35, validators=[string_validation])
    price = models.FloatField(validators=[float_number_validation])
    currency = models.CharField(max_length=7, validators=[currency_validation])
    basic_unit = models.CharField(max_length=10, validators=[unit_validation])
    amount_in_stock = models.FloatField(validators=[float_number_validation])
    barcode = models.CharField(max_length=43, validators=[barcode_validation])


class AdditionalUnit(models.Model):
    item = models.ForeignKey(Item, on_delete=models.CASCADE, related_name='additional_units')
    additional_unit_name = models.CharField(max_length=35, validators=[unit_validation])
    quantity = models.FloatField(validators=[float_number_validation])

    @property
    def basic(self):
        return self.item.basic_unit
