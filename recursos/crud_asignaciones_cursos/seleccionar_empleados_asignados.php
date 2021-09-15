<?php 
  header('Access-Control-Allow-Origin: *'); 
  header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
  
  require("../conexion.php");
//recibiendo id del curso para determinar el instructor que esta asignado a él
$codigo=$_GET['codigo'];
//preparando consulta
// para asignar un federado a un curso se mostrará el nombre del instructor a cargo del curso seleccionado
  $registros=$con->prepare("select  E.nombre, E.apellido, E.estado
                            FROM asignaciones_cursos AS AC 
                            INNER JOIN empleados AS E
                            ON (AC.id_empleado = E.id_empleado)
                            WHERE AC.id_curso=:id_curso");
$registros->bindParam(':id_curso',$codigo);
//ejecutando consulta
    $registros->execute();
//almacenamiento de datos de usuario en arreglo en caso de que exista
$vec=[];  
$vec=$registros->fetchAll(PDO::FETCH_ASSOC);
  
  $cad=json_encode($vec);
  echo $cad;
  //header('Content-Type: application/json');
?>