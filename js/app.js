const formularioContacto = document.querySelector('#contacto'),
    listadoContactos = document.querySelector('#listado-contactos tbody'),
    buscador = document.querySelector('#buscar');

eventListeners();

function eventListeners() {
    // Cuando se ejecuta boton crear o editar 
    formularioContacto.addEventListener('submit', leerFormulario);

    //Listener para eliminare el boton
   if(listadoContactos) {
       listadoContactos.addEventListener('click', eliminarContacto)
   }

   if(buscador) {
       buscador.addEventListener('input', buscarContactos)
   }

   numeroContactos();
}

function leerFormulario(e) {
    e.preventDefault();
    const nombre = formularioContacto.querySelector('#nombre').value,
    empresa = formularioContacto.querySelector('#empresa').value,
    telefono = formularioContacto.querySelector('#telefono').value,
    accion = formularioContacto.querySelector('#accion').value;


    if (nombre === '' || empresa === '' || telefono === '') {
        //2 parametros para la notificacion, texto y clase
        mostrarNotificacion('Todos los Campos son Obligatorios', 'error');
    }else {
        /* pasa validacion y envia datos a Ajax */

        const infoContacto = new FormData();  //pasar datos por ajax
        infoContacto.append('nombre', nombre);  //info del contacto pasado a infocontactos en un array
        infoContacto.append('empresa', empresa);
        infoContacto.append('telefono', telefono);
        infoContacto.append('accion', accion);

        // console.log(...infoContacto)  los ... crea un copia de como se veria
        
        if (accion === 'crear') {
            //crea nuevo elemento
            insertarBD(infoContacto);
        } else if(accion === 'editar') {
            //edita elemento
            //leer id
            const id = document.querySelector('#id').value;
            infoContacto.append('id', id);

            editarContacto(infoContacto);
        }
    }
}   

//inserta en la base de datos via ajax
function insertarBD(datos) {
    /* llamado a ajax */
    /* crea objeto */
    const xhr = new XMLHttpRequest();
    /* abrir conexion */
    xhr.open('POST', 'includes/models/modelos-contacto.php',true); /* 3parametros : tipo de peticion (get (consulta a BD), post (inserta y consulta), direccion a donde se conecta, llamado asincrono*/
    /* pasar datos */
    xhr.onload = function() {
        if(this.status === 200 && this.readyState == 4)  {
            //se lee respuesta por php
            // console.log(JSON.parse(xhr.responseText));
            const json = JSON.parse(xhr.responseText);

            //inserta nuevo elemento a la tabla
            const nuevoContacto = document.createElement('tr');

            nuevoContacto.innerHTML = `
            <td>${json.datos.nombre}</td>
            <td>${json.datos.empresa}</td>
            <td>${json.datos.telefono}</td>
            `;

            /*contenedor para los botones ========================================================*/ 
            const contenedorAcciones = document.createElement('td');
            
            /* boton editar */
            //crear icono editar
            const iconoEditar = document.createElement('i');
            iconoEditar.classList.add('fas', 'fa-pen-square');
            //enlace para editar
            const btnEditar = document.createElement('a');
            btnEditar.appendChild(iconoEditar);
            btnEditar.href = `editar.php?id=${json.datos.id_insertado}`;
            btnEditar.classList.add('btn-editar', 'btn');

            //agregando boton editar a contenedor acciones
            contenedorAcciones.appendChild(btnEditar);


            /* Boton eliminar */
            //crear icono Eliminar
            const iconoEliminar = document.createElement('i');
            iconoEliminar.classList.add('fas', 'fa-trash-alt');

            //crea boton de eliminar
            const btnEliminar = document.createElement('button');
            btnEliminar.appendChild(iconoEliminar);
            btnEliminar.setAttribute('data-id', json.datos.id_insertado);
            btnEliminar.classList.add('btn-borrar', 'btn');

            //agregando boton eliminar a contenedor acciones
            contenedorAcciones.appendChild(btnEliminar);
            

            /* Agregar botones a tabla ===========================================*/
            nuevoContacto.appendChild(contenedorAcciones);  //agrega botones a tr de nuevo contacto
            listadoContactos.appendChild(nuevoContacto);  //agrega tr a tbody de lista de contactos

            /* reseteo de formulario */
            document.querySelector('form').reset();

            /* mostrar notificacion */
            mostrarNotificacion('Contacto Creado Correctamente', 'exito');

            /* actualiza el numero de ingresados */
            numeroContactos();
        }
    }
    /* enviar datos */
    xhr.send(datos);
}

