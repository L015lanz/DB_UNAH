from django.db import models

class cambios_en_tiempo(models.Model):
    divisa1 = models.CharField(max_length = 100)
    divisa2 = models.CharField(max_length = 100)
    valor = models.DecimalField(max_digits = 8,  decimal_places =2 )
    fecha = models.DateTimeField()
