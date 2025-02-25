from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from . import views


urlpatterns = [
    path('token/', views.login),
    path('token/refresh/', TokenRefreshView.as_view()),
    path('signup/', views.sign_up),
    path('token/verify/', views.verify_token),
    path('is-admin/', views.is_admin),
]