<?php 
include_once('includes/functions/functions.php');
include_once('includes/layout/header.php');
?>

<div class="contenedor-barra">
    <h1>Agenda de contactos</h1>
</div>

<div class="bg-amarrillo contenedor sombra">
    <form id="contacto" action="#">
        <legend>Añada un Contacto <span>Todos los campos son obligatorios</span></legend>

        <?php include_once('includes/layout/formulario.php')?>
    </form> <!-- Fin form -->
</div> <!-- fin contenedor -->

<div class="bg-blanco contenedor sombra contactos">
    <div class="contenedor-contactos">
        <h2>Contactos</h2>

        <input type="text" id="buscar" class="buscador sombra" placeholder="Buscar Contactos...">
        
        <p class="total-contactos"><span></span> Contactos</p>

        <div class="contenedor-tabla">
            <table id="listado-contactos" class="lista-contactos">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Empresa</th>
                        <th>Teléfono</th>
                        <th>Acciones</th>
                    </tr>
                </thead>

                <tbody>
                <?php 
                    $contactos = obtenerContactos();
                    if($contactos->num_rows):
                        while($dato = $contactos->fetch_assoc()):?>

                        <tr>
                            <td><?php echo $dato['nombre']?></td>
                            <td><?php echo $dato['empresa']?></td>
                            <td><?php echo $dato['telefono']?></td>
                            <td>
                                <a href="editar.php?id=<?php echo $dato['id']?>" class="btn-editar btn">
                                    <i class="fas fa-pen-square"></i>
                                </a>

                                <button data-id="<?php echo $dato['id']?>" type="button" class="btn-borrar btn">
                                    <i class="fas fa-trash-alt"></i>
                                </button>
                            </td>
                        </tr>
                        
                    <?php 
                        endwhile;
                    endif;
                    ?>
                </tbody>
            </table>

        </div> <!-- fin contenedor tabla -->

    </div> <!-- fin contenedor contactos -->
</div> <!--  fin contenedor blanco -->

<?php include_once('includes/layout/footer.php')?>