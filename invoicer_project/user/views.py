from django.shortcuts import render
from django.http import JsonResponse
from .userserializers import UserSerializer
from rest_framework.decorators import api_view


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
    # if request.method == 'POST':
        # newuser = UserSerializer(data=request.POST)
        # try:
        #     newuser.is_valid(raise_exception=True)
        #     newuser.save()
        # except:
        #     return JsonResponse({"msg": "Fail"}, status=400)
        #     return JsonResponse(newuser.data, status=200)
        # else:
            return render(request, 'user/login.html', {})
