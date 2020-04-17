<?php 

/* Credenciales base de datos */

define('DB_USER', 'root');
define('DB_PASS', 'root');
define('DB_HOST', 'localhost');
define('DB_NAME', 'agendaphp');

$conn = new mysqli(DB_HOST,DB_USER,DB_PASS,DB_NAME);

if ($conn->connect_error) {
   echo $conn->connect_error;
}