from django.shortcuts import render
from django.http import JsonResponse
from rest_framework import exceptions

from .userserializers import UserSerializer
from rest_framework.decorators import api_view, permission_classes
from django.contrib.auth.models import auth
from .models import User
from rest_framework_simplejwt.tokens import RefreshToken

import jwt
from django.conf import settings
from jwt import ExpiredSignatureError
from rest_framework_simplejwt.exceptions import AuthenticationFailed

@api_view(['GET', 'POST'])
def RegisterView(request):
    if request.method == 'POST':
        newuser = UserSerializer(data=request.POST)
        user = User.objects.filter(email=newuser.initial_data["email"]).first()
        if user is not None:
            return JsonResponse({"message": "User with such email already exists"}, status=400)
        try:
            newuser.is_valid(raise_exception=True)
            user = newuser.save()
            refresh = RefreshToken.for_user(user)
            return JsonResponse({'refresh': str(refresh), 'access': str(refresh.access_token)}, status=200)
        except:
            return JsonResponse({"message": "Invalid credentials"}, status=400)
        return JsonResponse(newuser.data, status=200)
    else:
        return render(request, 'user/registration.html', {})


@api_view(['GET', 'POST'])
def LoginView(request):
    if request.method == 'POST':
        email = request.POST['email']
        password = request.POST['password']
        user = auth.authenticate(email=email, password=password)
        if user is not None:
            refresh = RefreshToken.for_user(user)
            return JsonResponse({'refresh': str(refresh), 'access': str(refresh.access_token)}, status=200)
        else:
            return JsonResponse({"msg": "Fail"}, status=400)
    else:
        return render(request, 'user/login.html', {})


def decode_jwt_token(given_token, secret=settings.SECRET_KEY):
    try:
        payload = jwt.decode(given_token, secret, algorithms=("HS256", ))
    except ExpiredSignatureError:
        raise AuthenticationFailed("The given token already expired.")
    try:
        my_user = User.objects.get(id=payload['user_id'])
    except User.DoesNotExist:
        raise AuthenticationFailed("The user is not found.")
    return {
        "user_refr": my_user,
        "token_type": payload["token_type"]
    }

@api_view(['POST'])
def RefreshView(request):
    data = request.data
    decoded = decode_jwt_token(data["refresh"])
    if decoded["token_type"] != "refresh":
        return JsonResponse({'error': 'not proper token!'}, status=401)
    else:
        my_user = decoded["user_refr"]
        refresh = RefreshToken.for_user(my_user)
        return JsonResponse({'access': str(refresh.access_token)}, status=200)
