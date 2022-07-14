const realizadas = document.querySelector('#realizadas');
const mostrarReportes = document.querySelector('tbody');
const repPendientes = document.querySelector('#h2-3');
const btnCompletar   = document.querySelector('#btnComp');
const btnActualizar  = document.querySelector('#btnAct');
const body1      = document.querySelector('body');
const formulario = document.querySelector('#tabla');
const repRealizados = document.querySelector('#h2-1');




const urlRep = ( window.location.hostname.includes('localhost'))?'http://localhost:8080/api/reportes/'
:'https://restserver-curso-node-manuel.herokuapp.com/api/reportes/';

const urlComp1 = ( window.location.hostname.includes('localhost'))?'http://localhost:8080/api/reportes/atendidos/'
:'https://restserver-curso-node-manuel.herokuapp.com/api/reportes/atendidos/';


fetch(urlRep + 'obtener', {
    method: 'GET', 
    body: JSON.stringify(),
    headers: { 'Content-Type': 'application/json'}
})
.then( resp => resp.json() )
.then( ({total, reportes}) => {
  console.log(reportes)
    
  repPendientes.innerText = total; 

  const dibujarReportes = ( reportes = [] ) =>{
    
    let tablaHtml = '';
    reportes.forEach( ({ _id, cedula, nombre, apellido, direccion, zona, descripcion, telefono, fecha }) =>{
      
      tablaHtml += `
        <tr>
          <th scope="row">${cedula}</th>
          <td>${nombre}</td>
          <td>${apellido}</td>
          <td>${telefono}</td>
          <td>${direccion}</td>
          <td>${zona}</td>
          <td>${descripcion}</td>
          <td>${fecha}</td>
          <td>
            <img src="./assets/img/btn-completar-2.png" alt="${_id}" width="28" height="28" class="rounded-circle me-2" id="btnComp" title="Completar">
            <img src="./assets/img/btn-actualizar-1.png" alt="${_id}" width="26" height="26" class="rounded-circle me-2 actualizar" id="btnAct" title="Actualizar">
            <img src="./assets/img/btn-borrar-1.png" alt="${_id}" width="26" height="26" class="rounded-circle me-2 borrar" id="btnBorrar" title="Borrar"></img>
          </td>
        </tr>
      `;         
    });
    
    mostrarReportes.innerHTML = tablaHtml;
    
  }

  dibujarReportes(reportes);
    
})
.catch( err =>{
    console.log(err);
});


// Mostrar el numero de Soportes Realizados
fetch(urlComp1, {
  method: 'GET', 
  body: JSON.stringify(),
  headers: { 'Content-Type': 'application/json'}
})
.then( resp => resp.json() )
.then( ({total}) => {

  repRealizados.innerText = total;
    
})
.catch( err =>{
  console.log(err);
});






// Obtener Soporte por Id para Actualizar:
body1.addEventListener('click', ()=>{
   
  if(event.target.id === "btnAct"){
    
    let id = event.target.getAttribute('alt');
    
    localStorage.setItem('id',id);

    window.location ="./actualizar-rep.html";     

  }

});


realizadas.addEventListener('click', ()=>{
  window.location = "./rep-comp.html";
});
