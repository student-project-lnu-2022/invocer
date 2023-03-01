# Generated by Django 4.1.6 on 2023-03-01 18:40

from django.conf import settings
import django.core.validators
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Client',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('first_name', models.CharField(max_length=35, validators=[django.core.validators.RegexValidator(regex='^[A-Z][a-z]+')])),
                ('last_name', models.CharField(max_length=35, validators=[django.core.validators.RegexValidator(regex='^[A-Z][a-z]+')])),
                ('email', models.EmailField(max_length=35, unique=True, validators=[django.core.validators.RegexValidator(regex='^[a-zA-Z0-9.]{3,20}@(?:[a-zA-Z0-9]{2,20}\\.){1,30}[a-zA-Z]{2,10}$')])),
                ('phone_number', models.CharField(blank=True, max_length=17, validators=[django.core.validators.RegexValidator(message="Phone number must be entered in the format: '+380679832413'. Up to 15 digits allowed.", regex='^\\+?1?\\d{9,15}$')])),
                ('zip_code', models.CharField(max_length=10, validators=[django.core.validators.RegexValidator(message="Zip code must be entered in the format: '12345' or '12345-1234'.", regex='^\\d{5}(?:[-\\s]\\d{4})?$')])),
                ('country', models.CharField(max_length=35, validators=[django.core.validators.RegexValidator(regex='^[A-Z][a-z]+')])),
                ('city', models.CharField(max_length=35, validators=[django.core.validators.RegexValidator(regex='^[A-Z][a-z]+')])),
                ('address', models.CharField(max_length=40, validators=[django.core.validators.RegexValidator(regex='^[#./0-9a-zA-Z\\s,-]+$')])),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='clients', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
