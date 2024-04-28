from http.client import HTTPResponse
from django.shortcuts import render
from django.contrib.staticfiles import finders
import os
from DB_UNAH.settings import STATIC_ROOT

def sequence(request):
    print(STATIC_ROOT)

    directorio_textos = os.path.join(STATIC_ROOT, 'script')
    ruta_archivo = os.path.join(directorio_textos, 'sequence.txt')
    with open(ruta_archivo, 'r') as archivo:
        contenido = archivo.read()

    if ruta_archivo:
        with open(ruta_archivo, 'r') as archivo:
            contenido = archivo.read()

        return render(request, 'sequence.html', {'contenido': contenido})
    else:
        return HTTPResponse("El archivo no fue encontrado.")

def home(request):
    return render(request,"index.html")

