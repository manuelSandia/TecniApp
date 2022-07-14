const realizadas = document.querySelector('#realizadas');
const mostrarInstalaciones = document.querySelector('tbody');
const InstPendientes = document.querySelector('#h2-3');
const btnCompletar   = document.querySelector('#btnComp');
const btnActualizar  = document.querySelector('#btnAct');
const body1      = document.querySelector('body');
const formulario = document.querySelector('#tabla');
const InstCompletadas = document.querySelector('#h2-1');




const urlIns = ( window.location.hostname.includes('localhost'))?'http://localhost:8080/api/instalaciones/'
:'https://proyecto-tecniapp.herokuapp.com/api/instalaciones/';

const urlComp1 = ( window.location.hostname.includes('localhost'))?'http://localhost:8080/api/instalaciones/completadas/'
:'https://proyecto-tecniapp.herokuapp.com/api/instalaciones/completadas/';


fetch(urlIns + 'obtener', {
    method: 'GET', 
    body: JSON.stringify(),
    headers: { 'Content-Type': 'application/json'}
})
.then( resp => resp.json() )
.then( ({total, instalaciones}) => {
  console.log(instalaciones)
    
  InstPendientes.innerText = total; 

  const dibujarInstalaciones = ( instalaciones = [] ) =>{
    let id = [];
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
fetch(urlComp1, {
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






// lISTA DE OPCIONES
{/* <div class="dropdown">
                      
<button type="button" class="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown" id="username">
  <img src="./assets/img/config-2.png" alt="" width="32" height="32" class="rounded-circle me-2" id="configimg">
</button>
<ul class="dropdown-menu">
  <li><a id="btnComp" class="dropdown-item" href="#">Completar</a></li>
  <li><a id="btnAct" class="dropdown-item" href="#">Actualizar</a></li>
  <li><a id="btnBorrar" class="dropdown-item" href="#" alt="${_id}">Borrar</a></li>
</ul>
</div> */}





{/* <img src="./assets/img/btn-completar-2.png" alt="" width="28" height="28" class="rounded-circle me-2" id="btnComp" title="Completar">
<img src="./assets/img/btn-actualizar-1.png" alt="" width="26" height="26" class="rounded-circle me-2" id="btnAct" title="Actualizar">
<img src="./assets/img/btn-borrar-1.png" alt="${_id}" width="26" height="26" class="rounded-circle me-2" id="btnBorrar" title="${_id}">${_id}</img> */}





