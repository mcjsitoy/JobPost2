# Generated by Django 3.2.3 on 2021-05-24 06:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Jobs', '0006_delete_jobcategory'),
    ]

    operations = [
        migrations.AddField(
            model_name='jobapplication',
            name='cover_letter',
            field=models.TextField(default='This is my cover letter', max_length=500),
        ),
    ]