const miFormulario    = document.querySelector('form');
const nombreForm      = document.querySelector('#validationCustom01');
const apellidoForm    = document.querySelector('#validationCustom02');
const cedulaForm      = document.querySelector('#validationCustomUsername');
const telefonoForm    = document.querySelector('#validationCustomUsername01');
const direccionForm   = document.querySelector('#validationCustom03');
const zonaForm        = document.querySelector('#validationCustom04');
const fechaForm       = document.querySelector('#validationCustom05');
const descripcionForm = document.querySelector('#validationCustom06');

const urlObtRep = ( window.location.hostname.includes('localhost'))?'http://localhost:8080/api/reportes/'
:'https://restserver-curso-node-manuel.herokuapp.com/api/reportes/obtener/';

const urlAct = ( window.location.hostname.includes('localhost'))?'http://localhost:8080/api/reportes/actualizar/'
:'https://restserver-curso-node-manuel.herokuapp.com/api/reportes/actualizar/';

document.addEventListener('DOMContentLoaded', ()=>{


    let id = localStorage.getItem('id');
    

    fetch(urlObtRep +'obtener/'+ id, {   
        method: 'GET', 
        body: JSON.stringify(),
        headers: { 'Content-Type': 'application/json'}
    })
    .then( resp => resp.json() )
    .then(({nombre, apellido, cedula, direccion, telefono, zona, fecha, descripcion})=>{
        
        nombreForm.value      = nombre;
        apellidoForm.value    = apellido;
        cedulaForm.value      = cedula;
        direccionForm.value   = direccion;
        telefonoForm.value    = telefono;
        descripcionForm.value = descripcion;
        zonaForm.value  = zona;
        fechaForm.value = fecha;
    })
    .catch( err =>{
        console.log(err);
    });

});

// Funcion para Actualizar los Datos de la Instalacion:
miFormulario.addEventListener('submit', ev => {
    ev.preventDefault();
    let id = localStorage.getItem('id');

    const formData = {};

    for( let el of miFormulario.elements ){
        if( el.name.length > 0 ){
            formData[el.name] = el.value;
        }         
    };     

    console.log(formData);
    
   
    fetch(urlAct + id, {
        method: 'PUT', 
        body: JSON.stringify(formData),
        headers: { 'Content-Type': 'application/json'}
    })
    .then( resp => resp.json() )
    .then( (resp) => {
        
        console.log('Informacion Actualizada');
        console.log(resp);
        
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Reporte Actualizado Exitosamente',
            showConfirmButton: false,
            timer: 4500
        });

        setTimeout(
            function(){window.location='./reportes.html';}
        ,5000);
             
    })
    .catch( err =>{
        console.log(err);
        Swal.fire({
            icon: 'error',
            title: 'Error al Actualizar',
            text: 'Comunicate con el Administrador',
          })
    })
});  






