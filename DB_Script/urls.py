from django.urls import path
from . import views
app_name='DB_UNAH'

urlpatterns = [
    path('', views.home, name="home"),
    path('sequences',views.sequence, name="sequence"),
    path('procedures',views.procedure, name="procedure"),
    path('procedures/<str:statement_name>',views.procedure_content, name="procedure_content"),

    path('sequences/<str:sequence>',views.sequence_detail,name="sequence_detail")
]
