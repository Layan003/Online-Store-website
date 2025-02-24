from django.shortcuts import render
from rest_framework import generics, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.response import Response
from .serializers import UserSerializer
from rest_framework.permissions import AllowAny
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import AccessToken

@api_view(['POST'])
def sign_up(request):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        refresh = RefreshToken.for_user(user)
        token = refresh.access_token
        return Response({
            'access': str(token),
            'refresh': str(refresh),
        }, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(["POST"])
@permission_classes([AllowAny])
def login(request):
    username = request.data.get('username')
    password = request.data.get('password')
    
    user = authenticate(username=username, password=password)

    if user is None:
        if not User.objects.filter(username=username).exists():
            return Response({"error": "Username doesn't exists"}, status=status.HTTP_404_NOT_FOUND)
        else:
            return Response({"error": "Incorrect password"}, status=status.HTTP_401_UNAUTHORIZED)
        
    refresh = RefreshToken.for_user(user)
    access = refresh.access_token
    # is_admin = True if request.user.is_admin else False
    # return Response({"access": str(access), 'refresh': str(refresh), 'is_admin': is_admin}, status=status.HTTP_200_OK)
    return Response({"access": str(access), 'refresh': str(refresh)}, status=status.HTTP_200_OK)


@api_view()
def verify_token(request):
    token = request.data.get('access')
    if token:
        try:
            AccessToken(token)
            print(AccessToken(token))
            return Response({})
        except:
            return Response(status=status.HTTP_401_UNAUTHORIZED)
    else:
        return Response({"error": "no token was sent"}, status=status.HTTP_400_BAD_REQUEST)