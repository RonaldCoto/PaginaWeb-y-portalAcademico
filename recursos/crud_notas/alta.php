<?php 
  header('Access-Control-Allow-Origin: *'); 
  header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
  
  $json = file_get_contents('php://input');
 
  $params = json_decode($json);
  
  require("../conexion.php");
  
//obteniendo valores int de parametros
$id_matricula = intval($params->id_matricula);
$id_evaluacion = intval($params->id_evaluacion);
$nota = $params->nota;
$promedio = 0.00;

//validamos si el federado ya tiene nota para la evaluacion seleccionada
//-----------------------------INICIANDO VALIDACION-----------------------------
$registros=$con->prepare("SELECT  id_nota FROM notas WHERE id_matricula=:id_matricula AND id_evaluacion=:id_evaluacion" );
$registros->bindParam(':id_matricula',$id_matricula);
$registros->bindParam(':id_evaluacion',$id_evaluacion);
$registros->execute();

//almacenamiento de datos de nota en arreglo en caso de que exista
$vec=[];  
$vec=$registros->fetchAll(PDO::FETCH_ASSOC);
    

//si no hay nota asignada para esta evaluacion
if($vec == null ){
   
    //validamos que la nota no sea mayor a 10
    
    if($nota <= 10.00){
    
        //calculamos promedio de nota
        $registros2=$con->prepare("SELECT porcentaje FROM evaluaciones WHERE id_evaluacion=:id_evaluacion" );
$registros2->bindParam(':id_evaluacion',$id_evaluacion);
$registros2->execute();
$vec2=[];  
$vec2=$registros2->fetchAll(PDO::FETCH_ASSOC);

         foreach($vec2 as $datos){
             $promedio = ($datos["porcentaje"]/100)*$nota;
         }

    
  $insertar=$con->prepare("INSERT INTO notas (id_evaluacion,nota,promedio,id_matricula) VALUES
                  (:id_evaluacion,:nota,:promedio,:id_matricula)");
$insertar->bindParam(':id_evaluacion',$id_evaluacion);
$insertar->bindParam(':nota',$nota);
$insertar->bindParam(':promedio',$promedio);
$insertar->bindParam(':id_matricula',$id_matricula);
$insertar->execute();
  
   class Result {}

  $response = new Result();
  $response->resultado = 'OK';
  $response->mensaje = 'Nota asignada con éxito.';

  header('Content-Type: application/json');
  echo json_encode($response); 
 
        //si es mayor a 10.00 no se puede asignar la nota
    }else{
 class Result {}

  $response = new Result();
  $response->resultado = 'ERROR';
  $response->mensaje = 'La nota ingresada es mayor a 10.00.';

  header('Content-Type: application/json');
  echo json_encode($response); 
    }
    //si ya habia nota asignada para esta evaluacion
}else{
    class Result {}

  $response = new Result();
  $response->resultado = 'ERROR';
  $response->mensaje = 'El federado seleccionado ya tiene nota para esta evaluación.';

  header('Content-Type: application/json');
  echo json_encode($response); 
}
?>