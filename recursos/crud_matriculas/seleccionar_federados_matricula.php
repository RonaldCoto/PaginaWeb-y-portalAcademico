<?php 
  header('Access-Control-Allow-Origin: *'); 
  header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
  
  require("../conexion.php");
//recibiendo id del curso para determinar que federados estan matriculados en el
$codigo=$_GET['codigo'];
//preparando consulta
// datos de federado según su matricula
  $registros=$con->prepare("SELECT  F.nombre, F.apellido 
                            FROM matriculas AS M
                            INNER JOIN federados AS F
                            ON F.id_federado = M.id_federado
                            WHERE M.id_matricula=:id_matricula");
$registros->bindParam(':id_matricula',$codigo);
//ejecutando consulta
    $registros->execute();
//almacenamiento de datos en arreglo en caso de que exista
$vec=[];  
$vec=$registros->fetchAll(PDO::FETCH_ASSOC);
  
  $cad1=json_encode($vec);
  echo $cad1;
  //header('Content-Type: application/json');
?>