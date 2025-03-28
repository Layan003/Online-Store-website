from django.shortcuts import render, get_object_or_404
from rest_framework import generics, status
from .serializers import ProductSerializer, CategorySerializer, OrderItemSerializer, OrderSerializer, AddressSerializer, BillingInfoSerializer
from .models import Category, Product, Order, OrderItem, Address
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated, IsAdminUser
from django.utils import timezone
from django.db.models import Q 
from rest_framework.parsers import MultiPartParser, FormParser,JSONParser

class ProductsView(generics.ListAPIView):
    permission_classes =[AllowAny]
    serializer_class = ProductSerializer

    def get_queryset(self):
        queryset = Product.objects.all()
        category = self.request.query_params.get('category')
        price = self.request.query_params.get('price')
        search = self.request.query_params.get('search')

        if search:
            queryset = queryset.filter(Q(name__icontains=search) | Q(description__icontains=search))
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
        if item.product.stock_quantity != 0:
            tp = tp + item.product.price * item.quantity
    order.total_price = tp
    order.save()
    return Response(OrderSerializer(order).data, status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_cart(request):
    try:
        order = Order.objects.get(user=request.user, completed=False)  
        # order_items = order.items.all()
        # total_price
        # for item in order_items:
        #     if item.stock_quantity != 0:

        tp = 0
        order_items = order.items.all()
        for item in order_items:
            if item.product.stock_quantity != 0:
                tp = tp + item.product.price * item.quantity
        order.total_price = tp
        order.save()

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

@api_view(["GET"])
@permission_classes([IsAuthenticated, IsAdminUser])
def orders(request):
    if request.user.is_staff:
        shipped = request.query_params.get('shipped')
        unshipped = request.query_params.get('unShipped')
        completed = request.query_params.get('completed')
        uncompleted = request.query_params.get('unCompleted')

        orders = Order.objects.all()
        condition = Q()
        if shipped:
            condition |= Q(shipped=True)
        if unshipped:
            condition |= Q(shipped=False)
        if completed:
            condition |= Q(completed=True)
        if uncompleted:
            condition |= Q(completed=False)

        print(condition)
        
        if condition:
            orders = orders.filter(condition)
            orders_serializer = OrderSerializer(orders, many=True)
            return Response(orders_serializer.data, status=status.HTTP_200_OK)
        
        orders_serializer = OrderSerializer(orders, many=True)
        return Response(orders_serializer.data, status=status.HTTP_200_OK)
        
    else:
        return Response(status=status.HTTP_401_UNAUTHORIZED)
    

@api_view(["GET"])
@permission_classes([IsAuthenticated, IsAdminUser])
def change_shipped_status(request, id):
    if request.user.is_staff:
        order = get_object_or_404(Order, id=id)
        if not order.completed:
            return Response({'error': 'can not be marked as shipped'}, status=status.HTTP_400_BAD_REQUEST)
        if order.shipped:
            order.shipped = False
            order.date_shipped = None
        else:
            order.shipped = True
            order.date_shipped = timezone.now()
        order.save()
        serializer = OrderSerializer(order)
        return Response(serializer.data, status=status.HTTP_200_OK)
    else:
        return Response(status=status.HTTP_401_UNAUTHORIZED)
    
class userOrders(generics.ListAPIView):
    serializer_class = OrderSerializer
    model = Order
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        query = Order.objects.filter(user=self.request.user)
        return query
    

class ManageProducts(generics.ListCreateAPIView):
    serializer_class = ProductSerializer
    model = Product
    permission_classes = [IsAuthenticated, IsAdminUser]
    queryset = Product.objects.all()
    parser_classes = (MultiPartParser, FormParser, JSONParser)

    def get_queryset(self):
        query = Product.objects.all()
        search = self.request.query_params.get('search')
        stock = self.request.query_params.get('stock')
        if search:
            query = query.filter(Q(name__icontains=search) | Q(description__icontains=search))
        if stock:
            query = query.filter(Q(stock_quantity__lte=stock))
        return query
    
class ManageProduct(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = ProductSerializer
    model = Product
    permission_classes = [IsAuthenticated, IsAdminUser]
    queryset = Product.objects.all()
    parser_classes = (MultiPartParser, FormParser, JSONParser)

    def patch(self, request, *args, **kwargs):
        data = request.data
        product = self.get_object()
        # print(request.data)
        newData = {
            'id': product.id,
            'name': data.get('name'),
            'description':data.get('description'),
            'price':data.get('price'),
            'stock_quantity':data.get('stock_quantity'),
            'category':data.get('category'),
        }
        if 'image' in data:
            newData['image'] = data.get('image')
        serializer = ProductSerializer(product, data=newData)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)