# Generated by Django 4.1.2 on 2023-03-15 16:12

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('clients', '0004_client_debt'),
    ]

    operations = [
        migrations.AlterField(
            model_name='client',
            name='debt',
            field=models.FloatField(default=0, validators=[django.core.validators.RegexValidator(message="Amount has to be entered in the format: '25.55'.", regex='^\\d+([., ]?(\\d){1,2}?)?$')]),
        ),
    ]
