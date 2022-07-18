const body2      = document.querySelector('body');

const urlCompRep = ( window.location.hostname.includes('localhost'))?'http://localhost:8080/api/reportes/completar/'
:'https://proyecto-tecniapp.herokuapp.com/api/reportes/completar/';


// FUNCION PARA COMPLETAR REPORTE:   
body2.addEventListener('click', ()=>{
  if(event.target.id === "btnComp"){
    
    let id = event.target.getAttribute('alt');
      console.log(id);
      
    //alerta de confirmacion:
    Swal.fire({
      title: 'Deseas Completar este Reporte?',
      text: "se marcara como Atendido",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Completar!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Atendido!',
          'El Reporte ha sido marcada como Atendido!'
        ).then(()=>{
          fetch(urlCompRep + id, {   
            method: 'PUT', 
            body: JSON.stringify(),
            headers: { 'Content-Type': 'application/json'}
          })
          .then( resp => resp.json() )
          .then((resp)=>{
            console.log(resp);
            window.location.reload();
          })
          .catch( err =>{
            console.log(err);
          });
        });
      }
    });   
  }    
});