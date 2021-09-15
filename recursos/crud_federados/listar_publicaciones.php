<?php 
  header('Access-Control-Allow-Origin: *'); 
  header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
  
  require("../conexion.php");
  
//preparando consulta que traera los datos del curso a editar
  $registros=$con->prepare("SELECT publi.titulo , publi.descripcion,publi.archivo,publi.extension,publi.fecha_publicacion ,fed.nombre as nombrefederado, fed.apellido as apellidofederado FROM matriculas as matri INNER JOIN federados AS fed ON fed.id_federado = matri.id_federado INNER JOIN asignaciones_cursos AS asig ON asig.id_asignacion_curso = matri.id_asignacion_curso INNER JOIN publicaciones AS publi ON publi.id_asignacion_curso = asig.id_asignacion_curso WHERE fed.id_federado=:codigo AND asig.id_curso=:idcurso");
//asignando datos
  $registros->bindParam(':codigo',$_GET['codigo']);
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