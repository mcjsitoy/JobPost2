# Generated by Django 3.2.3 on 2021-05-20 01:56

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('Jobs', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='jobs',
            old_name='applicant',
            new_name='job_poster',
        ),
        migrations.RemoveField(
            model_name='jobs',
            name='resume',
        ),
        migrations.AddField(
            model_name='jobs',
            name='date_posted',
            field=models.DateField(auto_now_add=True, default=django.utils.timezone.now),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='jobs',
            name='location',
            field=models.CharField(blank=True, max_length=250, null=True),
        ),
        migrations.AddField(
            model_name='jobs',
            name='salary_range',
            field=models.IntegerField(default=0),
        ),
        migrations.CreateModel(
            name='JobCategory',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('category_name', models.CharField(max_length=100)),
                ('job_inCategory', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='Jobs.jobs')),
            ],
        ),
        migrations.CreateModel(
            name='JobApplication',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('resume', models.FileField(default='static/resume/default_resume.pdf', upload_to='static/resume')),
                ('date_applied', models.DateField(auto_now_add=True)),
                ('Job', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='Jobs.jobs')),
                ('applicant', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
