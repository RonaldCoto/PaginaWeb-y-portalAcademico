<?php 
  header('Access-Control-Allow-Origin: *'); 
  header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
  
  require("../conexion.php");
  
//preparando consulta que traera los datos del curso a editar
  $registros=$con->prepare("SELECT eval.nombre,eval.descripcion,eval.porcentaje,eval.multimedia,eval.fecha_inicio,eval.fecha_fin,eval.extension FROM cursos as cur INNER JOIN evaluaciones AS eval ON cur.id_curso = eval.id_curso WHERE eval.id_curso=:idcurso");
//asignando datos
  $registros->bindParam(':idcurso',$_GET['idcurso']);
//ejecutando consulta
  $registros->execute();
    
  //almacenamiento de datos de usuario en arreglo en caso de que exista
$vec=[];  
 $vec=$registros->fetchAll(PDO::FETCH_ASSOC);
  
  $cad=json_encode($vec);
  echo $cad;
  //header('Content-Type: application/json');
?>