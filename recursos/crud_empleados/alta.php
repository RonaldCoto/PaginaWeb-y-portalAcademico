<?php 
  header('Access-Control-Allow-Origin: *'); 
  header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
  
  $json = file_get_contents('php://input');
 
  $params = json_decode($json);
  
  require("../conexion.php");
//cifrado de contraseña
$pass=sha1($params->password);
$id_cate_empleado=intval($params->id_cate_empleado);

//validando que el correo ingresado no se encuentre registrado
$registros=$con->prepare("SELECT id_empleado FROM empleados WHERE email=:email");
$registros->bindParam(':email',$params->email);
$registros->execute();
$vec=[];  
$vec=$registros->fetchAll(PDO::FETCH_ASSOC);

//si el correo no esta registrado se puede crear el nuevo empleado
if($vec == null){
    //insertando datos del nuevo empleado
  $insertar=$con->prepare("INSERT INTO empleados(nombre,apellido,direccion,email,password,id_cate_empleado,estado) VALUES
                  (:nombre,:apellido,:direccion,:email,:password,:id_cate_empleado,:estado)");

$insertar->bindParam(':nombre',$params->nombre);
$insertar->bindParam(':apellido',$params->apellido);
$insertar->bindParam(':direccion',$params->direccion);
$insertar->bindParam(':email',$params->email);
$insertar->bindParam(':password',$pass);
$insertar->bindParam(':id_cate_empleado',$id_cate_empleado);
$insertar->bindParam(':estado',$params->estado);
$insertar->execute();

  
  class Result {}

  $response = new Result();
  $response->resultado = 'OK';
  $response->mensaje = 'Empleado generado con éxito.';

  header('Content-Type: application/json');
  echo json_encode($response);  
//si el correo ya esta registrado no se puede crear al nuevo empleado
}else{
    class Result {}

  $response = new Result();
  $response->resultado = 'ERROR';
  $response->mensaje = 'El correo ingresado ya está en uso.';

  header('Content-Type: application/json');
  echo json_encode($response); 
}

?>