//eliminar contacto

function eliminarContacto(e) {  //detectara que solo se de click en boton eliminar
    if (e.target.parentElement.classList.contains('btn-borrar')) {//valida que sea el boton borrar)
       const id = e.target.parentElement.getAttribute('data-id')
    //    console.log(id);

        //pregunta a usuario si desea eliminar
        const respuesta = confirm('¿Desea eliminar este registro?')
        if (respuesta) {
            /* llamado a ajax */
            /* crea objeto */
            const xhr = new XMLHttpRequest();
            /* abrir conexion */
            xhr.open('GET', `includes/models/modelos-contacto.php?id=${id}&accion=borrar`,true); /* 3parametros : tipo de peticion (get (consulta a BD), post (inserta y consulta), direccion a donde se conecta, llamado asincrono*/
            /* pasar datos */
            xhr.onload = function() {
                if (this.status === 200 && this.readyState == 4) {
                    const json = JSON.parse(xhr.responseText);
                    if (json.respuesta === 'correcto') {
                        //Eliminar el registro del DOM
                        e.target.parentElement.parentElement.parentElement.remove();
                        mostrarNotificacion('Contacto Eliminado', 'exito')
                        numeroContactos();
                    }else {
                        //mostrar notiifcacion
                        mostrarNotificacion('Hubo un error ...', 'error')
                    }
                }
            }
            /* enviar datos */
            xhr.send();   //NO SE ENVIA INFORMACION POR SEND SOLO APLICA PARA POST
        }
    }
}

//editar contacto
function editarContacto(datos) {
     /* llamado a ajax */
    /* crea objeto */
    const xhr = new XMLHttpRequest();
    /* abrir conexion */
    xhr.open('POST', 'includes/models/modelos-contacto.php',true); /* 3parametros : tipo de peticion (get (consulta a BD), post (inserta y consulta), direccion a donde se conecta, llamado asincrono*/
    /* pasar datos */
    xhr.onload = function() {
        if(this.status === 200 && this.readyState == 4) {
            const json = JSON.parse(xhr.responseText);
            console.log(json);
            if (json.respuesta === 'correcto') {
                //Eliminar el registro del DOM
                mostrarNotificacion('Contacto Actualizado', 'exito')
            }else {
                //mostrar notiifcacion
                mostrarNotificacion('Hubo un error ...', 'error')
            }

            //despues de 3s redirecciona a index
            setTimeout(() => {
                window.location.href = 'index.php';
            }, 2000);
        }
    }
    /* enviar datos */
    xhr.send(datos);
}

//notificaciones

function mostrarNotificacion(mensaje, clase) {
    const notificacion = document.createElement('div');
    notificacion.classList.add(clase,'notificacion', 'sombra');
    notificacion.textContent = mensaje;

    /* formulario */
    formularioContacto.insertBefore(notificacion, document.querySelector('form legend'));

    /* ocultar div de notificacion */
    setTimeout(() => {
        notificacion.classList.add('visible');
        setTimeout(() => {
            notificacion.classList.remove('visible');
            setTimeout(() => {
                notificacion.remove();
            }, 500);
        }, 2000);
    }, 100);

}

//buscador de registros
function buscarContactos(e){
    const expresion = RegExp(e.target.value, 'i'),  //crea expresion de valor ingresado
    registros = document.querySelectorAll('tbody tr');  //selecciona todos los tr

    registros.forEach(registro => {  
        registro.style.display = 'none';  //oculta los registros cunado se empieza a escribir

        if (registro.childNodes[1].textContent.replace(/\s/g, " ").search(expresion) != -1) {  //busca en el hijo 1, en este siempre debe estar el primer texto, el texto, el texto obtenido remplaza los espacios con string " " y busca en ese resultado la expresion, debe se direfete de -1 para ser true
            registro.style.display = 'table-row';
        }
        numeroContactos();
    })

}

//contador de contactos
function numeroContactos() {
    const totalContactos = document.querySelectorAll('tbody tr'),
        contenedorContactos = document.querySelector('.total-contactos span');
    let total = 0;

    totalContactos.forEach(contacto => {  
        if (contacto.style.display === '' || contacto.style.display === 'table-row') {
            total++;
        }
    })

    contenedorContactos.textContent = total;

}