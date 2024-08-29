from django.contrib import admin
from django.conf import settings
from django.conf.urls.static import static
from django.urls import path, include
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from admin_auth.views import CreateUserView

urlpatterns = [
    path("admin/", admin.site.urls),
    path("auth/user/register/", CreateUserView.as_view(), name="register"),
    path("auth/token/", TokenObtainPairView.as_view(), name="get_token"),
    path("auth/token/refresh/", TokenRefreshView.as_view(), name="refresh_token"),
    path("admin_auth/", include("rest_framework.urls")),

] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
