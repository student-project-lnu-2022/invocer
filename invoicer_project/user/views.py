import random
import string
from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.permissions import IsAuthenticated
from django.core.mail import send_mail
from .userserializers import UserSerializer, UserSettingsSerializer
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
from django.core.cache import cache


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
    
    @action(detail=True, methods=['post'])
    def send_confirmation_code(self, request):
        data = JSONParser().parse(request)
        email = data.get('email')
        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            user = None
        if user:
            code = ''.join(random.choices(string.ascii_uppercase + string.digits, k=6))
            subject = 'Confirmation Code'
            message = f'Your confirmation code is {code}'
            from_email = settings.EMAIL_HOST_USER
            recipient_list = [email]
            send_mail(subject, message, from_email, recipient_list)
            cache.set(f'confirmation_code_{email}', code, timeout=600)
            return JsonResponse({'message': 'Confirmation code sent'}, status=200)
        else:
            return JsonResponse({'error': 'Email address not found'}, status=404)
        
    def confirm_code(self, request):
        data = JSONParser().parse(request)
        email = data.get('email')
        code = data.get('code')
        cached_code = cache.get(f'confirmation_code_{email}')
        if cached_code and cached_code == code:
            cache.delete(f'confirmation_code_{email}')
            return JsonResponse({'message': 'Confirmation successful'}, status=200)
        else:
            cache.delete(f'confirmation_code_{email}')
            return JsonResponse({'message': 'Confirmation fail'}, status=404)
        
    def partial_update(self, request):
        data = JSONParser().parse(request)
        try:
            user = User.objects.get(email=data['email'])
        except User.DoesNotExist:
            user = None
        data['id'] = user.id
        serializer = UserSettingsSerializer(user, data=data, partial=True)
        if serializer.is_valid():
            new_password = serializer.validated_data.get('new_password', None)
            if new_password != None:
                user.set_password(new_password)
                user.save()
            serializer.save()
            return JsonResponse(serializer.data, status=200)
        else:
            return JsonResponse({'errors': serializer.errors}, status=400)

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


class UserSettingsViewSet(viewsets.ViewSet):
    model = User
    queryset = User.objects.all()
    serializer_class = UserSettingsSerializer

    permission_classes = [IsAuthenticated]

    def partial_update(self, request):
        try:
            user_info = get_user_from_jwt(request.headers)
            user = self.queryset.get(id=user_info['user_id'])
        except User.DoesNotExist:
            return JsonResponse({'error': 'User not found'}, status=404)
        request.data['id'] = user.id
        serializer = self.serializer_class(user, data=request.data, partial=True)
        if serializer.is_valid():
            new_password = serializer.validated_data.get('new_password', None)
            if new_password != None:
                user.set_password(new_password)
                user.save()
            serializer.save()
            return JsonResponse(serializer.data, status=200)
        else:
            return JsonResponse({'errors': serializer.errors}, status=400)

    def retrieve(self, request):
        user_info = get_user_from_jwt(request.headers)
        user = self.queryset.get(id=user_info['user_id'])
        if user is not None:
            serializer = self.serializer_class(user)
            return JsonResponse(serializer.data)
        else:
            return JsonResponse({'error': 'User not found'}, status=404)


def get_user_from_jwt(headers):
    token = headers['Authorization'].split()[1]
    current_user = decode_jwt_token(token)
    return current_user['user_refr'].to_dict()