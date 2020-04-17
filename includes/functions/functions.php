<?php 

function obtenerContactos() {
    require_once('db.php');  /* archivo requerido, crea conexion */ 
    try {
      $sql = "SELECT * FROM contactos";  /* query */
      $resultado = $conn->query($sql);  /* consulta a base de datos */
      return $resultado;
    } catch (Exception $e) {
      $error = 'Error!!, ' . $e->getMessage();  /* mensaje de error */
      echo $error;
      return false;
    }
}

function editarContacto($id) {
  require_once('db.php');  /* archivo requerido, crea conexion */ 
    try {
      $sql = "SELECT * FROM contactos WHERE id = $id";  /* query */
      $resultado = $conn->query($sql);  /* consulta a base de datos */
      return $resultado;
    } catch (Exception $e) {
      $error = 'Error!!, ' . $e->getMessage();  /* mensaje de error */
      echo $error;
      return false;
    }
}