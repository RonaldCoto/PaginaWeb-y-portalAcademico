<?php 
header('Access-Control-Allow-Origin: *'); 
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
 $json = file_get_contents('php://input');
 
  $params = json_decode($json);
require("conexion.php");
$con=retornarConexion();



/* Creando el formato de la consulta
$registros = $con->prepare("SELECT *
                       FROM   empleados
                       WHERE  email = :emailusuario AND passwrod = :passusuario" );
// Indicando los datos
$registros->execute(array(':emailusuario' => $params->email, ':passusuario' => $params->password));
*/
$registros=mysqli_query($con,"select * from federados");
//$registros = $con->prepare("SELECT * FROM  federados" );
// Indicando los datos
//$registros->execute();
$vec=[];  
while ($reg=mysqli_fetch_array($registros))  
{
$vec[]=$reg;
}

$cad=json_encode($vec);
echo $cad;
//header('Content-Type: application/json');
?>