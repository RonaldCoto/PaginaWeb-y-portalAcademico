<?php 
  header('Access-Control-Allow-Origin: *'); 
  header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
  
  require("../conexion.php");

//preparando consulta
// para asignar un federado a un curso se mostrarán todos los cursos que ya tengan instructor y que esten en estado INICIADO
  $registros=$con->prepare("SELECT AC.id_asignacion_curso, C.nombre, E.nombre AS instructor, E.apellido 
                            FROM asignaciones_cursos AS AC 
                            INNER JOIN cursos AS C
                            ON AC.id_curso = C.id_curso
                            INNER JOIN Empleados AS E
                            ON E.id_empleado = AC.id_empleado
                            WHERE C.estado='INICIADO'");

//ejecutando consulta
    $registros->execute();
//almacenamiento de datos de usuario en arreglo en caso de que exista
$vec=[];  
$vec=$registros->fetchAll(PDO::FETCH_ASSOC);
  
  $cad1=json_encode($vec);
  echo $cad1;
  //header('Content-Type: application/json');
?>