from http.client import HTTPResponse
from django.shortcuts import render
from .analyzer import analyzer
from django.http import JsonResponse

def sequence(request):
    analyzer_results=analyzer()
    analyzer_results.find_statements("sequence.txt","CREATE SEQUENCE ")
    return render(request,"statement.html",{"statements_names":analyzer_results.list_statement,"statement_js":"static/js/sequence.js",
                                            "statement_css":"static/css/sequence.css"})

def procedure(request):
    analyzer_results=analyzer()
    analyzer_results.find_statements("procedure.txt","CREATE OR REPLACE PROCEDURE ")
    return render(request,"statement.html",{"statements_names":analyzer_results.list_statement,"statement_js":"static/js/procedure.js",
                                            "statement_css":"static/css/procedure.css"})

def table(request):
    analyzer_results=analyzer()
    analyzer_results.find_statements("table.txt","CREATE TABLE ")
    return render(request,"statement.html",{"statements_names":analyzer_results.list_statement,"statement_js":"static/js/table.js",
                                            "statement_css":"static/css/table.css"})

def home(request):
    return render(request,"index.html")

def sequence_detail(request,sequence):
    analyzer_results=analyzer()
    jsonresult=analyzer_results.sequence_details("sequence.txt",sequence,"")
    return JsonResponse({"sequence":jsonresult})


def sequence_content(request,statement_name):
    analyzer_results=analyzer()
    jsonresult=analyzer_results.statement_content("sequence.txt",statement_name,"CREATE SEQUENCE ")
    return JsonResponse({"sequence":jsonresult})

def procedure_content(request,statement_name):
    analyzer_results=analyzer()
    jsonresult=analyzer_results.statement_content("procedure.txt",statement_name,"CREATE OR REPLACE PROCEDURE ")
    return JsonResponse({"procedure":jsonresult})

def table_content(request,statement_name):
    analyzer_results=analyzer()
    jsonresult=analyzer_results.statement_content("table.txt",statement_name,"CREATE TABLE ")
    return JsonResponse({"table":jsonresult})
