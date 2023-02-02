from django.shortcuts import render, redirect
from django.http import JsonResponse
from .userserializers import UserSerializer
from rest_framework.decorators import api_view
from django.contrib.auth.models import auth


@api_view(['GET', 'POST'])
def get(request):
    if request.method == 'POST':
        newuser = UserSerializer(data=request.POST)
        try:
            newuser.is_valid(raise_exception=True)
            newuser.save()
        except:
            return JsonResponse({"msg": "Fail"}, status=400)
        return JsonResponse(newuser.data, status=200)
    else:
        return render(request, 'user/registration.html', {})


@api_view(['GET', 'POST'])
def getLoginView(request):
    if request.method == 'POST':
        email = request.POST['email']
        password = request.POST['password']

        user = auth.authenticate(email=email, password=password)
        if user is not None:
            auth.login(request, user)
            return JsonResponse({"msg": "Success"}, status=200)
        else:
            return JsonResponse({"msg": "Fail"}, status=400)
    else:
        return render(request, 'user/login.html', {})


@api_view(['GET', 'POST'])
def getClientsView(request):
    return render(request, 'user/clients_list.html', {})


# @api_view(['GET', 'POST'])
# def logout(request):
#     auth.logout(request)
#     return redirect('/')
