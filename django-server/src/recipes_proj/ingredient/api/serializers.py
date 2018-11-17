from rest_framework import serializers
from ingredient.models import Ingredient
from accounts.api.serializers import UserPublicSerializer
from rest_framework.reverse import reverse as api_reverse

class IngredientSerializer(serializers.ModelSerializer):
    user = UserPublicSerializer(read_only=True)
    uri = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = Ingredient
        fields = [
            'uri',
            'id',
            'user',
            'title',
            'content',
            'article_number',
            'cost_per_unit',
            'currency',
            'unit_of_measurement',
            'unit_of_measure_amt',
            'image_url',
            'kcal_total',
            'last_modified',
            'created_on',
        ]
        read_only_fields = ['user']

    def get_uri(self, obj):
        request = self.context.get('request')
        return  api_reverse('api-ingredient:detail', kwargs={'id':obj.id}, request=request)

    def validate(self, data):
        content = data.get('content', None)
        if content == '':
            content = None
        image = data.get('image', None)
        if content is None and image is None:
            raise serializers.ValidationError("content or image is required")
        return data


class IngredientInlineUserSerializer(IngredientSerializer):
    class Meta:
        model = Ingredient
        fields = [
            'uri',
            'id',
            'user',
            'title',
            'content',
            'article_number',
            'cost_per_unit',
            'currency',
            'unit_of_measurement',
            'unit_of_measure_amt',
            'image_url',
            'kcal_total',
            'last_modified',
            'created_on',
        ]
        read_only_fields = ['user']
        
