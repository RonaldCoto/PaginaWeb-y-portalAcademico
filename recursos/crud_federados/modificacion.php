<?php 
  header('Access-Control-Allow-Origin: *'); 
  header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
  
  $json = file_get_contents('php://input');
 
  $params = json_decode($json);
  
  require("../conexion.php");
//capturando contraseña
$pass=$params->password;
$email=$params->email;
//el metodo subscribe que llena el formulario de actualizacion convierte a los parametros de los objetos en Strings
//se convierte el id_federado en valor entero para ejecutar el query
 $codigo=intval($params->id_federado);

//validamos si la contraseña no se ha modificado para evitar un segundo cifrado y si el correo ingresado no esta ocupado por otro usuario
//-----------------------------INICIANDO VALIDACION
$registros=$con->prepare("SELECT  email,password FROM federados WHERE id_federado=:idfed" );
$registros->bindParam(':idfed',$codigo);
$registros->execute();

//almacenamiento de datos de usuario en arreglo en caso de que exista
$vec=[];  
$vec=$registros->fetchAll(PDO::FETCH_ASSOC);
//variable que será true si el correo ingresado esta disponible
$const = false;
foreach($vec as $datos){
    //si la contraseña se modificó por parte del administrador o el mismo federado se puede encriptar
if($datos["password"] != $pass){
   $pass=sha1($params->password);
}
   //si el correo fue modificado..
if($datos["email"] != $email){
     //se verifica que el nuevo correo no este ocupado
   $reg=$con->prepare("SELECT id_federado FROM federados WHERE email=:email");
$reg->bindParam(':email',$params->email);
$reg->execute();
$vec=[];  
$vec=$reg->fetchAll(PDO::FETCH_ASSOC);
//si el correo no esta registrado se puede actualizar al federado
if($vec == null){
$const=true;
}
    //si el correo no fue modificado se deja como se recibió
}else{
   $const=true;
}   
}
//-----------------------------FINALIZANDO VALIDACION-----------------------------

//-----------------------------REALIZANDO ACTUALIZACION-----------------------------
      //si $const es verdadero se puede actualizar
if($const){
    $actualizacion=$con->prepare("UPDATE federados SET nombre=:nombre, apellido=:apellido, direccion=:direccion,email=:email,password=:password 
                     ,estado=:estado WHERE id_federado=:id_federado");
    
$actualizacion->bindParam(':nombre',$params->nombre);
$actualizacion->bindParam(':apellido',$params->apellido);
$actualizacion->bindParam(':direccion',$params->direccion);
$actualizacion->bindParam(':email',$email);
$actualizacion->bindParam(':password',$pass);
$actualizacion->bindParam(':estado',$params->estado);
$actualizacion->bindParam(':id_federado',$codigo);
$actualizacion->execute();

  class Result {}

  $response = new Result();
  $response->resultado = 'OK';
  $response->mensaje = 'Datos modificados con éxito.';

  header('Content-Type: application/json');
  echo json_encode($response);  
}else{
    class Result {}

  $response = new Result();
  $response->resultado = 'ERROR';
  $response->mensaje = 'El correo ingresado ya está ocupado.';

  header('Content-Type: application/json');
  echo json_encode($response); 
}    
//-----------------------------FINALIZANDO ACTUALIZACION-----------------------------
 
?>