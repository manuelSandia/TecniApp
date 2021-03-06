
const mostrarSoportes = document.querySelector('tbody');

const urlObtenerComp = ( window.location.hostname.includes('localhost'))?'http://localhost:8080/api/soportes/completadas/'
:'https://proyecto-tecniapp.herokuapp.com/api/soportes/completadas/';


fetch(urlObtenerComp, {
  method: 'GET', 
  body: JSON.stringify(),
  headers: { 'Content-Type': 'application/json'}
})
.then( resp => resp.json() )
.then( ({ soportes }) => {
  
  const dibujarSoportes = ( soportes = [] ) =>{
    
    let tablaHtml = '';

    soportes.forEach( ({ cedula, nombre, apellido, direccion, telefono, zona, descripcion, fecha, updatedAt }) =>{
      
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
    
    mostrarSoportes.innerHTML = tablaHtml;
    
  }

  dibujarSoportes(soportes);
    
})
.catch( err =>{
    console.log(err);
});
