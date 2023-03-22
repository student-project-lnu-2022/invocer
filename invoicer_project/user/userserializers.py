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


class UserSettingsSerializer(serializers.ModelSerializer):
    old_password = serializers.CharField(max_length=100, write_only=True)
    new_password = serializers.CharField(max_length=100, write_only=True)
    id = serializers.IntegerField(write_only=True)
    class Meta:
        model = User
        fields = ("id", "first_name", "last_name", "email", "password", "company_name", "country", "city", "address", 'old_password', 'new_password')

    def validate(self, attrs):
        old_password = attrs.get('old_password', None)
        new_password = attrs.get('new_password', None)
        user = User.objects.get(id=attrs['id'])
        print(attrs)
        if old_password is not None:
            print(user.check_password(old_password))
            if user.check_password(old_password):
                user.set_password(new_password)
                user.save()
                attrs['password'] = new_password
            else:
                raise serializers.ValidationError("Invalid password")
        return attrs
