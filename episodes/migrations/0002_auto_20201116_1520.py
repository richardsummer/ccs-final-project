# Generated by Django 3.1.3 on 2020-11-16 15:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('episodes', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='note',
            name='category',
        ),
        migrations.AddField(
            model_name='note',
            name='timestamp',
            field=models.TimeField(blank=True, default='00:00:00', null=True),
        ),
    ]
