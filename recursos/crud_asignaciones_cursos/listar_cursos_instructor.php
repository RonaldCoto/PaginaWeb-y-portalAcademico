<?php 
  header('Access-Control-Allow-Origin: *'); 
  header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
  
  require("../conexion.php");
  
//preparando consulta que traera los datos del curso a editar
//lista de todos los cursos a los que esta asignado un instructor segun su id
  $registros=$con->prepare("SELECT cur.id_curso, cur.nombre as nombrecurso, cur.portada , emp.nombre as nombreempleado FROM 
asignaciones_cursos AS asig 
INNER JOIN cursos AS cur ON cur.id_curso = asig.id_curso
INNER JOIN empleados AS emp ON emp.id_empleado = asig.id_empleado WHERE emp.id_empleado=:codigo AND cur.estado='INICIADO'");
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