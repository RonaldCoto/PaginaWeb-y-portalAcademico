<?php 
header('Access-Control-Allow-Origin: *'); 
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
 $json = file_get_contents('php://input');
 
  $params = json_decode($json);
require("conexion.php");
$con=retornarConexion();



// Creando el formato de la consulta
$registros = $con->prepare("SELECT *
                       FROM   users
                       WHERE  email = :emailusuario");
 
// Indicando los datos
$registros->bindParam(":emailusuario", $params->email);
$registros->execute;
//$registros=mysqli_query($con,"select * from articulos");
$vec=[];  
while ($reg=mysqli_fetch_array($registros))  
{
$vec[]=$reg;
}

$cad=json_encode($vec);
echo $cad;
//header('Content-Type: application/json');
?>