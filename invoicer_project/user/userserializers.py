from rest_framework import serializers
from .models import User


class UserSerializer(serializers.ModelSerializer):
    repeat_password = serializers.CharField(max_length=100, write_only=True)

    class Meta:
        model = User
        fields = ("first_name", "last_name", "email", "password", "repeat_password")
        extra_kwargs = {'password': {'write_only': True}}

    def validate(self, attrs):
        password = attrs.get('password')
        repeat_password = attrs.get('repeat_password')
        if password != repeat_password:
            raise serializers.ValidationError("Password and Confirm Password don't match")
        return attrs

    def create(self, validated_data):
        obj = User.objects.create_user(**validated_data)
        return obj
