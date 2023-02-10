from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from user.views import decode_jwt_token
from django.http import JsonResponse

def get_user_from_jwt(headers):
    token = headers['Authorization'].split()[1]
    current_user = decode_jwt_token(token)
    return current_user['user_refr'].to_dict()

def get_user_from_jwt(headers):
    token = headers['Authorization'].split()[1]
    current_user = decode_jwt_token(token)
    return current_user['user_refr'].to_dict()


@api_view(['GET'])
def home_view(request):
    return render(request, 'clients/clients_list.html', context={"first_name": "", "last_name": ""})

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def clients_list_view(request):
    user = get_user_from_jwt(request.headers)
    data = {"first_name": user['first_name'], "last_name": user['last_name'], 'content': [{'initials': 'JD', 'name': 'John Deer', 'debt': '10 000 UAH'}, {'initials': 'HR', 'name': 'Helen Rose', 'debt': '5 500 UAH'}]}
    return JsonResponse(data, status = 200)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def clients_list_view(request):
    user = get_user_from_jwt(request.headers)
    data = {"first_name": user['first_name'], "last_name": user['last_name'], 'content': [{'initials': 'JD', 'name': 'John Deer', 'debt': '10 000 UAH'}, {'initials': 'HR', 'name': 'Helen Rose', 'debt': '5 500 UAH'}]}
    return JsonResponse(data, status = 200)

