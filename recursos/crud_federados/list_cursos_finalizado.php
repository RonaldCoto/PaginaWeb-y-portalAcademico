<?php 
  header('Access-Control-Allow-Origin: *'); 
  header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
  
  require("../conexion.php");
  
//preparando consulta que traera los datos de los cursos en los que esta matriculado un federado
  $registros=$con->prepare("SELECT cur.nombre as nombrecurso, cur.descripcion,cur.estado, emp.nombre as nombreempleado , fed.nombre as nombrefederado, fed.apellido as apellidofederado, asig.id_curso FROM matriculas as matri INNER JOIN federados AS fed ON fed.id_federado = matri.id_federado INNER JOIN asignaciones_cursos AS asig ON asig.id_asignacion_curso = matri.id_asignacion_curso INNER JOIN cursos AS cur ON cur.id_curso = asig.id_curso INNER JOIN empleados AS emp ON emp.id_empleado = asig.id_empleado WHERE fed.id_federado=:codigo AND cur.estado='FINALIZADO'");
//asignando datos
  $registros->bindParam(':codigo',$_GET['codigo']);
//ejecutando consulta
  $registros->execute();
    
  //almacenamiento de datos de usuario en arreglo en caso de que exista
$vec=[];  
 $vec=$registros->fetchAll(PDO::FETCH_ASSOC);
  
  $cad=json_encode($vec);
  echo $cad;
  //header('Content-Type: application/json');
?>