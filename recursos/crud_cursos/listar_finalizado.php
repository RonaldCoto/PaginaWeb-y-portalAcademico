<?php 
header('Access-Control-Allow-Origin: *'); 
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
 $json = file_get_contents('php://input');
 
  $params = json_decode($json);
  //conexion a base de datos 
require("../conexion.php");


// lista de cursos en estado FINALIZADO 
$registros = $con->prepare("SELECT * FROM  cursos WHERE estado='FINALIZADO'" );
// Indicando los datos
$registros->execute();

//almacenamiento de datos de usuario en arreglo en caso de que exista
$vec=[];  
 $vec=$registros->fetchAll(PDO::FETCH_ASSOC);

//generacion de JSON con datos de usuario 
$cad=json_encode($vec);

echo $cad;
//header('Content-Type: application/json');
?>