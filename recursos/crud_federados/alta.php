<?php 
  header('Access-Control-Allow-Origin: *'); 
  header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
  
  $json = file_get_contents('php://input');
 
  $params = json_decode($json);
  
  require("../conexion.php");
//cifrado de contraseña
$pass=sha1($params->password);

//validando que el correo ingresado no se encuentre registrado
$registros=$con->prepare("SELECT id_federado FROM federados WHERE email=:email");
$registros->bindParam(':email',$params->email);
$registros->execute();
$vec=[];  
$vec=$registros->fetchAll(PDO::FETCH_ASSOC);

//si el correo no esta registrado se puede crear el nuevo federado
if($vec == null){
//preparando consulta para insertar datos de federado
  $insertar=$con->prepare("INSERT INTO federados(nombre,apellido,direccion,email,password,estado) VALUES
                  (:nombre,:apellido,:direccion,:email,:password,:estado)");
//asignando datos
$insertar->bindParam(':nombre',$params->nombre);
$insertar->bindParam(':apellido',$params->apellido);
$insertar->bindParam(':direccion',$params->direccion);
$insertar->bindParam(':email',$params->email);
$insertar->bindParam(':password',$pass);
$insertar->bindParam(':estado',$params->estado);
//ejecutando consulta
$insertar->execute();

  
  class Result {}

  $response = new Result();
  $response->resultado = 'OK';
  $response->mensaje = 'Federado generado con éxito.';

  header('Content-Type: application/json');
  echo json_encode($response);  
    }else{
      class Result {}

  $response = new Result();
  $response->resultado = 'ERROR';
  $response->mensaje = 'El correo ingresado ya está en uso.';

  header('Content-Type: application/json');
  echo json_encode($response); 
}
?>