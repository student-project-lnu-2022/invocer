from django.shortcuts import render
from django.http import JsonResponse

from .userserializers import UserSerializer
from rest_framework.decorators import action
from django.contrib.auth.models import auth
from .models import User
from rest_framework_simplejwt.tokens import RefreshToken
import jwt
from django.conf import settings
from jwt import ExpiredSignatureError
from rest_framework_simplejwt.exceptions import AuthenticationFailed, InvalidToken, TokenError
from rest_framework import viewsets
from rest_framework.parsers import JSONParser


def decode_jwt_token(given_token, secret=settings.SECRET_KEY):
    try:
        payload = jwt.decode(given_token, secret, algorithms=("HS256",))
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


class RegistrationViewSet(viewsets.ViewSet):
    serializer_class = UserSerializer

    @action(detail=True, methods=['get'])
    def registration_page(self, request):
        return render(request, 'user/registration.html', {})

    def create(self, request):
        data = JSONParser().parse(request)
        new_user = self.serializer_class(data=data)
        user = User.objects.filter(email=new_user.initial_data["email"]).first()
        if user is not None:
            return JsonResponse({"message": "User with such email already exists"}, status=409)
        try:
            new_user.is_valid(raise_exception=True)
            new_user.save()
            return JsonResponse({"message": "Success"}, status=200)
        except:
            return JsonResponse({"message": "Invalid credentials"}, status=400)


class LoginViewSet(viewsets.ViewSet):
    @action(detail=True, methods=['get'])
    def login_page(self, request):
        return render(request, 'user/login.html', {})

    def create(self, request):
        data = JSONParser().parse(request)
        email = data['email']
        password = data['password']
        user = auth.authenticate(email=email, password=password)
        if user is not None:
            refresh = RefreshToken.for_user(user)
            return JsonResponse({'refresh': str(refresh), 'access': str(refresh.access_token)}, status=200)
        return JsonResponse({"message": "Invalid credentials"}, status=400)

    @action(detail=False, methods=['post'])
    def logout(self, request):
        current_refresh_token = request.headers['Refresh-Token'].split()[1]
        if not current_refresh_token:
            return JsonResponse({'error': 'refresh_token field is required.'}, status=404)
        try:
            refresh_token_object = RefreshToken(current_refresh_token)
            refresh_token_object.blacklist()
        except (InvalidToken, TokenError) as e:
            return JsonResponse({'error': 'Invalid token.'}, status=400)

        return JsonResponse({'success': 'User logged out successfully.'}, status=200)


class RefreshViewSet(viewsets.ViewSet):
    @action(detail=False, methods=['post'])
    def decode(self, request):
        data = JSONParser().parse(request)
        try:
            user = decode_jwt_token(data["accessToken"])["user_refr"]
            return JsonResponse(user.to_dict(), status=200)
        except:
            return JsonResponse({"message": "Invalid credentials"}, status=400)
        

    def create(self, request):
        data = JSONParser().parse(request)
        decoded = decode_jwt_token(data["refresh"])
        if decoded["token_type"] != "refresh":
            return JsonResponse({'error': 'not proper token!'}, status=401)
        else:
            my_user = decoded["user_refr"]
            refresh = RefreshToken.for_user(my_user)
            return JsonResponse({'access': str(refresh.access_token)}, status=200)

def get_user_from_jwt(headers):
    token = headers['Authorization'].split()[1]
    current_user = decode_jwt_token(token)
    return current_user['user_refr'].to_dict()
