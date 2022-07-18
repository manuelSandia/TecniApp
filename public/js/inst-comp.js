
const mostrarInstalaciones = document.querySelector('tbody');

const urlObtenerComp = ( window.location.hostname.includes('localhost'))?'http://localhost:8080/api/instalaciones/completadas/'
:'https://proyecto-tecniapp.herokuapp.com/api/instalaciones/completadas';


fetch(urlObtenerComp , {
  method: 'GET', 
  body: JSON.stringify(),
  headers: { 'Content-Type': 'application/json'}
})
.then( resp => resp.json() )
.then( ({ instalaciones }) => {
  
  const dibujarInstalaciones = ( instalaciones = [] ) =>{
    
    let tablaHtml = '';

    instalaciones.forEach( ({ cedula, nombre, apellido, direccion, zona, coordenadas,antena, router, fecha, updatedAt }) =>{
      
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
          <td>${updatedAt}</td>
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
