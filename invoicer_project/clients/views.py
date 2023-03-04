from django.shortcuts import get_object_or_404
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from user.views import decode_jwt_token
from django.http import JsonResponse
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
        serializer = self.serializer_class(data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)

    def list(self, request):
        user = get_user_from_jwt(request.headers)
        clients = Client.objects.filter(user_id=user['user_id'])
        clients_json = ClientSerializer(clients, many=True)
        data = {'content': clients_json.data}
        return JsonResponse(data, status=200, safe=False)

    def destroy(self, request, client_id):
        user = get_user_from_jwt(request.headers)
        client = get_object_or_404(Client, id=client_id, user_id=user['user_id'])
        client.delete()
        return JsonResponse({}, status=204)

    def partial_update(self, request, client_id):
        try:
            user = get_user_from_jwt(request.headers)
            client = self.queryset.get(id=client_id, user_id=user['user_id'])
        except Client.DoesNotExist:
            return JsonResponse({'error': 'Client not found'}, status=404)
        request.data['user'] = user['user_id']
        serializer = ClientSerializer(client, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data)
        return JsonResponse(serializer.errors, status=400)

    def retrieve(self, request, client_id):
        client = self.queryset.get(id=client_id)
        if client is not None:
            serializer = ClientSerializer(client)
            return JsonResponse(serializer.data)
        else:
            return JsonResponse({'error': 'Client not found'}, status=404)


def get_user_from_jwt(headers):
    token = headers['Authorization'].split()[1]
    current_user = decode_jwt_token(token)
    return current_user['user_refr'].to_dict()
