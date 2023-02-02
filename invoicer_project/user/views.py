from django.shortcuts import render
from django.http import JsonResponse
from .userserializers import UserSerializer
from rest_framework.decorators import api_view
from django.contrib.auth.models import auth


@api_view(['GET', 'POST'])
def RegisterView(request):
    if request.method == 'POST':
        newuser = UserSerializer(data=request.POST)
        try:
            newuser.is_valid(raise_exception=True)
            user = newuser.save()
            auth.login(request, user)
        except:
            return JsonResponse({"msg": "Fail"}, status=400)
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
            auth.login(request, user)
            return JsonResponse({"msg": "Success"}, status=200)
        else:
            return JsonResponse({"msg": "Fail"}, status=400)
    else:
        return render(request, 'user/login.html', {})


# @api_view(['GET', 'POST'])
# def logout(request):
#     auth.logout(request)
#     return redirect('/')
