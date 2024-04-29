import re
from DB_UNAH.settings import STATIC_ROOT
import os
import json






class analyzer:
    def __init__(self):
        self.list_statement=[]
        self.nameDB='"C##DBAUNAH"'


    def find_statements(self,filename):
        dir_file = os.path.join(STATIC_ROOT, 'script')
        route_file = os.path.join(dir_file, filename)
        with open(route_file, 'r') as rf:
            for line in rf:
                line.strip()
                if line.strip()!='':
                    pattern_statment = re.compile(r'"C##DBAUNAH"\."(\w+)"')
                    self.list_statement.extend(pattern_statment.findall(line.strip()))

    def sequence_details(self,filename,statement_name):
        dir_file = os.path.join(STATIC_ROOT, 'script')
        route_file = os.path.join(dir_file, filename)
        with open(route_file, 'r') as rf:
                pattern_statment = re.compile(fr'"C##DBAUNAH"\."{statement_name.upper()}"([^;]+);')
                info=pattern_statment.findall(rf.read())
                pattern = re.compile(r'MINVALUE (\d+) MAXVALUE (\d+) INCREMENT BY (\d+) START WITH (\d+) CACHE (\d+) (\w+)')
                print(info[0].strip())

                match = pattern.match(info[0].strip())
                if match:
                # Extraer los valores de la secuencia
                    minvalue = int(match.group(1))
                    maxvalue = int(match.group(2))
                    increment_by = int(match.group(3))
                    start_with = int(match.group(4))
                    cache = int(match.group(5))
                    cycle=str(match.group(6))

                # Crear el diccionario JSON
                sequence_json = {
                    "MINVALUE": minvalue,
                    "MAXVALUE": maxvalue,
                    "INCREMENT_BY": increment_by,
                    "START_WITH": start_with,
                    "CACHE": cache,
                    "CYCLE":cycle
                }

                return sequence_json
    
              
