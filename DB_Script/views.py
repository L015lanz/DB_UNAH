from http.client import HTTPResponse
from django.shortcuts import render
from .analyzer import analyzer
from django.http import JsonResponse

def sequence(request):
    analyzer_results=analyzer()
    analyzer_results.find_statements("sequence.txt","")
    return render(request,"sequence.html",{"statements_names":analyzer_results.list_statement})

def procedure(request):
    analyzer_results=analyzer()
    analyzer_results.find_statements("procedure.txt","CREATE OR REPLACE PROCEDURE ")
    return render(request,"procedure.html",{"statements_names":analyzer_results.list_statement})

def home(request):
    return render(request,"index.html")

def sequence_detail(request,sequence):
    analyzer_results=analyzer()
    jsonresult=analyzer_results.sequence_details("sequence.txt",sequence,"")
    return JsonResponse({"sequence":jsonresult})

def procedure_content(request,statement_name):
    analyzer_results=analyzer()
    jsonresult=analyzer_results.statement_content("procedure.txt",statement_name,"CREATE OR REPLACE PROCEDURE ")
    return JsonResponse({"procedure":jsonresult})
