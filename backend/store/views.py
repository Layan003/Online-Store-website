from django.shortcuts import render, get_object_or_404
from rest_framework import generics, status
from .serializers import ProductSerializer, CategorySerializer, OrderItemSerializer, OrderSerializer, AddressSerializer, BillingInfoSerializer
from .models import Category, Product, Order, OrderItem, Address
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from django.utils import timezone

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
    


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_cart_item(request):
    user = request.user
    product_id = request.data.get('product_id')
    product = get_object_or_404(Product, id=product_id)
   

    order, _ = Order.objects.get_or_create(user=user, completed=False)
    order_item, created = OrderItem.objects.get_or_create(order=order, product=product)
    if not created:
        order_item.quantity += 1
        order_item.save()
    tp = 0
    order_items = order.items.all()
    for item in order_items:
        tp = tp + item.product.price * item.quantity
    order.total_price = tp
    order.save()
    return Response(OrderSerializer(order).data, status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_cart(request):
    try:
        order = Order.objects.get(user=request.user, completed=False)  
        serializer = OrderSerializer(order)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except Order.DoesNotExist:
        return Response({"items_count": 0}, status=status.HTTP_200_OK)
    

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def change_gty(request):
    user = request.user
    product_id = request.data.get('product_id')
    product = get_object_or_404(Product, id=product_id)
   

    order = get_object_or_404(Order, user=user, completed=False)
    order_item = get_object_or_404(OrderItem, order=order, product=product)

    if order_item.quantity == 1 :
        order_item.delete()
    else:       
        order_item.quantity -= 1
        order_item.save()
    tp = 0
    order_items = order.items.all()
    for item in order_items:
        tp = tp + item.product.price * item.quantity
    order.total_price = tp
    order.save()
    return Response(OrderSerializer(order).data, status=status.HTTP_200_OK)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def remove_cart_item(request):
    user = request.user
    product_id = request.data.get('product_id')
    product = get_object_or_404(Product, id=product_id)
   
    order = get_object_or_404(Order, user=user, completed=False)
    order_item = get_object_or_404(OrderItem, order=order, product=product)
    
    order_item.delete()

    tp = 0
    order_items = order.items.all()
    for item in order_items:
        tp = tp + item.product.price * item.quantity
    order.total_price = tp
    order.save()
    return Response(OrderSerializer(order).data, status=status.HTTP_200_OK)


@api_view(['POST', 'GET'])
def address(request):
    if request.method == "GET":
        try:
            address = Address.objects.filter(user=request.user).latest("id")
            return Response(AddressSerializer(address).data, status=status.HTTP_200_OK)
        except Address.DoesNotExist:
            return Response({"error": "Address not found"}, status=status.HTTP_404_NOT_FOUND)

    if request.method == "POST":
        order = request.user.orders.filter(completed=False).order_by('-id').first()
        # aa = request.user.orders.filter(completed=False).order_by('-id').first()
        # print(aa)
        # print(aa.id)
        if not order:
            return Response({"detail": "You don't have any active orders."}, status=status.HTTP_400_BAD_REQUEST)

        data = {
            'address': request.data.get('address'),
            'city': request.data.get('city'),
            'zipcode': request.data.get('zipcode'),
            'user': request.user.id,
            'order': order.id
        }
        serializer = AddressSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def billing_info(request):
    serializer = BillingInfoSerializer(data=request.data)
    if serializer.is_valid():
        return Response({"message": "Billing info processed successfully"}, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



@api_view(['GET'])
@permission_classes([IsAuthenticated])
def place_order(request):
    order = request.user.orders.filter(completed=False).order_by('-id').first()  
    if order is None:
        return Response({"detail": "No incomplete order found."}, status=status.HTTP_404_NOT_FOUND)
    
    order.completed = True
    order.date_ordered = timezone.now()
    order.save()

    return Response({"detail": "Order successfully completed."}, status=status.HTTP_200_OK)
