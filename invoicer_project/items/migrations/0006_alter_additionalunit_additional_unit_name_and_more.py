# Generated by Django 4.1.2 on 2023-03-14 14:22

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('items', '0005_rename_additional_unit_additionalunit_additional_unit_name_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='additionalunit',
            name='additional_unit_name',
            field=models.CharField(max_length=35, validators=[django.core.validators.RegexValidator(message="Basic unit has to be entered in the format: 'kg'.", regex='^[a-zа-яіїєґA-ZA-ЯІЇЄҐ]+$')]),
        ),
        migrations.AlterField(
            model_name='additionalunit',
            name='quantity',
            field=models.FloatField(validators=[django.core.validators.RegexValidator(message="Price has to be entered in the format: '25.55'.", regex='^\\d+([., ]?(\\d){1,2}?)?$')]),
        ),
        migrations.AlterField(
            model_name='item',
            name='amount_in_stock',
            field=models.FloatField(validators=[django.core.validators.RegexValidator(message="Price has to be entered in the format: '25.55'.", regex='^\\d+([., ]?(\\d){1,2}?)?$')]),
        ),
        migrations.AlterField(
            model_name='item',
            name='barcode',
            field=models.CharField(max_length=43, validators=[django.core.validators.RegexValidator(message="Barcode has to be entered in the format: '12345678910'.", regex='^\\d{3,43}$')]),
        ),
        migrations.AlterField(
            model_name='item',
            name='basic_unit',
            field=models.CharField(max_length=10, validators=[django.core.validators.RegexValidator(message="Basic unit has to be entered in the format: 'kg'.", regex='^[a-zа-яіїєґA-ZA-ЯІЇЄҐ]+$')]),
        ),
        migrations.AlterField(
            model_name='item',
            name='name',
            field=models.CharField(max_length=35, validators=[django.core.validators.RegexValidator(message="Item name has to be entered in the format: 'Apple'.", regex='^[A-ZA-ЯІЇЄҐ][a-zа-яіїєґ]+(?:\\s[A-ZA-ЯІЇЄҐ][a-zа-яіїєґ]+)*$')]),
        ),
    ]
