
const miFormulario = document.querySelector('form');

const urlRegIns = ( window.location.hostname.includes('localhost'))?'http://localhost:8080/api/instalaciones/registro'
:'https://proyecto-tecniapp.herokuapp.com/api/instalaciones/registro';


miFormulario.addEventListener('submit', ev => {
    ev.preventDefault();

    const formData = {};

    for( let el of miFormulario.elements ){
        if( el.name.length > 0 ){
            formData[el.name] = el.value;
        }         
    };     

    console.log(formData);
    
   
    fetch(urlRegIns + '', {
        method: 'POST', 
        body: JSON.stringify(formData),
        headers: { 'Content-Type': 'application/json'}
    })
    .then( resp => resp.json() )
    .then( (resp) => {
        
        console.log('peticion recibida');
        console.log(resp);
        
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Instalacion Registrada Exitosamente',
            showConfirmButton: false,
            timer: 4500
        });

        setTimeout(
            function(){window.location.reload();}
        ,5500);
             
    })
    .catch( err =>{
        console.log(err);
        Swal.fire({
            icon: 'error',
            title: 'Error al Registrar',
            text: 'Comunicate con el Administrador',
        });
    });
});    

