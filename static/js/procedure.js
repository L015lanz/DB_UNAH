function moreinfo(name){
    row=document.getElementById(name);
    infobtn=document.getElementById("info"+name);

        fetch(`http://127.0.0.1:8000/procedures/${name}`)
        .then((res) => res.json())
        .then((data)=>   {
            if (row.innerHTML==''){

            row.innerHTML=`
            <div class="row-content">
                <div class="more"><div class="btn-show" onclick="modalopen('${name}')">ver mas..</div></div>
                <pre class="json">CREATE OR REPLACE PROCEDURE ${name.toUpperCase()} ${data.procedure.CONTENT}</pre>
            </div>
            `;  
            infobtn.innerHTML='<i class="fa-solid fa-angle-up"></i>';           
         
            }else{
                row.innerHTML='';
                infobtn.innerHTML='<i class="fa-solid fa-angle-down"></i>';           

            }
        } )     
}


function modalopen(name){
    modal=document.getElementById("base-modal");
    modal.innerHTML=`<div class="modal">
                    <section class="modal-title">Detalles sobre procedimiento almacenado ${name.toUpperCase()}</section>
                    <section class="modal-content">
                        <div id="moreinfo-content">
                            <div id="content">
                            ${printFinally(name.toUpperCase())}
                            </div>
                        </div>
                        <div class="modal-footer"> 
                           <div class="btn close-btn" onclick="modalclose()">Cerrar</div>
                        </div>
                    </section>
                    </div>`;    
    modal.className+='modal-container';
}

function printFinally(statementName) {
    let procedure = procedures.find(p => p.statement_name === statementName);
    if (procedure) {
        return procedure.finally;
    } else {
        return 'No display found';
    }
}


