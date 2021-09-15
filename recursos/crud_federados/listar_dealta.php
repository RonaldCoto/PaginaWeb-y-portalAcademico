<?php 
header('Access-Control-Allow-Origin: *'); 
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
 $json = file_get_contents('php://input');
 
  $params = json_decode($json);
  //conexion a base de datos 
require("../conexion.php");

// consulta a tabla federados en ALTA y BAJA que no esten matriculados a un curso en estado INICIADO
//WHERE NOT EXISTS excluye a los federados que pertenecen a cursos en estado INICIADO
$registros=$con->prepare("SELECT F.id_federado,F.nombre,F.apellido,F.email, F.estado FROM federados AS F
WHERE NOT EXISTS (SELECT M.id_matricula FROM matriculas AS M 
RIGHT JOIN asignaciones_cursos AS AC
ON AC.id_asignacion_curso = M.id_asignacion_curso 
INNER JOIN cursos AS C 
ON C.id_curso = AC.id_curso 
WHERE M.id_federado = F.id_federado  AND C.estado='INICIADO' )  ");

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