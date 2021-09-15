<?php 
header('Access-Control-Allow-Origin: *'); 
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
 $json = file_get_contents('php://input');
 
  $params = json_decode($json);
  //conexion a base de datos 
require("../conexion.php");

// consulta a tabla empleados
$registros=$con->prepare("select id_empleado,nombre,apellido from empleados where estado='ALTA' AND Id_cate_empleado=2 ");

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