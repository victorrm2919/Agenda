<div class="campos">
    <div class="campo">
        <label for="nombre">Nombre: </label>
        <input 
        type="text" 
        name="nombre" 
        id="nombre" 
        placeholder="Nombre Contacto" 
        value="<?php echo ($contacto['nombre']) ? $nombre : '' ;?>"> 
    </div>
    <div class="campo">
        <label for="empresa">Empresa: </label>
        <input type="text" name="empresa" id="empresa" placeholder="Nombre Empresa" value="<?php echo ($contacto['empresa']) ? $empresa : '' ;?>">
    </div>
    <div class="campo">
        <label for="nombre">Teléfono: </label>
        <input type="tel" name="telefono" id="telefono" placeholder="Teléfono Contacto" value="<?php echo ($contacto['telefono']) ? $telefono : '' ;?>">
    </div>

</div> <!-- Fin campos -->

<div class="campo enviar">
    <?php 
        $textoBtn = ($contacto['telefono']) ? 'Guardar' : 'Añadir';
        $accion = ($contacto['telefono']) ? 'editar' : 'crear';
    ?>
    <input type="hidden" id="accion" value="<?php echo $accion?>"> 
     
    <?php if(isset($contacto['id'])) { ?>
    <input type="hidden" id="id" value="<?php echo $id?>"> 
    <?php } ?>
    
    <input type="submit" value="<?php echo $textoBtn?>">
</div>