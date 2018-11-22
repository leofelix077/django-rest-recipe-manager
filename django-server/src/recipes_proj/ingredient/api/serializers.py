from rest_framework import serializers
from ingredient.models import Ingredient
from accounts.api.serializers import UserPublicSerializer
from rest_framework.reverse import reverse as api_reverse

class IngredientSerializer(serializers.ModelSerializer):
    # user = UserPublicSerializer(read_only=True)
    uri = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = Ingredient
        fields = [
            'uri',
            'id',
            'user',
            'title',
            'article_number',
            'cost_per_unit',
            'unit_of_measurement',
            'unit_of_measure_amt',
        ]
        # read_only_fields = ['user']

    def get_uri(self, obj):
        request = self.context.get('request')
        return  api_reverse('api-ingredient:detail', kwargs={'id':obj.id}, request=request)


class IngredientInlineUserSerializer(IngredientSerializer):
    class Meta:
        model = Ingredient
        fields = [
            'uri',
            'id',
            'user',
            'title',
            'article_number',
            'cost_per_unit',
            'unit_of_measurement',
            'unit_of_measure_amt',
        ]
        # read_only_fields = ['user']
        
        
