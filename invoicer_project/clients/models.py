from user.models import User

from django.db import models
from django.core.validators import RegexValidator

phone_regex = RegexValidator(
    regex=r'^\+?1?\d{9,15}$',
    message="Phone number must be entered in the format: '+380679832413'. Up to 15 digits allowed."
)

zip_code_regex = RegexValidator(
    regex=r'^\d{5}(?:[-\s]\d{4})?$',
    message="Zip code must be entered in the format: '12345' or '12345-1234'."
)

float_number_validation = RegexValidator(
    regex=r'^\d+([., ]?(\d){1,2}?)?$',
    message="Amount has to be entered in the format: '25.55'."
)

string_validation = RegexValidator(regex=r'^[A-Za-z\u0080-\u024F\u0400-\u04FF’ʼ′\-\.\| |]+')
own_names_validation = RegexValidator(regex=r'^([a-zA-Z\u0080-\u024F\u0400-\u04FF0-9]+(?:. |-|.| |’|‘|ʼ|′|))*[a-zA-Z\u0080-\u024F\u0400-\u04FF0-9]*$')


class ClientManager(models.Manager):
    def get_by_user_id(self, user_id):
        return self.filter(user_id=user_id)

    def get_by_zip_code(self, zip_code):
        return self.filter(zip_code=zip_code)

    def get_by_country(self, country):
        return self.filter(country=country)

    def get_by_id(self, client_id):
        return self.filter(pk=client_id)

    def get_by_email(self, client_email):
        return self.filter(email=client_email)


class Client(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='clients')
    first_name = models.CharField(max_length=35, validators=[string_validation])
    last_name = models.CharField(max_length=35, validators=[string_validation])
    email = models.EmailField(max_length=35, validators=[
        RegexValidator(regex=r'^[a-zA-Z0-9.]{3,20}@(?:[a-zA-Z0-9]{2,20}\.){1,30}[a-zA-Z]{2,10}$')])
    phone_number = models.CharField(validators=[phone_regex], max_length=17, blank=True)
    zip_code = models.CharField(validators=[zip_code_regex], max_length=10)
    debt = models.FloatField(validators=[float_number_validation], default=0)
    country = models.CharField(max_length=35, validators=[own_names_validation])
    city = models.CharField(max_length=35, validators=[own_names_validation])
    address = models.CharField(max_length=40, validators=[own_names_validation])

    objects = ClientManager()
