from django_filters import rest_framework as filters
from ..models import Manifestacao, Orgao

class OrgaoFilter(filters.FilterSet):
    prefeitura = filters.NumberFilter(field_name="prefeitura_rel", lookup_expr="exact")

    class Meta:
        model = Orgao
        fields = ['prefeitura']  # Define o novo nome do filtro
        
class ManifestacaoFilter(filters.FilterSet):
    prefeitura_id = filters.NumberFilter(field_name="orgao__prefeitura_id", lookup_expr="exact")
    status_resposta = filters.BooleanFilter(method="filter_status_resposta")

    class Meta:
        model = Manifestacao
        fields = []

    def filter_status_resposta(self, queryset, name, value):
        """
        Filtra manifestações com base no status de respostas (respondido ou não).
        """
        if value:  # Se for True, filtra manifestações que têm respostas
            return queryset.filter(respostas__isnull=False)
        return queryset.filter(respostas__isnull=True)
