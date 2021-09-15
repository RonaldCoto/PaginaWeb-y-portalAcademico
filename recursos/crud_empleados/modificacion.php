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
//se convierte el id_empleado y id_cate_empleado en valor entero para ejecutar el query
  $id_cate_empleado=intval($params->id_cate_empleado);
 $codigo=intval($params->id_empleado);

//validamos si la contraseña no se ha modificado para evitar un segundo cifrado y si el correo ingresado no esta ocupado por otro usuario
//-----------------------------INICIANDO VALIDACION-----------------------------
$registros=$con->prepare("SELECT  email, password FROM empleados WHERE id_empleado=:idemp" );
$registros->bindParam(':idemp',$codigo);
$registros->execute();

//almacenamiento de datos de usuario en arreglo en caso de que exista
$vec=[];  
$vec=$registros->fetchAll(PDO::FETCH_ASSOC);

//variable que será true si el correo ingresado esta disponible
$const = false;
foreach($vec as $datos){
    //si la contraseña se modificó se puede encriptar
if($datos["password"] != $pass){
   $pass=sha1($params->password);

}
    //si el correo fue modificado..
if($datos["email"] != $email){
     //se verifica que el nuevo correo no este ocupado
   $reg=$con->prepare("SELECT id_empleado FROM empleados WHERE email=:email ");
$reg->bindParam(':email',$params->email);
$reg->execute();
$vec2=[];  
$vec2=$reg->fetchAll(PDO::FETCH_ASSOC);
//si el correo no esta registrado se puede actualizar al federado
if($vec2 == null){
$const=true;
}
    //si el correo no se cambió se guarda como esta
}else{
    $const=true;
}
}
//validando si el empleado a editar se quiere modificar en administrador mientras esta asignado a un curso
if($id_cate_empleado==1){
$registros3=$con->prepare("SELECT id_asignacion_curso FROM asignaciones_cursos WHERE id_empleado=:codigo ");
$registros3->bindParam(':codigo',$codigo);
$registros3->execute();
//almacenamiento de datos de asignacion de curso en arreglo en caso de que exista
$vec3=[];  
$vec3=$registros3->fetchAll(PDO::FETCH_ASSOC);
//variable que será true si el empleado no esta asignado a nigun curso
$const2=false;

if($vec3 == null){
    $const2=true;
}
}else{
    $const2=true;
}

//-----------------------------FINALIZANDO VALIDACION-----------------------------

//-----------------------------REALIZANDO ACTUALIZACION-----------------------------
//si el correo esta disponible
if($const){
    //si el empleado no tiene asignaciones
    if($const2){
        
   
     $actualizacion=$con->prepare("UPDATE empleados SET nombre=:nombre, apellido=:apellido, direccion=:direccion,email=:email,password=:password 
                    ,id_cate_empleado=:id_cate_empleado ,estado=:estado WHERE id_empleado=:id_empleado");
    
$actualizacion->bindParam(':nombre',$params->nombre);
$actualizacion->bindParam(':apellido',$params->apellido);
$actualizacion->bindParam(':direccion',$params->direccion);
$actualizacion->bindParam(':email',$email);
$actualizacion->bindParam(':password',$pass);
$actualizacion->bindParam(':id_cate_empleado',$id_cate_empleado);
$actualizacion->bindParam(':estado',$params->estado);
$actualizacion->bindParam(':id_empleado',$codigo);
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
  $response->mensaje = 'Este empleado ya esta asignado como instructor.';

  header('Content-Type: application/json');
  echo json_encode($response);  
    }
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