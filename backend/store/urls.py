from django.urls import path
from . import views 

urlpatterns = [
    path('products/', views.ProductsView.as_view()),
    path('category/', views.CategoryView.as_view()),
    path('cart/add/', views.add_cart_item),
    path('cart/', views.get_cart),
    path('cart/change_qty/', views.change_gty),
    path('cart/remove/', views.remove_cart_item),
    path('address/', views.address),
    path('billing_info/', views.billing_info),
    path('place_order/', views.place_order),
    path('orders/', views.orders),
    path('user-order/', views.userOrders.as_view()),
    path('order/<int:id>/shipped-status/', views.change_shipped_status), 
    path('manage-products/', views.ManageProducts.as_view()),
    # path('manage/', views.debug_view),

    path('manage-product/<int:pk>/', views.ManageProduct.as_view()), 




]