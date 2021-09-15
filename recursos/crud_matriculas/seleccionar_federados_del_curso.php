<?php 
  header('Access-Control-Allow-Origin: *'); 
  header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
  
  require("../conexion.php");
//recibiendo id del curso para determinar que federados estan matriculados en el
$codigo=$_GET['codigo'];
//preparando consulta
// lista de todos los federados matriculados en el curso seleccionado
  $registros=$con->prepare("SELECT M.id_matricula, F.nombre, F.apellido, F.email, C.nombre as nombrecurso
                            FROM matriculas AS M
                            INNER JOIN federados AS F
                            ON F.id_federado = M.id_federado
                            INNER JOIN asignaciones_cursos AS AC
                            ON M.id_asignacion_curso = AC.id_asignacion_curso
                            INNER JOIN cursos AS C
                            ON C.id_curso = AC.id_curso
                            WHERE C.id_curso=:id_curso");
$registros->bindParam(':id_curso',$codigo);
//ejecutando consulta
    $registros->execute();
//almacenamiento de datos en arreglo en caso de que exista
$vec=[];  
$vec=$registros->fetchAll(PDO::FETCH_ASSOC);
  
  $cad1=json_encode($vec);
  echo $cad1;
  //header('Content-Type: application/json');
?>