
const url = ( window.location.hostname.includes('localhost'))
?'http://localhost:8080/api/auth/'
:'https://proyecto-tecniapp.herokuapp.com/api/auth/';

let usuario = null;
let socket  = null;

const btnSalir   = document.querySelector('#btnSalir');
const userName = document.querySelector('#username');
const userImg = document.querySelector('#userimg');


// Validar el token del localstorage
const validarJWT = async() =>{
 
 const token = localStorage.getItem('token') || '';

 if ( token.length <= 10 ) {
     window.location = 'index.html';
     throw new Error('No hay token en el servidor!!!!');
 }

 const resp = await fetch( url, {
     headers: { 'x-token': token }
 });

 const {usuario: userDB, token: tokenDB} = await resp.json();
 localStorage.setItem('token', tokenDB);
 usuario = userDB;
 document.title = usuario.nombre;
 userName.innerText = usuario.nombre
 userImg.src = usuario.img
 await conectarSocket();

}

const conectarSocket = async() =>{
 socket = io({
     'extraHeaders':{
         'x-token': localStorage.getItem('token')
     }
 }); 

 socket.on('connect', () => {
     console.log('Sockets online');
 });

 socket.on('disconnect', () => {
     console.log('Sockets offline');
 });

}


const button = document.getElementById('btnsalir');
button.onclick = () =>{
      localStorage.clear();  
      location.reload();
}

const main = async() =>{

 // Validar JWT
 await validarJWT();

}

main();


