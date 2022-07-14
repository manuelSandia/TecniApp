const numero1 = document.querySelector('#h2-2');

const urlSop1 = ( window.location.hostname.includes('localhost'))?'http://localhost:8080/api/soportes/'
:'https://proyecto-tecniapp.herokuapp.com/api/soportes/';

fetch(urlSop1 + 'obtener', {
    method: 'GET', 
    body: JSON.stringify(),
    headers: { 'Content-Type': 'application/json'}
})
.then( resp => resp.json() )
.then( ({total}) => {
    numero1.innerText = total;
})
.catch( err =>{
    console.log(err);
});