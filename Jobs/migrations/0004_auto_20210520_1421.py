# Generated by Django 3.2.3 on 2021-05-20 06:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Jobs', '0003_alter_jobs_salary_range'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='jobcategory',
            name='job_inCategory',
        ),
        migrations.AddField(
            model_name='jobs',
            name='category',
            field=models.CharField(choices=[('1', 'Computer'), ('2', 'Finance'), ('3', 'Entertainment')], default='1', max_length=30),
        ),
    ]
