from django.http import HttpResponse
from django.shortcuts import render
from django.shortcuts import redirect
import requests
from .models import cambios_en_tiempo
import json
import datetime
from django.http import JsonResponse
from random import randrange
from django.utils import timezone
import ply.lex as lex
import ply.yacc as yacc
from anytree import Node, RenderTree



########### GRAMATICA ###########


# Lista de tokens
tokens = (
    'ID',
    'NUMERO',
    'IGUAL',
    'ASTERISCO',
    'SLASH',
)

# Definición de tokens
t_IGUAL = r'='
t_ASTERISCO = r'\*'
t_SLASH = r'/'

def t_ID(t):
    r'[a-zA-Z_][a-zA-Z0-9_]*'
    return t

def t_NUMERO(t):
    r'\d+(\.\d+)?'  # Expresión regular para números enteros o flotantes
    t.value = float(t.value)  # Convertir el valor a flotante
    return t

# Ignorar espacios y tabulaciones
t_ignore = ' \t'

def t_newline(t):
    r'\n+'
    t.lexer.lineno += len(t.value)

def t_error(t):
    print(f"Error léxico: Carácter ilegal '{t.value[0]}' en la línea {t.lineno}")
    t.lexer.skip(1)

# Construir el analizador léxico
lexer = lex.lex()

# Reglas de la gramática
def p_conversion(p):
    '''
    conversion : cantidadDivisa ASTERISCO tasaCambio
               | cantidadDivisa SLASH tasaCambio
    '''
    if p[2] == '*':
        p[0] = p[1] * p[3]
    else:
        p[0] = p[1] / p[3]

    # Crear el nodo raíz
    p[0] = Node("conversion", value=p[0])

    # Crear nodos hijos para los operandos
    cantidad_divisa_node = Node(f"cantidadDivisa: {p[1]}", parent=p[0], value=p[1])
    tasa_cambio_node = Node(f"tasaCambio: {p[3]}", parent=p[0], value=p[3])

def p_cantidadDivisa(p):
    '''
    cantidadDivisa : NUMERO
                   | ID
    '''
    p[0] = p[1]

def p_tasaCambio(p):
    '''
    tasaCambio : NUMERO
    '''
    p[0] = p[1]

def p_error(p):
    print("Error de sintaxis:", p)

# Construir el analizador sintáctico
parser = yacc.yacc()

########### FIN GRAMATICA ###########

def analizador(request):
    if request.method == 'GET':
        try:
            data = request.GET.get('input_text')
            lexer.input(data)  # Entrada para el analizador léxico
            result = []
            for token in lexer:
                result.append((token.lineno, token.type, token.value))
            
            # Analizador sintáctico
            resultado_analisis = parser.parse(data)
            
            # Convertir el árbol de análisis sintáctico a una cadena detallada
            tree_str = "\n".join([f"{pre}{node.name}" for pre, _, node in RenderTree(resultado_analisis)])
            
            context = {
                'analisis_lexico': result,
                'resultado_analisis': resultado_analisis,
                'arbol_sintactico': tree_str  # Pasar el árbol sintáctico como cadena al contexto
            }
            
            return render(request, 'analizador.html', context)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)
    else:
        return JsonResponse({'error': 'Método no permitido'}, status=405)

def index(request):
    return redirect('conversor:conversor')

def conversor(request):

    return render(request,'index-conversor.html')


def save_divisa(request):

    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            for key,value in data.items():
                #cambios_en_tiempo.objects.create(divisa1="USD",divisa2=key,valor=value,fecha = timezone.now())
                registro= cambios_en_tiempo.objects.filter(divisa2=key).earliest('fecha')  
                registro.valor = value*(randrange(95,105)/100)
                registro.fecha = timezone.now()
                
                registro.save() 

            return JsonResponse({'mensaje': 'Datos recibidos correctamente'})
        except json.JSONDecodeError as e:
            return JsonResponse({'error': 'Error al analizar el JSON'}, status=400)
    else:
        return JsonResponse({'error': 'Método no permitido'}, status=405)


def animate_graph(request):

    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            for key,value in data.items():
                #cambios_en_tiempo.objects.create(divisa1="USD",divisa2=key,valor=value,fecha = timezone.now())
                registro= cambios_en_tiempo.objects.filter(divisa2=key).earliest('fecha')  
                registro.valor = value*(randrange(95,105)/100)
                registro.fecha = timezone.now()
                
                registro.save() 

            return JsonResponse({'mensaje': 'Datos recibidos correctamente'})
        except json.JSONDecodeError as e:
            return JsonResponse({'error': 'Error al analizar el JSON'}, status=400)
    else:
        return JsonResponse({'error': 'Método no permitido'}, status=405)



def consultar_api(url):
    try:
        response = requests.get(url)

        if response.status_code == 200:
            data = response.json()
            return data
        else:
            print(f"Error al consultar la API: {response.status_code}")
            return None
    except Exception as e:
        print(f"Error: {e}")
        return None

def get_chart(_request,divisa):
    serie=[]
    counter = 0
    divisas = cambios_en_tiempo.objects.filter(divisa2=divisa).order_by('-fecha')
##    datos_json = consultar_api("https://v6.exchangerate-api.com/v6/73a43881665719d06052d8f8/latest/USD")
  ##  limite=datos_json['conversion_rates'][divisa]
    
    for i in divisas:       
        serie.append(i.valor)
        counter+=1
        last_value=i.valor
    limite=float(last_value)
    chart={
        'xAxis':[
            {
                'type':'category',
            }
        ],
        'yAxis':[
            {
                'type':'value',
                'min':0 + limite*0.2,
                'max':limite*1.5
            }
        ],
        'series':[
            {
                'data':serie,
                'type': 'line',
                'symbol': 'none',
                'color': 'rgba(54, 162, 235, 1)',
                'areaStyle': {
                    'color': 'rgba(54, 162, 235, 0.2)',
                }
                
            }
        ]
    }

    return JsonResponse(chart)
    