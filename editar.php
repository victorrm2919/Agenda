<?php 
include_once('includes/layout/header.php');
include_once('includes/functions/functions.php');
$id = filter_var($_GET['id'],FILTER_SANITIZE_NUMBER_INT);

if(!$id) { die('No es valido');}
$resultado = editarContacto($id);
$contacto = $resultado->fetch_assoc();
$nombre = $contacto['nombre'];
$empresa = $contacto['empresa'];
$telefono = $contacto['telefono'];
$id = $contacto['id'];
?>

<div class="contenedor-barra">
    <div class="contenedor barra">
        <a href="index.php" class="btn volver">Volver</a>
        <h1>Editar Contacto</h1>
    </div>
    
</div> <!-- fin contenedor-barra -->

<div class="bg-amarrillo contenedor sombra">
    <form id="contacto" action="#">
        <legend>Edite el contacto</legend>

        <?php include_once('includes/layout/formulario.php')?>


    </form> <!-- Fin form -->
</div> <!-- fin contenedor -->
    
<?php include_once('includes/layout/footer.php')?>