
const mostrarReportes = document.querySelector('tbody');

const urlObtenerComp = ( window.location.hostname.includes('localhost'))?'http://localhost:8080/api/reportes/atendidos/'
:'https://proyecto-tecniapp.herokuapp.com/api/reportes/atendidos/';


fetch(urlObtenerComp , {
  method: 'GET', 
  body: JSON.stringify(),
  headers: { 'Content-Type': 'application/json'}
})
.then( resp => resp.json() )
.then( ({ reportes }) => {
  
  const dibujarReportes = ( reportes = [] ) =>{
    
    let tablaHtml = '';
    reportes.forEach( ({ cedula, nombre, apellido, direccion, telefono, zona, descripcion, fecha, updatedAt }) =>{
      
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
          <td>${updatedAt}</td>
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
