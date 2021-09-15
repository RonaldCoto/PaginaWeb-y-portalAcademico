<?php 
  header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

require("../conexion.php");
//recibiendo id del federado a eliminar desde angular
$codigo=$_GET['codigo'];
//validando si el federado a eliminar esta matriculado en un curso
$registros=$con->prepare("SELECT * FROM matriculas WHERE id_federado=:codigo ");
$registros->bindParam(':codigo',$codigo);
$registros->execute();
//almacenamiento de datos de matricula en arreglo en caso de que exista
$vec=[];  
$vec=$registros->fetchAll(PDO::FETCH_ASSOC);
//si el federado no esta matriculado se puede eliminar
if($vec==null){
    $eliminacion=$con->prepare("DELETE  FROM federados WHERE id_federado=:codigo");
    $eliminacion->bindParam(':codigo',$codigo);
    $eliminacion->execute();
    class Result { }

$response = new Result();
$response -> resultado = 'OK';
$response -> mensaje = 'Federado eliminado con éxito';

header('Content-Type: application/json');
echo json_encode($response);  
//si el federado esta matriculado en un curso
}else{

class Result { }
$response = new Result();
$response -> resultado = 'ERROR';
$response -> mensaje = 'Este federado no puede ser eliminado, cambie el estado del perfil a "BAJA"';
header('Content-Type: application/json');
echo json_encode($response);
    }
?>