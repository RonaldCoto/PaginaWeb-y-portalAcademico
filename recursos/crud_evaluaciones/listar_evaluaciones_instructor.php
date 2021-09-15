<?php 
  header('Access-Control-Allow-Origin: *'); 
  header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
  
  require("../conexion.php");
  
//preparando consulta que traera los datos del curso a editar
//lista de evaluaciones segun el id del instructor logueado
  $registros=$con->prepare("SELECT ev.nombre , ev.descripcion,ev.fecha_inicio, ev.fecha_fin, ev.porcentaje, cur.nombre AS nom_curso, ev.id_evaluacion
  FROM cursos AS cur 
  INNER JOIN evaluaciones AS ev
  ON cur.id_curso=ev.id_curso
  INNER JOIN asignaciones_cursos as asig
  ON cur.id_curso=asig.id_curso
  WHERE asig.id_empleado=:codigo AND cur.estado='INICIADO'
  ORDER BY cur.nombre DESC");
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


