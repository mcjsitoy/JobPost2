from .models import CustomUser
from rest_framework import serializers
from django.contrib.auth import authenticate



class RegistrationSerializer(serializers.ModelSerializer):

    email=serializers.EmailField()
    first_name=serializers.CharField(max_length=100)
    last_name=serializers.CharField(max_length=100)
    password=serializers.CharField(style={'input_type': 'password'}, write_only=True)
    password2=serializers.CharField(style={'input_type': 'password'}, write_only=True)
    is_employer=serializers.BooleanField(default=False)
    is_employee=serializers.BooleanField(default=False)

    class Meta:
        model = CustomUser
        fields = ('email','first_name','last_name','password','password2','is_employer','is_employee')
        extra_kwargs ={
            'password': {'write_only':True}
        }
    #Override Save
    def save(self):
        user=CustomUser(email = self.validated_data['email'])
        first_name=self.validated_data['first_name']
        last_name=self.validated_data['last_name']
        password=self.validated_data['password']
        password2=self.validated_data['password2']
        is_employer=self.validated_data['is_employer']
        is_employee=self.validated_data['is_employee']
        

        if password != password2:
            raise serializers.ValidationError({'password': 'Password must match'})
        user.set_password(password)
        user.first_name = first_name
        user.last_name = last_name
        user.is_employer=is_employer
        user.is_employee=is_employee
        user.save()
        return user

class UserLoginSerializer(serializers.Serializer):
    email=serializers.EmailField()
    password=serializers.CharField(style={'input_type': 'password'}, write_only=True)


class EditProfileSerializer(serializers.ModelSerializer):
    first_name=serializers.CharField(max_length=100)
    last_name=serializers.CharField(max_length=100)
    class Meta:
        model = CustomUser
        fields = ('first_name','last_name')


        


    


    