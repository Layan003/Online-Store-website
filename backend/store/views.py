from django.shortcuts import render, get_object_or_404
from rest_framework import generics, status
from .serializers import ProductSerializer, CategorySerializer
from .models import Category, Product
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import AllowAny



class ProductsView(generics.ListAPIView):
    permission_classes =[AllowAny]
    serializer_class = ProductSerializer

    def get_queryset(self):
        queryset = Product.objects.all()
        category = self.request.query_params.get('category')
        price = self.request.query_params.get('price')
        if category:
            queryset = queryset.filter(category__name=category)
        if price:
            queryset = queryset.filter(price__lte=price)
        return queryset
    
class CategoryView(generics.ListAPIView):
    permission_classes =[AllowAny]
    serializer_class = CategorySerializer
    queryset = Category.objects.all()
    
