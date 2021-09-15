<?php 
header('Access-Control-Allow-Origin: *'); 
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
 $json = file_get_contents('php://input');
 
  $params = json_decode($json);
  //conexion a base de datos 
require("../conexion.php");

// lista de empleados sin tomar en cuenta al empleado que solicita los datos
$registros=$con->prepare("select emp.id_empleado, emp.nombre, emp.apellido, emp.direccion, emp.email, emp.password, emp.id_cate_empleado, emp.estado, cat.cargo from empleados AS emp INNER JOIN categorias_empleados AS cat
ON emp.id_cate_empleado = cat.id_cate_empleado 
WHERE emp.id_empleado!=:codigo");
 $registros->bindParam(':codigo',$_GET['codigo']);
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