<?php 
  header('Access-Control-Allow-Origin: *'); 
  header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
  
  require("../conexion.php");
//recibiendo id del federado a editar desde angular
$codigo=$_GET['codigo'];
//preparando consulta
  $registros=$con->prepare("SELECT * FROM federados WHERE id_federado=:idfed");
$registros->bindParam(':idfed',$codigo);
//ejecutando consulta
    $registros->execute();
//almacenamiento de datos de usuario en arreglo en caso de que exista
$vec=[];  
$vec=$registros->fetchAll(PDO::FETCH_ASSOC);
  
  $cad=json_encode($vec);
  echo $cad;
  //header('Content-Type: application/json');
?>