
const miFormulario = document.querySelector('form');

const urlReg = ( window.location.hostname.includes('localhost'))?'http://localhost:8080/api/instalaciones/'
:'https://proyecto-tecniapp.herokuapp.com/api/instalaciones/';

// // Validar el token del localstorage
// const validarJWT = async() =>{
    
//     const token = localStorage.getItem('token') || '';

//     if ( token.length <= 10 ) {
//         window.location = 'index.html';
//         throw new Error('No hay token en el servidor!!!!');
//     }

//     const resp = await fetch( url + 'registro', {
//         headers: { 'x-token': token }
//     });

//     const {id: _id ,usuario: userDB, token: tokenDB} = await resp.json();
//     localStorage.setItem('token', tokenDB);
//     usuario = userDB;
//     document.title = usuario.nombre;

//     // await conectarSocket();

// }

// validarJWT();

miFormulario.addEventListener('submit', ev => {
    ev.preventDefault();
    const formData = {};

    for( let el of miFormulario.elements ){
        if( el.name.length > 0 ){
            formData[el.name] = el.value;
        }         
    };     

    console.log(formData);
    
   
    fetch(urlReg + 'registro', {
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
            // footer: '<a href="">Why do I have this issue?</a>'
          })
    })
});    

// if(resp.satatus === 200){
//     setTimeout(
//         function(){window.location.reload();}
//         ,6500);
// }

// window.location.reload();


// const main = async() =>{

//     // Validar JWT
//     await validarJWT();

// }




// main();
