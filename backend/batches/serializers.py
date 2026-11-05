from rest_framework import serializers

from .data import STATUSES


class BatchQuerySerializer(serializers.Serializer):
    """Validates the query parameters of GET /api/batches."""

    page = serializers.IntegerField(min_value=1, default=1)
    limit = serializers.IntegerField(min_value=1, max_value=50, default=5)
    search = serializers.CharField(required=False, allow_blank=True, default="")
    status = serializers.ChoiceField(choices=STATUSES, required=False, allow_blank=True, default="")
    centre = serializers.CharField(required=False, allow_blank=True, default="")


class BatchSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    batch_code = serializers.CharField()
    course_name = serializers.CharField()
    centre_name = serializers.CharField()
    start_date = serializers.DateField()
    enrolled_students = serializers.IntegerField()
    total_capacity = serializers.IntegerField()
    status = serializers.CharField()
