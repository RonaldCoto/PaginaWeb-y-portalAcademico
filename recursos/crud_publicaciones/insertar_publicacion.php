<?php 
  header('Access-Control-Allow-Origin: *'); 
  header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
  
  $json = file_get_contents('php://input');
 
  $params = json_decode($json);
  
  require("../conexion.php");
  
$extension="";
$multimedia = $params->multimedia;
$archivo = $params->base64textString;
$archivo = base64_decode($archivo);
//por cada archivo subido se adjuntara el momento actual en segundos con time()
$fecha= time();
$archivo_publicacion = "";
$fecha_publicacion = date('Y-m-d');
$id_asignacion_curso=intval($params->id_asignacion_curso);


//se valida el ingreso de un archivo real para evitar generar un archivo vacio con nombre time()
    if($multimedia != ""){
    $archivo_publicacion = $fecha."-".$multimedia;
//almacenando archivo en servidor
    $filePath = $_SERVER['DOCUMENT_ROOT']."/recursos/multimedia/archivos_publicaciones/".$archivo_publicacion;
    file_put_contents($filePath, $archivo);
//capturando la extencion del archivo
$extension=pathinfo($filePath, PATHINFO_EXTENSION);
}
  $insertar=$con->prepare("INSERT INTO publicaciones(titulo,descripcion,archivo,extension,fecha_publicacion,id_asignacion_curso) VALUES
                  (:titulo,:descripcion,:archivo,:extension,:fecha_publicacion,:id_asignacion_curso)");
$insertar->bindParam(':titulo',$params->titulo);
$insertar->bindParam(':descripcion',$params->descripcion);
$insertar->bindParam(':archivo',$archivo_publicacion);
$insertar->bindParam(':extension',$extension);
$insertar->bindParam(':fecha_publicacion',$fecha_publicacion);
$insertar->bindParam(':id_asignacion_curso',$id_asignacion_curso);
$insertar->execute();
  
  class Result {}

  $response = new Result();
  $response->resultado = 'OK';
  $response->mensaje = 'Publicación creada con éxito.';

  header('Content-Type: application/json');
  echo json_encode($response);  

?>