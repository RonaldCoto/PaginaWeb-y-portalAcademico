<?php 
  header('Access-Control-Allow-Origin: *'); 
  header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
  
  $json = file_get_contents('php://input');
 
  $params = json_decode($json);
  
  require("../conexion.php");

$porcentaje =$params->porcentaje;
//pasando a integer el id del curso y evaluacion seleccionado en angular
$id_curso = intval($params->id_curso);
$id_evaluacion=intval($params->id_evaluacion);

$multimedia = $params->multimedia;
$extension = $params->extension;

//validamos si el nombre de la evaluacion ya esta registrado en el curso seleccionado, y si el archivo fue reemplazado para evitar duplicacion.
//-----------------------------INICIANDO VALIDACION-----------------------------

//variable que será true si la suma de porcentajes para el curso es menor a 100
$const = false;
//variable que será true si el nombre de evaluacion ingresado esta disponible
$const2 = false;


$registros=$con->prepare("SELECT  nombre, multimedia, porcentaje, id_curso FROM evaluaciones WHERE id_evaluacion=:id_evaluacion" );
$registros->bindParam(':id_evaluacion',$id_evaluacion);
$registros->execute();

//almacenamiento de datos de evaluacion en arreglo en caso de que exista
$vec=[];  
$vec=$registros->fetchAll(PDO::FETCH_ASSOC);

    foreach($vec as $datos){
    //si el archivo  es nuevo se puede almacenar en el servidor
if($datos["multimedia"] != $multimedia){
    $archivo = $params->base64textString;
$archivo = base64_decode($archivo);
    //por cada archivo subido se adjuntara el momento actual en segundos con time()
$fecha= time();
 $multimedia = $fecha."-".$multimedia;
//almacenando archivo en servidor
    $filePath = $_SERVER['DOCUMENT_ROOT']."/recursos/multimedia/archivos_evaluaciones/".$multimedia;
    file_put_contents($filePath, $archivo);
//capturando la extencion del archivo
$extension=pathinfo($filePath, PATHINFO_EXTENSION);
}
          //si el nombre de la evaluacion fue modificada o si se cambio de curso
if(($datos["nombre"] != $params->nombre) || ($datos["id_curso"] != $id_curso) ){
     //se verifica que el nuevo nombre no este ocupado en el curso seleccionado
          $reg=$con->prepare("SELECT id_evaluacion FROM evaluaciones WHERE nombre=:nombre AND id_curso=:id_curso");
          $reg->bindParam(':nombre',$params->nombre);
          $reg->bindParam(':id_curso',$id_curso);
          $reg->execute();
          $vec2=[];  
          $vec2=$reg->fetchAll(PDO::FETCH_ASSOC);
                //si la evaluacion no esta registrada se puede actualizar 
                        if($vec2 == null){
                        $const2=true;
                        }
    //si el nombre de la evaluacion no se cambio o el curso seleccionado es el mismo 
}else{
    $const2=true;
}
        
 //si el porcentaje ingresado es diferente al existente o si se cambio de curso
if(($datos["porcentaje"] != $porcentaje) || ($datos["id_curso"] != $id_curso)){
            //se valida que el nuevo porcentaje no supere el porcentaje maximo
                 $registros2=$con->prepare("SELECT  SUM(porcentaje) AS suma FROM evaluaciones WHERE id_curso=:idcurso AND id_evaluacion!=:id_evaluacion" );
                 $registros2->bindParam(':idcurso',$id_curso);
                 $registros2->bindParam(':id_evaluacion',$id_evaluacion);
                 $registros2->execute();

            //almacenamiento de suma en arreglo 
                 $vec2=[];  
                $vec2=$registros2->fetchAll(PDO::FETCH_ASSOC);

                    foreach($vec2 as $datos){
                     //si la suma es menor o igual a 100 se habilita la creación de la evaluación
                     if(($porcentaje)+$datos["suma"] <= 100.00 ){
                      $const=true;
                      }   
                   }
    //si el porcentaje no se cambio se deja como esta
}else{
            $const=true;
    }
}

//validando fecha de finalizacion
//variable que será true si la fecha de finalizacion es mayor o igual a la de inicio
$const3 = false;
if($params->fecha_fin >= $params->fecha_inicio ){
    $const3 = true;
}

//-----------------------------FIN DE VALIDACION-----------------------------

//si el nombre de evaluacion esta disponible en el curso
if($const2){

        //si el porcentaje no exede el maximo se actualiza la evaluacion
    if($const){
        
        //si la fecha de finalizacion es mayor que la de inicio
        if($const3){
    
    $modificacion=$con->prepare("UPDATE evaluaciones SET nombre=:nombre,descripcion=:descripcion,porcentaje=:porcentaje,multimedia=:multimedia
                        ,extension=:extension,fecha_inicio=:fecha_inicio,fecha_fin=:fecha_fin,id_curso=:id_curso 
                          WHERE id_evaluacion=:codigo");
$modificacion->bindParam(':nombre',$params->nombre);
$modificacion->bindParam(':descripcion',$params->descripcion);
$modificacion->bindParam(':porcentaje',$params->porcentaje);
$modificacion->bindParam(':multimedia',$multimedia);
$modificacion->bindParam(':extension',$extension);
$modificacion->bindParam(':fecha_inicio',$params->fecha_inicio);
$modificacion->bindParam(':fecha_fin',$params->fecha_fin);
$modificacion->bindParam(':id_curso',$id_curso);
$modificacion->bindParam(':codigo',$id_evaluacion);
$modificacion->execute();
  
  class Result {}

  $response = new Result();
  $response->resultado = 'OK';
  $response->mensaje = 'Evaluación actualizada con éxito.';

  header('Content-Type: application/json');
  echo json_encode($response);  
            
            //si la fecha de finalizacion es incorrecta
            }else{
             class Result {}

  $response = new Result();
  $response->resultado = 'ERROR';
  $response->mensaje = 'La fecha de finalización no pude ser menor a la de inicio.';

  header('Content-Type: application/json');
  echo json_encode($response); 
        }
        
        //si el porcentaje supera el 100%
        }else{
        
         class Result {}

  $response = new Result();
  $response->resultado = 'ERROR';
  $response->mensaje = 'Con el porcentaje ingresado se supera el 100% de la nota para este curso.';

  header('Content-Type: application/json');
  echo json_encode($response); 
    }
        
        
    //si el nombre ya estaba registrado no se puede crear al nuevo curso
}else{
    class Result {}

  $response = new Result();
  $response->resultado = 'ERROR';
  $response->mensaje = 'El título ingresado ya está en uso para el curso seleccionado.';

  header('Content-Type: application/json');
  echo json_encode($response); 
}
?>