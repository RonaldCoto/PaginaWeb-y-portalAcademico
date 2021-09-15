<?php 
  header('Access-Control-Allow-Origin: *'); 
  header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
  
  require("../conexion.php");
  
//para editar una nota se desplegará el nombre del federado seleccionado y las evaluaciones en las que ya...
// tiene una nota asignada, en  angular se programará un evento que muestre la nota actual según la evaluación seleccionada
  $registros=$con->prepare("SELECT cur.nombre,fed.nombre as nombrefederado, fed.apellido as apellidofederado,eva.nombre as nombreevaluacion,eva.porcentaje,nota.nota,nota.promedio FROM matriculas as matri INNER JOIN federados AS fed ON fed.id_federado = matri.id_federado INNER JOIN notas AS nota ON nota.id_matricula = matri.id_matricula INNER JOIN evaluaciones AS eva ON eva.id_evaluacion = nota.id_evaluacion INNER JOIN cursos AS cur ON cur.id_curso = eva.id_curso WHERE fed.id_federado=:codigo AND cur.id_curso=:codigo2 AND cur.estado='FINALIZADO'");
//asignando datos
  $registros->bindParam(':codigo',$_GET['codigo']);
 $registros->bindParam(':codigo2',$_GET['codigo2']);
//ejecutando consulta
  $registros->execute();
    
  //almacenamiento de datos de usuario en arreglo en caso de que exista
$vec=[];  
 $vec=$registros->fetchAll(PDO::FETCH_ASSOC);
  
  $cad=json_encode($vec);
  echo $cad;
  //header('Content-Type: application/json');
?>