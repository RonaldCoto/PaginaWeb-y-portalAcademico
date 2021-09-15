<?php 
  header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

require("../conexion.php");
//recibiendo id del empleado a eliminar desde angular
$codigo=$_GET['codigo'];
//validando si el empleado a eliminar esta asignado a un curso
$registros=$con->prepare("SELECT id_asignacion_curso FROM asignaciones_cursos WHERE id_empleado=:codigo ");
$registros->bindParam(':codigo',$codigo);
$registros->execute();
//almacenamiento de datos de asignacion de curso en arreglo en caso de que exista
$vec=[];  
$vec=$registros->fetchAll(PDO::FETCH_ASSOC);
//si el empleado no esta asignado a ningun curso se puede eliminar
if($vec==null){
    $eliminacion=$con->prepare("DELETE FROM empleados WHERE id_empleado=:codigo");
    $eliminacion->bindParam(':codigo',$codigo);
    $eliminacion->execute();
    class Result { }

$response = new Result();
$response -> resultado = 'OK';
$response -> mensaje = 'Empleado eliminado con éxito';

header('Content-Type: application/json');
echo json_encode($response);  
//si el empleado esta asigando a un curso
}else{

class Result { }
$response = new Result();
$response -> resultado = 'ERROR';
$response -> mensaje = 'Este empleado no puede ser eliminado, cambie el estado del perfil a "BAJA"';
header('Content-Type: application/json');
echo json_encode($response);
    }
?>