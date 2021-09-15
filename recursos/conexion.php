<?php

$servidor="mysql:dbname=fesapade_db;host=localhost";
$usuario="root";
$password="";
try{
    $con = new PDO($servidor,$usuario,$password,array(PDO::MYSQL_ATTR_INIT_COMMAND=>"SET NAMES utf8"));
}catch(PDOException $e){
    echo "Conexión fallida: ".$e->getMessage();
}
date_default_timezone_set('America/Guatemala');
?>