let procedures = [
    {statement_name: "ADICIONAR_ASIGNATURA",
    finally:"Su funcionalidad es la de matricular la asignatura, cuenta con varios manejos de errores para asegurarse de no haber traslape de horario, en las clases, procedimiento destinado a ser usado por el modulo de estudiantes"},
    {statement_name: "AGRANDAR_CUPOS",
    finally:"Su funcionalidad es la de agrandar los cupos de las secciones, de forma que al agrandarlos matricular automaticamente a los estudiantes que esten en lista de espera, ademas de eso calcular la cantidad de cupos disponibles todavia luego del aumento, destinado a ser usado por el modulo de jefe de departamento"},
    {statement_name: "AGREGAR_FOTO_PERFIL",
    finally:"Su funcionalidad es la de agregar fotos de perfil para estudiantes y maestros, contiene las restricciones respectivas para agregar 3 o menos fotos, en este caso lo que se manda como parametro es el nombre de la foto para luego la muestre el servidor"},
    {statement_name: "AGREGAR_VIDEO",
    finally:"Su funcionalidad es la de agregar un video a una seccion especifica, destinada a ser usada por el modulo de maestros con motivo que den una introduccion a cada una de sus clases"},
    {statement_name: "ASIGNATURAS_CARRERA_JEFE",
    finally:"Sun funcionalidad es la de mostrarle al jefe de departamento, las asignaturas al jefe de departamento para que el luego pueda verlas y gestionarlas de la forma que considere conveniente"},
    {statement_name: "CANCELAR_ASIGNATURA_ESTUDIANTE",
    finally:"Su funcionalidad es la de que el estudiante pueda cancelar propiamente sus asignaturas, de forma tal que se vea reflejada en la base de datos que cancelo la asignatura y eliminar de la evaluacion de docente por parte de ese alumno."},
    {statement_name: "CANCELAR_SECCION",
    finally:"Su funcionalidad es la de dar de baja a una seccion, destinada a ser usada por el jefe de carrera, se usa en casos de baja matricula y el jefe de carrera considera mover los recursos a otra clase"},
    {statement_name: "CARGA_ACADEMICA",
    finally:"Su funcionalidad es la de mostrar la carga academica que hay en el periodo actual al jefe de carrera, mostrando las horas de inicio y fin ademas de los nombres de los docentes"},
    {statement_name: "CARRERAS_CENTRO",
    finally:"Su funcionalidad es la de mostrar las carreras disponibles por centro de estudio"},
    {statement_name: "CREAR_ASPIRANTE",
    finally:"Su funcionalidad es la de ingresar un nuevo aspirante, el cual una vez seleccion la carrera a la cual ingresara y una segunda carrera a la como segunda opcion, ademas de configurar de forma automatica cuales seran los examens que debera realizar el estudiante"},
    {statement_name: "CREAR_DOCENTE",
    finally:"Su funcionalidad es la de agregar a un docente al departamento de forma tal que no se pueda ingresar mas de un coordinador o mas de un jefe por departamento, ademas de crear de forma automatica el numero de cuenta"},
    {statement_name: "CREAR_SECCIONES",
    finally:"Su funcionalidad es la de crear las secciones correspondientes de cada asignatura para cada nuevo periodo, de forma tal que no haya traslape de horarios en docentes ni traslape de horarios para aulas"},
    {statement_name: "DEPARTAMENTO_COORDINADOR",
    finally:"Su funcionalidad es la de obtener el departamento al cual pertence el coordinador"},
    {statement_name: "DEPTOS_CENTRO",
    finally:"Su funcionalidad es la de obtener los departamentos de que tiene un centro de estudios"},
    {statement_name: "DESCRIPCION_ESTUDIANTE",
    finally:"Su funcionalidad es la de agregar un descripcion que el estudiante quiera poner en su perfil"},
    {statement_name: "ENVIAR_CONTRA",
    finally:"Su funcionalidad es la de recibir una contraseña y reestablecerla dependiendo de quien la quiera en este caso podria ser un estudiante o un docente"},
    {statement_name: "ESTUDIANTES_SECCION",
    finally:"Su funcionalidad es la de obtener la lista de los estudiantes matriculados en esta seccion, modulo destinado a ser usado por docentes"},
    {statement_name: "EVALUACION_DOCENTE",
    finally:"Su funcionalidad es la de ingresar la evaluacion que el estudiante considere correcta dar al docente"},
    {statement_name: "HISTORIAL_ACADEMICO",
    finally:"Su funcionalidad es la de obtener el historial academico de un estudiante, procedimiento destinado a ser usado por un estudiante para obtener su propio historial o bien por el coordinador de carrera para ver el mismo"},
    {statement_name: "INGRESAR_ESTUDIANTE",
    finally:"Su funcionalidad es de ingresar un nuevo estudiante una vez que este haya pasado su examen correspodiente, ademas de crear automaticamente su numero de cuenta y recibe la contraseña para sus inicios de sesion"},
    {statement_name: "INGRESAR_NOTA",
    finally:"Su funcionalidad es la de que un docente ingrese la nota a cada uno de sus alumnos en sus respectivas clases"},
    {statement_name: "INGRESAR_NOTA_ASPIRANTE",
    finally:"Su funcionalidad es de ingresar en la base de datos la nota obtenida de cada aspirante en sus respectivos examenes, ademas obtiene el correo del estudiante apra hacer la respectiva notificacion  "},
    {statement_name: "INGRESAR_PERIODO",
    finally:"Su funcionalidad es al de ingresar un nuevo periodo a la base de datos, ademas d ela respectiva configuracion, esto lo hace el adminsitrador de la aplicacion"},
    {statement_name: "INICIO_JEFEDEPARTAMENTO",
    finally:"Su funcionalidad es la de extraer de la base de datos la informacion para la pagina de inicio del jefe de departamento"},
    {statement_name: "INSERTAR_EN_CONF_MATRICULA",
    finally:"Su funcionalidad es la de insertar los intervalos de tiempo configurados para los dias de matricula, segun indices de los estudiantes"},
    {statement_name: "LOGIN_SP",
    finally:"Su funcionalidad es la de buscar en la base de datos el usuario obtener que clase de rol cumple con respecto al sistema y devuelve la clave para hacer una comparacion en el backend con la clave que ingresa el usuario "},
    {statement_name: "OBTENERAULAS",
    finally:"Su funcionalidad es obtener las aulas disponibles por carrera y edificio, disponible para ser usado por el jefe de carrera"},
    {statement_name: "OBTENERCORREO",
    finally:"Su funcionalidad es la de obtener el correo de un estudiante o un docente, usado principalmente para enviarle notificaciones en cuestion"},
    {statement_name: "OBTENEREDIFICIOS",
    finally:"Su funcionalidad es la de obtener los edificios que tiene disponible el jefe de carrera para disponer de ellos, el SP de obtener aulas depende de este"},
    {statement_name: "OBTENERESTADISTICAS",
    finally:"Sirve para que el jefe de carrera pueda ver las estadisticas(promedio) de las evaluaciones de los estudiantes"},
    {statement_name: "OBTENERESTADISTICAS2",
    finally:"Su funcionalidad es la de obtener estadisticas con respecto a los alumnos que tiene matriculado"},
    {statement_name: "OBTENEREVALUACIONDOCENTE",
    finally:"Su funcionalidad es la de obtener la evaluacion del maestro en el presente periodo"},
    {statement_name: "OBTENER_ASIGNATURAS_A_MATRICULAR",
    finally:"Su funcionalidad es la de mostrarle al estudiante las asignaturas que tiene disponible para matricular"},
    {statement_name: "OBTENER_CAMBIO_CAR",
    finally:"Su funcionalidad es la de mostrarle al jefe de carrera las solicitudes de cambio de carrera entrantes"},
    {statement_name: "OBTENER_CAMBIO_CENTRO",
    finally:"Su funcionalalidad es la de mostrar las solicitudes de cambio de centro"},
    {statement_name: "OBTENER_CANCELACION_EXC",
    finally:"Su funcionalidad es la de mostrar las solicitudes de cancelaciones excepcionales(fuera de periodo de adiciones y cancelaciones), disponible para ser usado por el coordinador de carrera"},
    {statement_name: "OBTENER_CENTROS",
    finally:"Su funcionalidad es la de obtener los centros educativos que tiene la universidad"},
    {statement_name: "OBTENER_CLASES_A_MATRICULAR",
    finally:"[Deprecated] Su funcionalidad es la de obtener las clases que un alumno puede matricular involucrando secciones y demas datoso como el nombre del docente que la impartirá, todo en una sola lista de todas las asignaturas y secciones"},
    {statement_name: "OBTENER_CLASES_A_MATRICULAR2",
    finally:"Su funcionalidad es de obtener las clases que puede matricular por asignatura, es decir las secciones disponibles para dicha asignatura, a diferencia del otro procedimiento este requiere saber antes de que asignatura se trata para luego mostrar los horarios y demas"},
    {statement_name: "OBTENER_CLASES_CURSADAS",
    finally:"Su funcionalidad es la de obtener las clases que ha cursado el alumno"},
    {statement_name: "OBTENER_CLASES_MATRICULADAS",
    finally:"Su funcionalidad es la de obtener las clases qur tiene el alumno matriculadas en el presente periodo"},
    {statement_name: "OBTENER_CSV_ESTUDIANTE",
    finally:"Su fucnionaldiad sirve para obtener generar un archivo de excel con la informacion de los aspirantes que aprobaron su examen de admision"},
    {statement_name: "OBTENER_DATOS_ASPIRANTE",
    finally:"Sirve para obtener los datos del aspirantes"},
    {statement_name: "OBTENER_DEPARTAMENTOS_MATRICULA",
    finally:"Su funcionalidad es la de obtener los departamentos que tiene el alumno a la hora de matricular, esta en conjunto con obtener_asigntauras_a_matricular y obtener_clases_a_matricular forman la parte del proceso de matricula de clases"},
    {statement_name: "OBTENER_DNI_ASPIRANTES",
    finally:"Su funcion es la de obtener el DNI de todos los aspirantes nuevos"},
    {statement_name: "OBTENER_DOCENTES_JEFE",
    finally:"Su funcion es la de mostrarle al jefe de departamento cada uno de los docentes que tiene disponibles para hacer su planficacion"},
    {statement_name: "OBTENER_ESTUDIANTES_MATRICULADOS",
    finally:"Su funcion es mostrar una lista con la informacion de los estudiantes matriculados en el presente periodo, disponible para jefe de carrera y coordinador de carrera"},
    {statement_name: "OBTENER_ESTUDIANTES_MATRICULADOS2",
    finally:"Su funcion es la de obtener una lista de los primeros 10 estudiantes con una busqueda dinamica de numeros de cuenta"},
    {statement_name: "OBTENER_FOTOS",
    finally:"Sirve para obtener la direccion de las fotos, esto para que las maneje el servidor de archivos"},
    {statement_name: "OBTENER_INDICE",
    finally:"Sirve para obtener el indice de un estudiante segun las clases que lleva"},
    {statement_name: "OBTENER_LISTA_ESPERA",
    finally:"Sirve para obtener el numero de estuidantes en lista de espera, disponible para ser usado por el jefe de carrera y tambien por los estudaintes que desen matricular sus asignaturas"},
    {statement_name: "OBTENER_LISTA_MATRICULADOS",
    finally:"Sirve para obtener el numero de estuidantes matriculados por asignatura, disponible para ser usado por el jefe de carrera"},
    {statement_name: "OBTENER_NOTAS_ESTUDIANTE",
    finally:"Sirve para mostrar las notas del estudiante en el presente periodo"},
    {statement_name: "OBTENER_PERMISO",
    finally:"Sirve para verificar primero si es dia o no de matricula y hacer posteriormente una redireccion"},
    {statement_name: "OBTENER_PERMISO2",
    finally:"Su funcion es la de verificar si tiene permiso para cancelar asignturas"},
    {statement_name: "OBTENER_SECCIONES_ASIGNATURA",
    finally:"Su fucion es la de obtener todas las secciones disponibles por asignturas, destinada a ser vista por le jefe de carrera pueda ver las secciones de cada asigntura"},
    {statement_name: "OBTENER_SECCIONES_DOCENTE",
    finally:"Sirve para obtener las secciones que tiene asignadas el docente"},
    {statement_name: "OBTENER_SECCIONES_ESTUDIANTE",
    finally:"Sirve para ver las secciones que tiene el estudiante y asi poder cancelarlas"},
    {statement_name: "OBTENER_S_REPO",
    finally:"Su funcion es la de obtener la solicitudes de reposicion"},
    {statement_name: "PERFIL_DOCENTE",
    finally:"Su funcion es mostrar la informacion del perfil del docnete"},
    {statement_name: "PERFIL_ESTUDIANTE",
    finally:"Su funcion es mostrar la informacion del perfil del estudiante y filtrarl a por la cuenta del estudiante"},
    {statement_name: "PERFIL_ESTUDIANTE2",
    finally:"Su funcion es mostrar la informacion de los todos los estudiantes"},
    {statement_name: "PERFIL_MATRICULA_ESTUDIANTE",
    finally:"Su funcion es la de mostrar informacion del estudiante posteriormente esta informacion es usada para generar parte del certificado/historial academico"},
    {statement_name: "PERIODO_ACTUAL",
    finally:"Sirve para obtener el periodo actual segun modalidad(semestral o trimestral) esta informacion luego se utiliza para generar el nuevo periodo"},
    {statement_name: "RESULTADOS_ASPIRANTE",
    finally:"Sirve para generar a que carreras y demas aprobo el aspirante dicha informacion tambien se usa para generar el correo electronico con la informacion pertinente"},
    {statement_name: "SECCION_DOCENTE",
    finally:"Sirve para ver a detalle la seccion del docente en cuestion(espacion virtual), aqui se obtiene el link del video introductorio a la clase para mostrarlo a detalle, es usada tanto por estudiantes como por le propio docente"},
    {statement_name: "SP_CAMBIO_CAR",
    finally:"Sirve para generar la solicitud de cambio de carrera, utilizada por alumnos"},
    {statement_name: "SP_CAMBIO_CENTRO",
    finally:"Sirve para generar la solicitud de cambio de centro, utilizada por estudiantes"},
    {statement_name: "SP_CANCELACION_EX",
    finally:"Sirve para generar la solicitud de cancelacion excepcional"},
    {statement_name: "SP_CANCELAR_SEC_EXC",
    finally:"Sirve para generar cuales asignaturas desea cancelar el estudiante en cuestion dependiendo de la solicitud de la cancelacion(el SP_CANCELACION_EX)"},
    {statement_name: "SP_REPO",
    finally:"Sirve para generar solicitud de reposicion"},
    {statement_name: "SP_SIGUIENTE_PERIODO",
    finally:"Sirve para generar cual es el siguiente periodo segun la modalidad(trimestral o semestral)"},
    {statement_name: "TITULO_SECCION",
    finally:"Sirve para darle un nombre con formato a la seccion en cuestion"},
    {statement_name: "VERIFICAR_CAMBIO_CAR",
    finally:"Sirve para verificar que antes de hacer la solicitud del cambio de carrera exista en el centro educativo en el que estudia"},
    {statement_name: "VERIFICAR_CAMBIO_CENTRO",
    finally:"Sirve para verificar que exista la carrera actual en la que esta antes de realizar la solicitud del cambio del centro, ademas de hacer realizar el cambio de carrera de forma automatica cuando es la fecha correspondiente"},
    {statement_name: "VERIFICAR_S_CANCEL_EXC",
    finally:"Su funcionalidad es mostrar el estado de la solicitud y cancelar la asignatura una vez el coordinador haya decidido aceptar o no la solicitud"}   
];
