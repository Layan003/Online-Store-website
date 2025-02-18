from rest_framework import serializers
from .models import Product, Category, Order, OrderItem, Address


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = "__all__"


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = "__all__"

class OrderItemSerializer(serializers.ModelSerializer):
    product = ProductSerializer()
    class Meta:
        model = OrderItem
        fields = ['product', 'quantity']


class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True, read_only=True)
    items_count = serializers.SerializerMethodField()
    class Meta:
        model = Order
        fields = ['id', 'items', 'total_price', 'shipped', 'date_ordered', 'completed', 'items_count' ]

    def get_items_count(self, obj):
        return obj.items.count()
    

class AddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Address
        fields = ['user', 'order', 'address', 'city', 'zipcode'] 




class BillingInfoSerializer(serializers.Serializer):
    card_name = serializers.CharField(max_length=255)
    card_number = serializers.CharField(max_length=16, write_only=True)
    expiry_date = serializers.CharField(max_length=5, write_only=True)
    cvv = serializers.CharField(max_length=4, write_only=True)