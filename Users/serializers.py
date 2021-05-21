from .models import CustomUser
from rest_framework import serializers
from django.contrib.auth import authenticate



class EmployeeRegistrationSerializer(serializers.ModelSerializer):

    email=serializers.EmailField()
    first_name=serializers.CharField(max_length=100)
    last_name=serializers.CharField(max_length=100)
    password=serializers.CharField(style={'input_type': 'password'}, write_only=True)
    password2=serializers.CharField(style={'input_type': 'password'}, write_only=True)

    class Meta:
        model = CustomUser
        fields = ('email','first_name','last_name','password','password2')
        extra_kwargs ={
            'password': {'write_only':True}
        }
    #Override Save
    def save(self):
        user=CustomUser(email = self.validated_data['email'])
        first_name=self.validated_data['first_name']
        last_name=self.validated_data['last_name']
        password = self.validated_data['password']
        password2 = self.validated_data['password2']

        if password != password2:
            raise serializers.ValidationError({'password': 'Password must match'})
        user.set_password(password)
        user.first_name = first_name
        user.last_name = last_name
        user.save()
        return user

class UserLoginSerializer(serializers.Serializer):
    email=serializers.EmailField()
    password=serializers.CharField(style={'input_type': 'password'}, write_only=True)
        


    


    