from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from user.models import User
from django.http import JsonResponse


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def ClientsListView(request):
    #should return JSON-response with content (for future)
    return render(request, 'clients/clients_list.html', context={"first_name": "John", "last_name": "Smith"})


