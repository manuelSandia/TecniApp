const body2      = document.querySelector('body');

const urlCompIns = ( window.location.hostname.includes('localhost'))?'http://localhost:8080/api/instalaciones/completar/'
:'https://proyecto-tecniapp.herokuapp.com/api/instalaciones/completar/';



// FUNCION PARA COMPLETAR INSTALACION:   
body2.addEventListener('click', ()=>{
  if(event.target.id === "btnComp"){
    
    let id = event.target.getAttribute('alt');
    
    //alerta de confirmacion:
    Swal.fire({
      title: 'Deseas Completar esta Instalacion?',
      text: "se marcara como completada",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Completar!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Completada!',
          'La Instalacion ha sido marcada como Realizada'
        ).then(()=>{
          fetch(urlCompIns + id, {   
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