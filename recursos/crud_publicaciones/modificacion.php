<?php 
  header('Access-Control-Allow-Origin: *'); 
  header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
  
  $json = file_get_contents('php://input');
 
  $params = json_decode($json);
  
  require("../conexion.php");
  

$id_asignacion_curso=intval($params->id_asignacion_curso);
$id_publicacion=intval($params->id_publicacion);
$multimedia = $params->archivo;
$extension = $params->extension;
//validamos si el archivo fue reemplazado para evitar duplicacion.
//-----------------------------INICIANDO VALIDACION-----------------------------
$registros=$con->prepare("SELECT archivo FROM publicaciones WHERE id_publicacion=:codigo" );
$registros->bindParam(':codigo',$params->id_publicacion);
$registros->execute();

//almacenamiento de datos de archivo en arreglo en caso de que exista
$vec=[];  
$vec=$registros->fetchAll(PDO::FETCH_ASSOC);

foreach($vec as $datos){
    //si el archivo  es nuevo se puede almacenar en el servidor
if($datos["archivo"] != $multimedia){
    $archivo = $params->base64textString;
$archivo = base64_decode($archivo);
    //por cada archivo subido se adjuntara el momento actual en segundos con time()
$fecha= time();
 $multimedia = $fecha."-".$multimedia;
//almacenando archivo en servidor
    $filePath = $_SERVER['DOCUMENT_ROOT']."/recursos/multimedia/archivos_publicaciones/".$multimedia;
    file_put_contents($filePath, $archivo);
//capturando la extencion del archivo
$extension=pathinfo($filePath, PATHINFO_EXTENSION);
}
}
//-----------------------------FIN VALIDACION-----------------------------

//-----------------------------REALIZANDO ACTUALIZACION-----------------------------
  $modificacion=$con->prepare("UPDATE publicaciones SET titulo=:titulo,descripcion=:descripcion,archivo=:archivo,extension=:extension,
                        fecha_publicacion=:fecha_publicacion,id_asignacion_curso=:id_asignacion_curso 
                          WHERE id_publicacion=:codigo");
$modificacion->bindParam(':titulo',$params->titulo);
$modificacion->bindParam(':descripcion',$params->descripcion);
$modificacion->bindParam(':archivo',$multimedia);
$modificacion->bindParam(':extension',$extension);
$modificacion->bindParam(':fecha_publicacion',$params->fecha_publicacion);
$modificacion->bindParam(':id_asignacion_curso',$id_asignacion_curso);
$modificacion->bindParam(':codigo',$id_publicacion);
$modificacion->execute();
  
  class Result {}

  $response = new Result();
  $response->resultado = 'OK';
  $response->mensaje = 'Publicación editada con éxito.';

  header('Content-Type: application/json');
  echo json_encode($response);  

?>