from django.core.validators import RegexValidator
from django.db import models
from django.contrib.auth import models as auth_models


class UserManager(auth_models.BaseUserManager):
    def create_user(self, first_name: str, last_name: str, email: str, password: str = None,
                    repeat_password: str = None,
                    is_superuser=False):
        if not email:
            raise ValueError("User must have an email")
        if not first_name:
            raise ValueError("User must have a first name")
        if not last_name:
            raise ValueError("User must have a last name")
        user = self.model(email=self.normalize_email(email))
        user.first_name = first_name
        user.last_name = last_name
        user.set_password(password)
        user.is_active = True
        user.is_superuser = is_superuser
        user.save()
        return user

string_validation = [RegexValidator(regex=r'^[A-Za-z\u0080-\u024F\u0400-\u04FF’ʼ′\-\.\| |]+')]
own_names_validation = [RegexValidator(regex=r'^([a-zA-Z\u0080-\u024F\u0400-\u04FF0-9]+(?:. |-|.| |’|‘|ʼ|′|))*[a-zA-Z\u0080-\u024F\u0400-\u04FF0-9]*$')]
class User(auth_models.AbstractUser):
    first_name = models.CharField(max_length=35, validators=string_validation)
    last_name = models.CharField(max_length=35, validators=string_validation)
    email = models.EmailField(max_length=35, validators=[RegexValidator(regex=r'^[a-zA-Z0-9.]{3,20}@(?:[a-zA-Z0-9]{2,20}\.){1,30}[a-zA-Z]{2,10}$')], unique=True)
    password = models.CharField(max_length=100, blank=False, validators=[RegexValidator(r'^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,15}$')])
    company_name = models.CharField(max_length=35, validators=string_validation, blank=True)
    country = models.CharField(max_length=35, validators=own_names_validation, blank=True)
    city = models.CharField(max_length=35, validators=own_names_validation, blank=True)
    address = models.CharField(max_length=40, validators=own_names_validation, blank=True)
    username = None

    objects = UserManager()

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["first_name", "last_name", "password"]

    def to_dict(self):
        return {'first_name': self.first_name, 'last_name': self.last_name, 'user_id': self.id, 'email': self.email}
