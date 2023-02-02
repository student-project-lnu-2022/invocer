from django.shortcuts import render
from rest_framework.decorators import api_view
from user.models import User


@api_view(['GET'])
def ClientsListView(request):
    user_id = request.session.get("_auth_user_id", None)
    if user_id is not None:
        user = User.objects.get(id=user_id)
    return render(request, 'clients/clients_list.html', context={"first_name": user.first_name, "last_name": user.last_name})
