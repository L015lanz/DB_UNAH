from django.urls import path
from . import views
app_name='DB_UNAH'

urlpatterns = [
    path('', views.home, name="home"),
    path('sequences',views.sequence, name="sequence"),
    path('procedures',views.procedure, name="procedure"),  
    path('tables',views.table, name="table"),
    path('procedures/<str:statement_name>',views.procedure_content, name="procedure_content"),
    path('sequences/<str:statement_name>',views.sequence_content,name="sequence_content"),
    path('sequences/detail/<str:sequence>',views.sequence_detail,name="sequence_detail"),

    path('tables/<str:statement_name>',views.table_content, name="table_content"),

]
