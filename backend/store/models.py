from django.db import models
from sorl.thumbnail import ImageField
from django.contrib.auth.models import User
import datetime
from django.dispatch import receiver
from django.db.models.signals import post_save, pre_save 


class Category(models.Model):
    name = models.CharField(max_length=100, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name
    
class Product(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    category = models.ForeignKey(Category, related_name='products', on_delete=models.SET_NULL, null=True, blank=True)
    stock_quantity = models.PositiveIntegerField(default=0)
    image = ImageField(upload_to='product_images/', blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name
    

class Order(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='orders')
    total_price = models.DecimalField(max_digits=10, decimal_places=2, null=False, blank=False, default=0.00)
    shipped = models.BooleanField(default=False)
    date_ordered = models.DateTimeField(blank=True, null=True)
    date_shipped = models.DateTimeField(blank=True, null=True)
    completed = models.BooleanField(default=False)
    
    def __str__(self):
        return f'Order by - {self.user.first_name}'
    
class OrderItem(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name='items')
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1, null=False, blank=False)
    
    def __str__(self):
        return f'Item - {self.id}'
    

class Address(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    order = models.ForeignKey(Order, on_delete=models.CASCADE)
    address = models.CharField(max_length=200, null=False)
    city = models.CharField(max_length=200, null=False)
    zipcode = models.CharField(max_length=200, null=False)


# @receiver(pre_save, sender=Order)
# def set_shipped_date_on_update(sender, instance, **kwargs):
# 	if instance.pk:
# 		now = datetime.datetime.now()
# 		obj = sender._default_manager.get(pk=instance.pk)
# 		if instance.shipped and not obj.shipped:
# 			instance.date_shipped = now