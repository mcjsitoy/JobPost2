# Generated by Django 3.2.3 on 2021-05-28 07:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Jobs', '0012_alter_jobs_salary_range'),
    ]

    operations = [
        migrations.AddField(
            model_name='jobs',
            name='resume',
            field=models.FileField(default='static/resume/default_resume.pdf', upload_to='static/resume'),
        ),
    ]
