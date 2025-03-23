from rest_framework import serializers
from .models import Product, Category, Order, OrderItem, Address



class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = "__all__"

class ProductSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(source='category.name', read_only=True)
    class Meta:
        model = Product
        fields = ['id', 'name', 'description', 'price', 'stock_quantity', 'image', 'created_at', 'updated_at', 'category', 'category_name']

    def create(self, validated_data):
        validated_data['price'] = float(validated_data['price'])
        validated_data['stock_quantity'] = int(validated_data['stock_quantity'])
        return super().create(validated_data)
    
    def update(self, instance, validated_data):
        if 'price' in validated_data:
            validated_data['price'] = float(validated_data['price'])
        if 'stock_quantity' in validated_data:
            validated_data['stock_quantity'] = int(validated_data['stock_quantity'])
        return super().update(instance, validated_data)



class OrderItemSerializer(serializers.ModelSerializer):
    product = ProductSerializer()
    class Meta:
        model = OrderItem
        fields = ['product', 'quantity']


class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True, read_only=True)
    items_count = serializers.SerializerMethodField()
    username = serializers.CharField(source='user.username', read_only=True)
    class Meta:
        model = Order
        fields = ['id', 'items', 'total_price', 'shipped', 'date_ordered', 'completed', 'items_count', 'date_shipped', 'username']

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