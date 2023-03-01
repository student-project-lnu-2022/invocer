# Generated by Django 4.1.6 on 2023-03-01 18:40

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='email',
            field=models.EmailField(max_length=35, unique=True, validators=[django.core.validators.RegexValidator(regex='^[a-zA-Z0-9.]{3,20}@(?:[a-zA-Z0-9]{2,20}\\.){1,30}[a-zA-Z]{2,10}$')]),
        ),
    ]
