<?php 
  header('Access-Control-Allow-Origin: *'); 
  header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
  
  $json = file_get_contents('php://input');
 
  $params = json_decode($json);
  
  require("../conexion.php");

$porcentaje =$params->porcentaje;
//pasando a integer el id del curso seleccionado en angular
$id_curso = intval($params->id_curso);

$extension="";
$multimedia = $params->multimedia;
$archivo = $params->base64textString;
    $archivo = base64_decode($archivo);
//por cada archivo subido se adjuntara el momento actual en segundos con time() a su nombre
$fecha= time();
$archivo_evaluacion = "";

//validamos si el nombre de la evaluacion ya esta registrado en el curso seleccionado
//-----------------------------INICIANDO VALIDACION-----------------------------
$registros=$con->prepare("SELECT  id_evaluacion FROM evaluaciones WHERE nombre=:nombre AND id_curso=:idcurso" );
$registros->bindParam(':nombre',$params->nombre);
$registros->bindParam(':idcurso',$id_curso);
$registros->execute();

//almacenamiento de datos de evaluacion en arreglo en caso de que exista
$vec=[];  
$vec=$registros->fetchAll(PDO::FETCH_ASSOC);
    

//si el nombre no esta registrado en el curso se procede a validar que el porcentaje de evaluacion no supere el porcentaje maximo (100%)
if($vec == null){
    
    $registros2=$con->prepare("SELECT  SUM(porcentaje) AS suma FROM evaluaciones WHERE id_curso=:idcurso" );
$registros2->bindParam(':idcurso',$id_curso);
$registros2->execute();

//almacenamiento de suma en arreglo 
$vec2=[];  
$vec2=$registros2->fetchAll(PDO::FETCH_ASSOC);
//variable que será true si la suma es menor a 100
$const = false;
foreach($vec2 as $datos){
    //si la suma es menor o igual a 100 se habilita la creación de la evaluación
if(($porcentaje)+$datos["suma"] <= 100.00 ){
$const=true;
}
 
}      
    
    //validando que las fechas ingresadas no sean menores a la actual
$fecha_actual = date('Y-m-d');
    //variable que será true si la fecha de inicio es correcta
$const2 = false;
      //variable que será true si la fecha_fin es mayor o igual a la de inicio
$const3 = false;
if($params->fecha_inicio >= $fecha_actual ){
    $const2 = true;
}
if($params->fecha_fin >= $params->fecha_inicio ){
    $const3 = true;
}
    
//-----------------------------FIN DE VALIDACION-----------------------------
    
        //si el porcentaje no exede el maximo se validan las fechas
    if($const){
        //si la fecha de inicio es correcta
        if($const2){
            //si la fecha de finalizacion es correcta
            if($const3){
                
            
       
        //se valida el ingreso de un archivo real para evitar generar un archivo vacio con nombre time()
    if($multimedia != ""){
        $archivo_evaluacion = $fecha."-".$multimedia;
    $filePath = $_SERVER['DOCUMENT_ROOT']."/recursos/multimedia/archivos_evaluaciones/".$archivo_evaluacion;
    file_put_contents($filePath, $archivo);
    //capturando la extencion del archivo
$extension=pathinfo($filePath, PATHINFO_EXTENSION);
}
  $insertar=$con->prepare("INSERT INTO evaluaciones (nombre, descripcion, porcentaje, multimedia,extension, fecha_inicio, fecha_fin, id_curso) VALUES
                  (:nombre1, :descripcion1, :porcentaje1, :multimedia1,:extension1, :fecha_inicio1, :fecha_fin1, :id_curso1)");
$insertar->bindParam(':nombre1',$params->nombre);
$insertar->bindParam(':descripcion1',$params->descripcion);
$insertar->bindParam(':porcentaje1',$porcentaje);
$insertar->bindParam(':multimedia1',$archivo_evaluacion);
$insertar->bindParam(':extension1',$extension);
$insertar->bindParam(':fecha_inicio1',$params->fecha_inicio);
$insertar->bindParam(':fecha_fin1',$params->fecha_fin);
$insertar->bindParam(':id_curso1',$id_curso);
$insertar->execute();
  
  class Result {}

  $response = new Result();
  $response->resultado = 'OK';
  $response->mensaje = 'Evaluación generada con éxito.';

  header('Content-Type: application/json');
  echo json_encode($response); 
        
                //si la fecha de finalizaicon es
                }else{
                     class Result {}

  $response = new Result();
  $response->resultado = 'ERROR';
  $response->mensaje = 'La fecha de finalización no puede ser menor a la de inicio.';

  header('Content-Type: application/json');
  echo json_encode($response); 
            }
                
            // si la fecha de inicio es incorrecta
         }else{
            
             class Result {}

  $response = new Result();
  $response->resultado = 'ERROR';
  $response->mensaje = 'La fecha de inicio no puede ser menor a la actual.';

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