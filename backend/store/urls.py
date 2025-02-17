from django.urls import path
from . import views 

urlpatterns = [
    path('products/', views.ProductsView.as_view()),
    path('category/', views.CategoryView.as_view()),
]