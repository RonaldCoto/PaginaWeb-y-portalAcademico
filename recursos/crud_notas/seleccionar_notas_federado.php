<?php 
  header('Access-Control-Allow-Origin: *'); 
  header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
  
  require("../conexion.php");
  
//para editar una nota se desplegará el nombre del federado seleccionado y las evaluaciones en las que ya...
// tiene una nota asignada, en  angular se programará un evento que muestre la nota actual según la evaluación seleccionada
  $registros=$con->prepare("SELECT N.nota, N.id_matricula, F.nombre, F.apellido, EV.nombre as nombre_evaluacion,
  N.promedio, EV.porcentaje, EV.id_evaluacion FROM notas AS N
  INNER JOIN matriculas as M
  ON N.id_matricula = M.id_matricula
  INNER JOIN asignaciones_cursos AS AC
  ON AC.id_asignacion_curso = M.id_asignacion_curso
  INNER JOIN cursos AS C
  ON C.id_curso = AC.id_curso
  INNER JOIN federados as F 
  ON F.id_federado = M.id_federado
  INNER JOIN evaluaciones as EV
  ON EV.id_evaluacion = N.id_evaluacion
  WHERE N.id_matricula=:codigo AND EV.id_curso=:codigo2");
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