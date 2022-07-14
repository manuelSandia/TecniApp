const numero2 = document.querySelector('#h2-3');

const urlRep1 = ( window.location.hostname.includes('localhost'))?'http://localhost:8080/api/reportes/'
:'https://proyecto-tecniapp.herokuapp.com/api/reportes/';

fetch(urlRep1 + 'obtener', {
    method: 'GET', 
    body: JSON.stringify(),
    headers: { 'Content-Type': 'application/json'}
})
.then( resp => resp.json() )
.then( ({total}) => {
    numero2.innerText = total;
})
.catch( err =>{
    console.log(err);
});