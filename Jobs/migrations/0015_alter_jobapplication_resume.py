# Generated by Django 3.2.3 on 2021-05-31 01:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Jobs', '0014_remove_jobs_resume'),
    ]

    operations = [
        migrations.AlterField(
            model_name='jobapplication',
            name='resume',
            field=models.FileField(default='static/resume/default_resume.pdf', upload_to='static/resume/'),
        ),
    ]
