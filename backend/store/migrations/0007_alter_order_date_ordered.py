# Generated by Django 5.1.6 on 2025-02-17 17:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('store', '0006_remove_orderitem_price_alter_order_total_price_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='order',
            name='date_ordered',
            field=models.DateTimeField(blank=True, null=True),
        ),
    ]
