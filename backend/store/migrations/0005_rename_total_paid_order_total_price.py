# Generated by Django 5.1.6 on 2025-02-17 16:28

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('store', '0004_order_orderitem'),
    ]

    operations = [
        migrations.RenameField(
            model_name='order',
            old_name='total_paid',
            new_name='total_price',
        ),
    ]
