from django.shortcuts import render, get_object_or_404
from rest_framework import viewsets
from rest_framework.decorators import api_view, action
from rest_framework.permissions import IsAuthenticated, AllowAny
from user.views import decode_jwt_token
from user.models import User
from django.http import JsonResponse
from rest_framework.decorators import api_view

from .models import Client
from .clientserializer import ClientSerializer
from copy import deepcopy
from rest_framework.parsers import JSONParser


class ClientViewSet(viewsets.ViewSet):
    model = Client
    queryset = Client.objects.all()
    serializer_class = ClientSerializer

    permission_classes = [IsAuthenticated]

    def create(self, request):
        data = deepcopy(JSONParser().parse(request))
        data["user"] = get_user_from_jwt(request.headers)['user_id']
        print(data)
        serializer = self.serializer_class(data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)

    def list(self, request):
        user = get_user_from_jwt(request.headers)
        clients = Client.objects.filter(user_id=user['user_id'])
        if len(clients) == 0:
            return JsonResponse(
                {"first_name": user['first_name'], "last_name": user['last_name'], 'message': 'Not found'}, status=404)
        clients_json = ClientSerializer(clients, many=True)
        data = {"first_name": user['first_name'], "last_name": user['last_name'], 'content': clients_json.data}
        return JsonResponse(data, status=200, safe=False)

    def destroy(self, request, client_id):
        client = get_object_or_404(Client, id=client_id)
        client.delete()
        return JsonResponse({'message': 'Deleted!'}, status=204)

def get_user_from_jwt(headers):
    token = headers['Authorization'].split()[1]
    current_user = decode_jwt_token(token)
    return current_user['user_refr'].to_dict()


class ClientRenderingViewSet(viewsets.ViewSet):
    @action(detail=False, methods=["get"])
    def home_view(self, request):
        return render(request, 'clients/clients_list.html', context={"first_name": "", "last_name": ""})
    
    @action(detail=False, methods=["get"])
    def add_client_view(self, request):
        return render(request, 'clients/client_add.html', context={"first_name": "", "last_name": ""})

