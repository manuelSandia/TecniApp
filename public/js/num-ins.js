const numero = document.querySelector('#h2-1');

const urlObtIns1 = ( window.location.hostname.includes('localhost'))?'http://localhost:8080/api/instalaciones/obtener'
:'https://proyecto-tecniapp.herokuapp.com/api/instalaciones/obtener';

fetch(urlObtIns1, {
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