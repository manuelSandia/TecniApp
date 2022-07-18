const realizadas           = document.querySelector('#realizadas');
const mostrarInstalaciones = document.querySelector('tbody');
const InstPendientes  = document.querySelector('#h2-3');
const btnCompletar    = document.querySelector('#btnComp');
const btnActualizar   = document.querySelector('#btnAct');
const body1           = document.querySelector('body');
const formulario      = document.querySelector('#tabla');
const InstCompletadas = document.querySelector('#h2-1');


const urlObtIns = ( window.location.hostname.includes('localhost'))?'http://localhost:8080/api/instalaciones/obtener'
:'https://proyecto-tecniapp.herokuapp.com/api/instalaciones/obtener';

const urlInsComp = ( window.location.hostname.includes('localhost'))?'http://localhost:8080/api/instalaciones/completadas/'
:'https://proyecto-tecniapp.herokuapp.com/api/instalaciones/completadas/';


fetch(urlObtIns , {
  method: 'GET', 
  body: JSON.stringify(),
  headers: { 'Content-Type': 'application/json'}
})
.then( resp => resp.json() )
.then( ({total, instalaciones}) => {
     
  InstPendientes.innerText = total; 

  const dibujarInstalaciones = ( instalaciones = [] ) =>{
    
    let tablaHtml = '';

    instalaciones.forEach( ({ _id, cedula, nombre, apellido, direccion, zona, coordenadas,antena, router, fecha }) =>{
      
      tablaHtml += `
        <tr>
          <th scope="row">${cedula}</th>
          <td>${nombre}</td>
          <td>${apellido}</td>
          <td>${direccion}</td>
          <td>${zona}</td>
          <td>${coordenadas}</td>
          <td>${antena}</td>
          <td>${router}</td>
          <td>${fecha}</td>
          <td>
            <img src="./assets/img/btn-completar-2.png" alt="${_id}" width="28" height="28" class="rounded-circle me-2" id="btnComp" title="Completar">
            <img src="./assets/img/btn-actualizar-1.png" alt="${_id}" width="26" height="26" class="rounded-circle me-2 actualizar" id="btnAct" title="Actualizar">
            <img src="./assets/img/btn-borrar-1.png" alt="${_id}" width="26" height="26" class="rounded-circle me-2 borrar" id="btnBorrar" title="Borrar"></img>
          </td>
        </tr>
      `;         
    });
    
    mostrarInstalaciones.innerHTML = tablaHtml;
    
  }

  dibujarInstalaciones(instalaciones);
    
})
.catch( err =>{
    console.log(err);
});


// Mostrar el numero de instalaciones completadas
fetch(urlInsComp, {
  method: 'GET', 
  body: JSON.stringify(),
  headers: { 'Content-Type': 'application/json'}
})
.then( resp => resp.json() )
.then( ({total}) => {

  InstCompletadas.innerText = total;
    
})
.catch( err =>{
  console.log(err);
});


// Obtener Instalacion por Id para Actualizar:
body1.addEventListener('click', ()=>{
   
  if(event.target.id === "btnAct"){
    
    let id = event.target.getAttribute('alt');
    
    localStorage.setItem('id',id);

    window.location ="./actualizarIns.html";     

  }

});


realizadas.addEventListener('click', ()=>{
  window.location = "./inst-comp.html";
});













