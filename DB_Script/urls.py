from django.urls import path
from . import views
app_name='DB_UNAH'

urlpatterns = [
    path('', views.home, name="home"),
    path('sequence',views.sequence, name="sequence")
]
