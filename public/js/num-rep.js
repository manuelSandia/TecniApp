const numero2 = document.querySelector('#h2-3');

const urlObtRep1 = ( window.location.hostname.includes('localhost'))?'http://localhost:8080/api/reportes/obtener'
:'https://proyecto-tecniapp.herokuapp.com/api/reportes/obtener';

fetch(urlObtRep1, {
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