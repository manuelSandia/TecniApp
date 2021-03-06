const nombreForm    = document.querySelector('#validationCustom01');
const apellidoForm  = document.querySelector('#validationCustom02');
const cedulaForm    = document.querySelector('#validationCustomUsername');
const direccionForm = document.querySelector('#validationCustom03');
const zonaForm      = document.querySelector('#validationCustom04');
const coordenadasForm = document.querySelector('#validationCustom05');
const antenaForm   = document.querySelector('#validationCustom06');
const routerForm   = document.querySelector('#validationCustom07');
const fechaForm    = document.querySelector('#validationCustom08');
const miFormulario = document.querySelector('form');


const urlObtIns = ( window.location.hostname.includes('localhost'))?'http://localhost:8080/api/instalaciones/obtener/'
:'https://proyecto-tecniapp.herokuapp.com/api/instalaciones/obtener/';

const urlActIns = ( window.location.hostname.includes('localhost'))?'http://localhost:8080/api/instalaciones/actualizar/'
:'https://proyecto-tecniapp.herokuapp.com/api/instalaciones/actualizar/';



// Dibujar la Informacion a Actualizar en el Formulario:
document.addEventListener('DOMContentLoaded', ()=>{

    let id = localStorage.getItem('id');

    fetch(urlObtIns + id, {   
        method: 'GET', 
        body: JSON.stringify(),
        headers: { 'Content-Type': 'application/json'}
    })
    .then( resp => resp.json() )
    .then(({nombre, apellido, cedula, direccion, antena, router, coordenadas, zona, fecha})=>{
        
        nombreForm.value    = nombre;
        apellidoForm.value  = apellido;
        cedulaForm.value    = cedula;
        direccionForm.value = direccion;
        antenaForm.value    = antena;
        routerForm.value    = router;
        coordenadasForm.value = coordenadas;
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
       
    fetch(urlActIns + id, {
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
            title: 'Instalacion Actualizada Exitosamente',
            showConfirmButton: false,
            timer: 4500
        });

        setTimeout(
            function(){window.location='./instalaciones.html';}
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






