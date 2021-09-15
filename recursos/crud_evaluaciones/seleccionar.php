<?php 
  header('Access-Control-Allow-Origin: *'); 
  header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
  
  require("../conexion.php");
  
//preparando consulta que traera los datos de la evaluacion a editar
  $registros=$con->prepare("SELECT * FROM evaluaciones WHERE id_evaluacion=:codigo");
//asignando datos
  $registros->bindParam(':codigo',$_GET['codigo']);
//ejecutando consulta
  $registros->execute();
    
  //almacenamiento de datos en arreglo en caso de que exista
$vec=[];  
 $vec=$registros->fetchAll(PDO::FETCH_ASSOC);
  
  $cad=json_encode($vec);
  echo $cad;
  //header('Content-Type: application/json');
?>