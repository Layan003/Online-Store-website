# Generated by Django 5.1.6 on 2025-02-17 14:06

import django.db.models.deletion
import sorl.thumbnail.fields
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Category',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100, unique=True)),
                ('description', models.TextField(blank=True, null=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
            ],
        ),
        migrations.CreateModel(
            name='Product',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('description', models.TextField()),
                ('price', models.DecimalField(decimal_places=2, max_digits=10)),
                ('size', models.CharField(blank=True, max_length=20, null=True)),
                ('color', models.CharField(blank=True, max_length=50, null=True)),
                ('brand', models.CharField(blank=True, max_length=100, null=True)),
                ('material', models.CharField(blank=True, max_length=100, null=True)),
                ('stock_quantity', models.PositiveIntegerField(default=0)),
                ('image', sorl.thumbnail.fields.ImageField(upload_to='product_images/')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('category', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='products', to='store.category')),
            ],
        ),
    ]
