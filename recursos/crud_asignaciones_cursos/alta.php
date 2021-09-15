<?php 
  header('Access-Control-Allow-Origin: *'); 
  header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
  
  $json = file_get_contents('php://input');
 
  $params = json_decode($json);
  
  require("../conexion.php");
//pasando a string los parametros recibidos de angular
$id_curso=intval($params->id_curso);
$id_empleado=intval($params->id_empleado);

//verificando si el curso ya tiene una asignacion, ya que solo habrá un instructor por cruso
$registros=$con->prepare("SELECT id_asignacion_curso FROM asignaciones_cursos WHERE id_curso = :id_curso1  ");
$registros->bindParam(':id_curso1',$id_curso );
$registros->execute();
$vec=[];  
$vec=$registros->fetchAll(PDO::FETCH_ASSOC);
//si el curso no esta asignado se puede asignar al nuevo instructor
if($vec == null){
     $insertar=$con->prepare("insert into asignaciones_cursos (id_curso,id_empleado) values (:id_curso,:id_empleado)");

$insertar->bindParam(':id_curso',$id_curso);
$insertar->bindParam(':id_empleado',$id_empleado);
$insertar->execute();

  
  class Result {}

  $response = new Result();
  $response->resultado = 'OK';
  $response->mensaje = 'Instructor asignado con éxito.';

  header('Content-Type: application/json');
  echo json_encode($response);  
    
    //si ya estaba asignado muestra una alerta
}else{
    class Result { }
$response = new Result();
$response -> resultado = 'ERROR';
$response -> mensaje = 'Este curso ya tiene un instructor asignado.';
header('Content-Type: application/json');
echo json_encode($response);
}
 
?>