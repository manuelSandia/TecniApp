const body      = document.querySelector('body');
const btnBorrar = document.querySelector('.rounded-circle me-2 borrar');


const urlBorrarIns = ( window.location.hostname.includes('localhost'))?'http://localhost:8080/api/instalaciones/borrar/'
:'https://proyecto-tecniapp.herokuapp.com/api/instalaciones/borrar/';


// FUNCION PARA BORRAR INSTALACION:   
body.addEventListener('click', ()=>{
  if(event.target.id === "btnBorrar"){
      
    let id = event.target.getAttribute('alt');

    //alerta de confirmacion:
    Swal.fire({
      title: 'Estas seguro de Borrar esta Instalacion?',
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

          fetch(urlBorrarIns + id, {   
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