<?php

function retornarConexion() {
  $con=mysqli_connect("localhost","root","","fesapade_db");
  return $con;
}  
?>