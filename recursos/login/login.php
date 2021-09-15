<?php 
header('Access-Control-Allow-Origin: *'); 
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
 $json = file_get_contents('php://input');
 
  $params = json_decode($json);
require("../conexion.php");


//cifrado de contraseña
$pass = sha1($params->password);

// Creando el formato de la consulta
$registros=$con->prepare("SELECT * FROM empleados where email=:email and password=:password");
// Indicando los datos
$registros->bindParam(':email',$params->email);
$registros->bindParam(':password',$pass);
//ejecutando consulta
    $registros->execute();
//almacenamiento de datos de usuario en arreglo en caso de que exista
$vec=[];  
$vec=$registros->fetchAll(PDO::FETCH_ASSOC);

//si no encontro empleados debe buscar federados
if($vec==null){
// Creando el formato de la consulta
$registros=$con->prepare("SELECT * FROM federados where email=:email and password=:password");
// Indicando los datos
$registros->bindParam(':email',$params->email);
$registros->bindParam(':password',$pass);
//ejecutando consulta
    $registros->execute();
//almacenamiento de datos de usuario en arreglo en caso de que exista
$vec=[];  
$vec=$registros->fetchAll(PDO::FETCH_ASSOC);

}

$cad=json_encode($vec);
echo $cad;
//header('Content-Type: application/json');
?>