<?php 
  header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

require("../conexion.php");

$eliminar=$con->prepare( "DELETE  FROM cursos WHERE id_curso=:codigo");
$eliminar->bindParam(':codigo', $_GET['codigo']);
$eliminar->execute();

class Result { }

$response = new Result();
$response -> resultado = 'OK';
$response -> mensaje = 'Curso eliminado con éxito';

header('Content-Type: application/json');
echo json_encode($response);  
?>