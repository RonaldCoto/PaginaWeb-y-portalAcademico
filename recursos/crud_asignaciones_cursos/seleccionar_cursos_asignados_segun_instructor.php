<?php 
  header('Access-Control-Allow-Origin: *'); 
  header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
  
  require("../conexion.php");
//recibiendo id del instructor para determinar que cursos estan a su cargo
$codigo=$_GET['codigo'];
//preparando consulta
// para crear una evaluacion se mostrarán los cursos en los cuales un instructor puede publicar (asignados a el e INICIADO)
  $registros=$con->prepare("SELECT AC.id_curso, C.nombre 
                            FROM asignaciones_cursos AS AC 
                            INNER JOIN cursos AS C
                            ON AC.id_curso = C.id_curso
                            WHERE AC.id_empleado=:id_empleado
                            AND C.estado='INICIADO'");
$registros->bindParam(':id_empleado',$codigo);
//ejecutando consulta
    $registros->execute();
//almacenamiento de datos en arreglo en caso de que exista
$vec=[];  
$vec=$registros->fetchAll(PDO::FETCH_ASSOC);
  
  $cad1=json_encode($vec);
  echo $cad1;
  //header('Content-Type: application/json');
?>