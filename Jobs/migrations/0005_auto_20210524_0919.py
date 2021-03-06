# Generated by Django 3.2.3 on 2021-05-24 01:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Jobs', '0004_auto_20210520_1421'),
    ]

    operations = [
        migrations.AddField(
            model_name='jobapplication',
            name='email',
            field=models.EmailField(default='default@default.com', max_length=250),
        ),
        migrations.AddField(
            model_name='jobapplication',
            name='first_name',
            field=models.CharField(default='default_first', max_length=250),
        ),
        migrations.AddField(
            model_name='jobapplication',
            name='last_name',
            field=models.CharField(default='default_last', max_length=250),
        ),
    ]
