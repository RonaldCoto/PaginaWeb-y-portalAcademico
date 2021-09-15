<?php 
header('Access-Control-Allow-Origin: *'); 
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
 $json = file_get_contents('php://input');
 
  $params = json_decode($json);
require("conexion.php");
$con=retornarConexion();


//Consultando empleados que conincidan con los datos del inicio de sesion
// Creando el formato de la consulta
$registros = $con->prepare("SELECT * FROM empleados where email=:emailusuario and password=:passusuario" );
// Indicando los datos
$registros->execute(array(':emailusuario' => $params->email, ':passusuario' => $params->password));

//$registros=mysqli_query($con,"SELECT * FROM empleados where email='$params->email' and password='$params->password'");
$vec=[];  
while ($reg=mysqli_fetch_array($registros))  
{
$vec[]=$reg;
}
//Si no se encontraron empleados se buscarán federados
if($vec==null){
// Creando el formato de la consulta
$registros = $con->prepare("SELECT * FROM federados where email=:emailusuario and password=:passusuario" );
// Indicando los datos
$registros->execute(array(':emailusuario' => $params->email, ':passusuario' => $params->password));
//($registros=mysqli_query($con,"SELECT * FROM federados where email='$params->email' and password='$params->password'");
while ($reg=mysqli_fetch_array($registros))  
{
$vec[]=$reg;
}
}

$cad=json_encode($vec);
echo $cad;
//header('Content-Type: application/json');
?>