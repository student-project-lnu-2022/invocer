# Generated by Django 4.1.2 on 2023-03-15 16:12

import django.core.validators
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('invoices', '0005_invoice_price'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='invoice',
            name='items',
        ),
        migrations.AddField(
            model_name='invoice',
            name='discount',
            field=models.FloatField(default=0, validators=[django.core.validators.RegexValidator(message="Amount has to be entered in the format: '25.55'.", regex='^\\d+([., ]?(\\d){1,2}?)?$')]),
        ),
        migrations.AddField(
            model_name='ordereditem',
            name='invoice',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, related_name='ordered_items', to='invoices.invoice'),
            preserve_default=False,
        ),
    ]
