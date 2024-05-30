from django.urls import path
from . import views

app_name='conversor'

urlpatterns = [
    path('', views.conversor, name='conversor'),     
    path('divisa',views.save_divisa,name='divisa'),
    path('chart/divisas/<str:divisa>',views.get_chart, name = 'chart' ),
    path('analizador', views.analizador, name='analizador'),
]