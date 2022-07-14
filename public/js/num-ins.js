const numero = document.querySelector('#h2-1');

const urlIns1 = ( window.location.hostname.includes('localhost'))?'http://localhost:8080/api/instalaciones/'
:'https://restserver-curso-node-manuel.herokuapp.com/api/instalaciones/';

fetch(urlIns1 + 'obtener', {
    method: 'GET', 
    body: JSON.stringify(),
    headers: { 'Content-Type': 'application/json'}
})
.then( resp => resp.json() )
.then( ({total}) => {
    numero.innerText = total;
})
.catch( err =>{
    console.log(err);
});