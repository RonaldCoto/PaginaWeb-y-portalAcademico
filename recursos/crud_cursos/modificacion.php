<?php 
  header('Access-Control-Allow-Origin: *'); 
  header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
  
  $json = file_get_contents('php://input');
 
  $params = json_decode($json);
  
  require("../conexion.php");
 

//el metodo subscribe que llena el formulario de actualizacion convierte a los parametros de los objetos en Strings
//se convierte el id_curso en valor entero para ejecutar el query
  $codigo=intval($params->id_curso);

$portada = $params->portada;
$imagen1 = $params->imagen1;
$imagen2 = $params->imagen2;
$imagen3 = $params->imagen3;

    
//validamos si el nombre del curso ya esta utilizado y si los nombres de las imagenes ya estan registradas para evitar que se reescriban
//-----------------------------INICIANDO VALIDACION-----------------------------
$registros=$con->prepare("SELECT  nombre, portada, imagen1, imagen2, imagen3 FROM cursos WHERE id_curso=:codigo" );
$registros->bindParam(':codigo',$codigo);
$registros->execute();

//almacenamiento de datos de curso en arreglo en caso de que exista
$vec=[];  
$vec=$registros->fetchAll(PDO::FETCH_ASSOC);

//variable que será true si el curso ingresado esta disponible
$const = false;
foreach($vec as $datos){
    //si la portada es nueva se puede almacenar en el servidor
if($datos["portada"] != $portada){
    //por cada imagen subida se adjuntara el momento actual en segundos con time()
$fecha= time();
$portada = $fecha.$portada;
    $archivo = $params->base64textString;
$archivo = base64_decode($archivo);
  $filePath = $_SERVER['DOCUMENT_ROOT']."/recursos/imagenes/portadas_cursos/".$portada;
    file_put_contents($filePath, $archivo,FILE_APPEND);

}
 //si la imagen1 es nueva se puede almacenar en el servidor
if($datos["imagen1"] != $imagen1){
    //por cada imagen subida se adjuntara el momento actual en segundos con time()
$fecha= time();
$imagen1 = $fecha.$imagen1;
    $archivo1 = $params->base64textString1;
$archivo1 = base64_decode($archivo1);
  $filePath = $_SERVER['DOCUMENT_ROOT']."/recursos/imagenes/imagenes_cursos/".$imagen1;
    file_put_contents($filePath, $archivo1,FILE_APPEND);

}
     //si la imagen2 es nueva se puede almacenar en el servidor
if($datos["imagen2"] != $imagen2){
    //por cada imagen subida se adjuntara el momento actual en segundos con time()
$fecha= time();
$imagen2 = $fecha.$imagen2;
    $archivo2 = $params->base64textString2;
$archivo2 = base64_decode($archivo2);
  $filePath = $_SERVER['DOCUMENT_ROOT']."/recursos/imagenes/imagenes_cursos/".$imagen2;
    file_put_contents($filePath, $archivo2,FILE_APPEND);

}
     //si la imagen1 es nueva se puede almacenar en el servidor
if($datos["imagen3"] != $imagen3){
    //por cada imagen subida se adjuntara el momento actual en segundos con time()
$fecha= time();
$imagen3 = $fecha.$imagen3;
    $archivo3 = $params->base64textString3;
$archivo3 = base64_decode($archivo3);
  $filePath = $_SERVER['DOCUMENT_ROOT']."/recursos/imagenes/imagenes_cursos/".$imagen3;
    file_put_contents($filePath, $archivo3,FILE_APPEND);

}
    //si el nombre del curso fue modificado..
if($datos["nombre"] != $params->nombre){
     //se verifica que el nuevo curso no este ocupado
   $reg=$con->prepare("SELECT id_curso FROM cursos WHERE nombre=:nombre ");
$reg->bindParam(':nombre',$params->nombre);
$reg->execute();
$vec2=[];  
$vec2=$reg->fetchAll(PDO::FETCH_ASSOC);
//si el curso no esta registrado se puede actualizar 
if($vec2 == null){
$const=true;
}
    //si el nombre del curso no se cambio se guarda como esta
}else{
    $const=true;
}
}   

    //------------------------------validando si el curso es de tipo VISUAL------------------------------------
    
//variable que sera true si el curso en estado visual recibe las 3 imagenes necesarias para publicar, o si esta INICIADO o FINALIZADO
    $const2=false;
//variable que será true si el curso no tiene asignaciones 
  $const3=false;

    if($params->estado == "VISUAL"){
        //si el curso nuevo es de tipo VISUAL y tiene todas las imagenes asignadas
        if(($portada != "") && ($imagen1 != "") && ($imagen2 != "") && ($imagen3 != "")){
             $const2=true;
        }
         //se valida si el curso ya tiene asignado un instructor
            $registros2=$con->prepare("SELECT  id_asignacion_curso FROM asignaciones_cursos WHERE id_curso=:codigo" );
            $registros2->bindParam(':codigo',$codigo);
            $registros2->execute();

             //almacenamiento de datos de curso en arreglo en caso de que exista
             $vec2=[];  
             $vec2=$registros2->fetchAll(PDO::FETCH_ASSOC);
            
            if($vec2 == null){
                $const3=true;
            }
            
        //si el curso no es de tipo VISUAL se puede crear sin importar las fotos asignadas
    }else{
        $const2=true;
        $const3=true;
    }
  //------------------------------fin de validacion de tipo VISUAL------------------------------------

  


//-----------------------------FINALIZANDO VALIDACION-----------------------------


    
//-----------------------------REALIZANDO ACTUALIZACION-----------------------------
//si $const y $const2 son verdaderos se puede actualizar el curso
if($const){
    if($const3){
        
    
    if($const2){
        
  $modificacion=$con->prepare("UPDATE cursos SET nombre=:nombre, descripcion=:descripcion,portada=:portada,imagen1=:imagen1,
                               imagen2=:imagen2,imagen3=:imagen3,estado=:estado WHERE id_curso=:codigo");
$modificacion->bindParam(':nombre',$params->nombre);
$modificacion->bindParam(':descripcion',$params->descripcion);
$modificacion->bindParam(':portada',$portada);
$modificacion->bindParam(':imagen1',$imagen1);
$modificacion->bindParam(':imagen2',$imagen2);
$modificacion->bindParam(':imagen3',$imagen3);
$modificacion->bindParam(':estado',$params->estado);
$modificacion->bindParam(':codigo',$codigo);

$modificacion->execute();
  
  class Result {}

  $response = new Result();
  $response->resultado = 'OK';
  $response->mensaje = 'Curso modificado.';

  header('Content-Type: application/json');
  echo json_encode($response);  
     //si no se subieron las fotos
    }else{
         class Result {}

  $response = new Result();
  $response->resultado = 'ERROR';
  $response->mensaje = 'Un curso en modo VISUAL requiere una portada y 3 fotos.';

  header('Content-Type: application/json');
  echo json_encode($response);  
    }
     
        //si el curso ya tiene un instructor
        }else{
         class Result {}

  $response = new Result();
  $response->resultado = 'ERROR';
  $response->mensaje = 'El curso ya tiene un instructor y no puede ser VISUAL.';

  header('Content-Type: application/json');
  echo json_encode($response); 
    }
    
    // si el nombre de curso no esta disponible
}else{
     class Result {}

  $response = new Result();
  $response->resultado = 'ERROR';
  $response->mensaje = 'El nombre de curso ingresado ya está registrado.';

  header('Content-Type: application/json');
  echo json_encode($response); 
}    
 //-----------------------------FINALIZANDO ACTUALIZACION-----------------------------
?>