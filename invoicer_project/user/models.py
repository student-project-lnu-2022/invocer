from django.contrib.auth.base_user import BaseUserManager
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


class User(auth_models.AbstractUser):
    first_name = models.CharField(max_length=35, validators=[RegexValidator(regex=r'^[A-Z][a-z]+')])
    last_name = models.CharField(max_length=35, validators=[RegexValidator(regex=r'^[A-Z][a-z]+')])
    email = models.EmailField(max_length=35, unique=True)
    password = models.CharField(max_length=100, blank=False, validators=[RegexValidator(r'^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,15}$')])
    company_name = models.CharField(max_length=35, validators=[RegexValidator(regex=r'^[A-Z][a-z]+')])
    country = models.CharField(max_length=35, validators=[RegexValidator(regex=r'^[A-Z][a-z]+')])
    city = models.CharField(max_length=35, validators=[RegexValidator(regex=r'^[A-Z][a-z]+')])
    address = models.CharField(max_length=40, validators=[RegexValidator(regex=r'^[#./0-9a-zA-Z\s,-]+$')])
    username = None

    objects = UserManager()

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["first_name", "last_name", "password"]
