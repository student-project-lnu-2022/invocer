# Generated by Django 4.1.6 on 2023-03-07 17:24

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('clients', '0002_alter_client_address_alter_client_city_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='client',
            name='address',
            field=models.CharField(max_length=40, validators=[django.core.validators.RegexValidator(regex='^([a-zA-Z\\u0080-\\u024F\\u0400-\\u04FF0-9]+(?:. |-|.| |’|‘|ʼ|′|))*[a-zA-Z\\u0080-\\u024F\\u0400-\\u04FF0-9]*$')]),
        ),
        migrations.AlterField(
            model_name='client',
            name='city',
            field=models.CharField(max_length=35, validators=[django.core.validators.RegexValidator(regex='^([a-zA-Z\\u0080-\\u024F\\u0400-\\u04FF0-9]+(?:. |-|.| |’|‘|ʼ|′|))*[a-zA-Z\\u0080-\\u024F\\u0400-\\u04FF0-9]*$')]),
        ),
        migrations.AlterField(
            model_name='client',
            name='country',
            field=models.CharField(max_length=35, validators=[django.core.validators.RegexValidator(regex='^([a-zA-Z\\u0080-\\u024F\\u0400-\\u04FF0-9]+(?:. |-|.| |’|‘|ʼ|′|))*[a-zA-Z\\u0080-\\u024F\\u0400-\\u04FF0-9]*$')]),
        ),
    ]
