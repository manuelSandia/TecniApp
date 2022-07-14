const body2      = document.querySelector('body');

const urlComp = ( window.location.hostname.includes('localhost'))?'http://localhost:8080/api/soportes/completar/'
:'https://proyecto-tecniapp.herokuapp.com/api/soportes/completar/';



// FUNCION PARA COMPLETAR SOPORTE:   
body2.addEventListener('click', ()=>{
    if(event.target.id === "btnComp"){
      
      let id = event.target.getAttribute('alt');
        console.log(id);
        
      
  
        //alerta de confirmacion:
        Swal.fire({
          title: 'Deseas Completar este Soporte?',
          text: "se marcara como Realizado",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Completar!'
        }).then((result) => {
          if (result.isConfirmed) {
            Swal.fire(
              'Completada!',
              'El Soporte ha sido marcada como Realizada'
            ).then(()=>{
  
              
              fetch(urlComp + id, {   
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
  
            })
          }
        })
        
    }
    
  });