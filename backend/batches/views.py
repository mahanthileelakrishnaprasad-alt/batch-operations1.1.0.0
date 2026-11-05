from rest_framework import status as http
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from .serializers import BatchQuerySerializer, BatchSerializer
from .services import filter_batches, list_centres, paginate


class BatchViewSet(viewsets.ViewSet):
    """
    Read-only batch API.

    GET /api/batches?page=1&limit=5&search=&status=&centre=
    GET /api/batches/centres
    """

    def list(self, request):
        query = BatchQuerySerializer(data=request.query_params)
        if not query.is_valid():
            return Response(
                {"success": False, "errors": query.errors},
                status=http.HTTP_400_BAD_REQUEST,
            )
        params = query.validated_data

        matches = filter_batches(params["search"], params["status"], params["centre"])
        page_items, pagination = paginate(matches, params["page"], params["limit"])

        return Response({
            "success": True,
            "data": BatchSerializer(page_items, many=True).data,
            "pagination": pagination,
        })

    @action(detail=False, methods=["get"])
    def centres(self, request):
        """Options for the 'All Centres' dropdown."""
        return Response({"success": True, "data": list_centres()})
