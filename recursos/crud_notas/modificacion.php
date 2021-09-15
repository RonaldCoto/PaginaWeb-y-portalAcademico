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

//validamos que la nota ingresada no sea mayor a 10
    
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

    
  $modificacion=$con->prepare("UPDATE notas SET nota=:nota, promedio=:promedio WHERE id_matricula=:codigo AND id_evaluacion=:codigo2");
$modificacion->bindParam(':nota',$nota);
$modificacion->bindParam(':promedio',$promedio);
$modificacion->bindParam(':codigo',$id_matricula);
$modificacion->bindParam(':codigo2',$id_evaluacion);

$modificacion->execute();
  
   class Result {}

  $response = new Result();
  $response->resultado = 'OK';
  $response->mensaje = 'Nota actualizada con éxito.';

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


?>