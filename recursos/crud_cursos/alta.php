<?php 
  header('Access-Control-Allow-Origin: *'); 
  header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
  
  $json = file_get_contents('php://input');
 
  $params = json_decode($json);
  
  require("../conexion.php");
  
//capturando nombre y decodificando imagenes
$portada = $params->portada;
$archivo = $params->base64textString;
    $archivo = base64_decode($archivo);
$imagen1 = $params->imagen1;
$archivo1 = $params->base64textString1;
    $archivo1 = base64_decode($archivo1);
$imagen2 = $params->imagen2;
$archivo2 = $params->base64textString2;
    $archivo2 = base64_decode($archivo2);
$imagen3 = $params->imagen3;
$archivo3 = $params->base64textString3;
    $archivo3 = base64_decode($archivo3);


//validamos si el nombre del curso ya esta utilizado
//-----------------------------INICIANDO VALIDACION-----------------------------
$registros=$con->prepare("SELECT  id_curso FROM cursos WHERE nombre=:nombre" );
$registros->bindParam(':nombre',$params->nombre);
$registros->execute();

//almacenamiento de datos de curso en arreglo en caso de que exista
$vec=[];  
$vec=$registros->fetchAll(PDO::FETCH_ASSOC);
    

//si el nombre no esta registrado se puede crear el nuevo curso
if($vec == null){
    
    //------------------------------validando si se han seleccionado imagenes para subir------------------------------------
    if($portada != ""){
        //por cada imagen subida se adjuntara el momento actual en segundos con time()
    $fecha= time();
    $portada = $fecha.$portada;
    $filePath = $_SERVER['DOCUMENT_ROOT']."/recursos/imagenes/portadas_cursos/".$portada;
    file_put_contents($filePath, $archivo);
        }
     if($imagen1 != ""){
    $fecha= time();
    $imagen1 = $fecha.$imagen1;
    $filePath = $_SERVER['DOCUMENT_ROOT']."/recursos/imagenes/imagenes_cursos/".$imagen1;
    file_put_contents($filePath, $archivo1);
        }
       if($imagen2 != ""){
    $fecha= time();
    $imagen2 = $fecha.$imagen2;
    $filePath = $_SERVER['DOCUMENT_ROOT']."/recursos/imagenes/imagenes_cursos/".$imagen2;
    file_put_contents($filePath, $archivo2);
        }
       if($imagen3 != ""){
    $fecha= time();
    $imagen3 = $fecha.$imagen3;
    $filePath = $_SERVER['DOCUMENT_ROOT']."/recursos/imagenes/imagenes_cursos/".$imagen3;
    file_put_contents($filePath, $archivo3);
        }

//------------------------------fin de validacion de imagenes------------------------------------

    //------------------------------validando si el curso es de tipo VISUAL------------------------------------
    
//variable que sera true si el curso en estado visual recibe las 3 imagenes necesarias para publicar, o si esta INICIADO o FINALIZADO
    $const=false;
    
    if($params->estado == "VISUAL"){
        //si el curso nuevo es de tipo VISUAL y tiene todas las imagenes asignadas se puede crear
        if(($portada != "") && ($imagen1 != "") && ($imagen2 != "") && ($imagen3 != "")){
            $const=true;
        }
        //si el curso no es de tipo VISUAL se puede crear sin importar las fotos asignadas
    }else{
        $const=true;
    }
  //------------------------------fin de validacion de tipo VISUAL------------------------------------
    if($const){
    
  $insertar=$con->prepare("INSERT INTO cursos(nombre,descripcion,portada,imagen1,imagen2,imagen3,estado) VALUES
                  (:nombre,:descripcion,:portada,:imagen1,:imagen2,:imagen3,:estado)");
$insertar->bindParam(':nombre',$params->nombre);
$insertar->bindParam(':descripcion',$params->descripcion);
$insertar->bindParam(':portada',$portada);
$insertar->bindParam(':imagen1',$imagen1);
$insertar->bindParam(':imagen2',$imagen2);
$insertar->bindParam(':imagen3',$imagen3);
$insertar->bindParam(':estado',$params->estado);
$insertar->execute();
  
  class Result {}

  $response = new Result();
  $response->resultado = 'OK';
  $response->mensaje = 'Curso generado con éxito.';

  header('Content-Type: application/json');
  echo json_encode($response);  
    
    }else{
          class Result {}

  $response = new Result();
  $response->resultado = 'ERROR';
  $response->mensaje = 'Un curso en modo VISUAL requiere una portada y 3 fotos.';

  header('Content-Type: application/json');
  echo json_encode($response);  
    }    
    
    //si el nombre ya estaba registrado no se puede crear al nuevo curso
}else{
    class Result {}

  $response = new Result();
  $response->resultado = 'ERROR';
  $response->mensaje = 'El nombre de curso ingresado ya esta en uso.';

  header('Content-Type: application/json');
  echo json_encode($response); 
}
?>