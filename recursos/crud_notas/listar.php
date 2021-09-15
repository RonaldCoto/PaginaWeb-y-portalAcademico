<?php 
header('Access-Control-Allow-Origin: *'); 
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
 $json = file_get_contents('php://input');
 
  $params = json_decode($json);
  //conexion a base de datos 
require("../conexion.php");


// lista de federados y sus notas según la evaluación seleccionada
$registros = $con->prepare("SELECT F.nombre, F.apellido, N.nota, N.promedio, EV.porcentaje, EV.nombre AS nombre_evaluacion FROM federados AS F
INNER JOIN matriculas AS M 
ON M.id_federado = F.id_federado
INNER JOIN notas AS N
ON N.id_matricula = M.id_matricula
INNER JOIN evaluaciones AS EV
ON EV.id_evaluacion = N.id_evaluacion
WHERE N.id_evaluacion =:codigo" );
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