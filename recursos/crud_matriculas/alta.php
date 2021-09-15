<?php 
  header('Access-Control-Allow-Origin: *'); 
  header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
  
  $json = file_get_contents('php://input');
 
//la matricula se recibe como array y se convierte en objeto
  $params = json_decode($json);
  
  require("../conexion.php");
//pasando a string los parametros recibidos de angular
$id_asignacion_curso=intval($params->id_asignacion_curso);
$id_federado=intval($params->id_federado);


//verificando si el federado ya esta matriculado para evitar duplicación
$registros=$con->prepare("SELECT id_matricula FROM matriculas WHERE (id_asignacion_curso = :id_asignacion1 AND id_federado = :id_federado1) ");
$registros->bindParam(':id_asignacion1',$id_asignacion_curso );
$registros->bindParam(':id_federado1',$id_federado );
$registros->execute();
$vec=[];  
$vec=$registros->fetchAll(PDO::FETCH_ASSOC);
//si el federado no esta matriculado
if($vec == null){ 
  $insertar=$con->prepare("INSERT INTO matriculas (id_federado,id_asignacion_curso) values (:id_federado,:id_asignacion_curso)");

$insertar->bindParam(':id_asignacion_curso',$id_asignacion_curso);
$insertar->bindParam(':id_federado',$id_federado);
$insertar->execute();

  
  class Result {}

  $response = new Result();
  $response->resultado = 'OK';
  $response->mensaje = 'Federado asignado con éxito.';

  header('Content-Type: application/json');
  echo json_encode($response);  
       //si ya estaba asignado muestra una alerta
}else{
    class Result { }
$response = new Result();
$response -> resultado = 'ERROR';
$response -> mensaje = 'Este federado ya está matriculado en este curso.';
header('Content-Type: application/json');
echo json_encode($response);
}
?>