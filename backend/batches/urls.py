from rest_framework.routers import SimpleRouter

from .views import BatchViewSet

router = SimpleRouter(trailing_slash=False)
router.register("batches", BatchViewSet, basename="batch")

urlpatterns = router.urls
