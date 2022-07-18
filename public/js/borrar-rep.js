const body      = document.querySelector('body');
const btnBorrar = document.querySelector('.rounded-circle me-2 borrar');

const urlBorrarRep = ( window.location.hostname.includes('localhost'))?'http://localhost:8080/api/reportes/borrar/'
:'https://proyecto-tecniapp.herokuapp.com/api/reportes/borrar/';

// FUNCION PARA BORRAR REPORTE:   
body.addEventListener('click', ()=>{
  if(event.target.id === "btnBorrar"){
      
    let id = event.target.getAttribute('alt');

    //alerta de confirmacion:
    Swal.fire({
      title: 'Estas seguro de Borrar este Reporte?',
      text: "los datos borrados no podran recuperarse!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Borrar!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        ).then(()=>{

          fetch(urlBorrarRep + id, {   
            method: 'DELETE', 
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