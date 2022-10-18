// Declaración de constantes
// fecha
const fecha = document.querySelector('#fecha');
// lista
const lista = document.querySelector('#lista');
// input de tareas
const input = document.querySelector('#input');
//Boton de anexar tareas
const botonEnter = document.querySelector('#boton-enter');


// Función agregar tarea

function agregartarea(tarea){
    const elemento = `<li id="elemento">
                       <i class="far fa-circle co" data="realizado" id="0"></i>
                       <p class="text">${tarea}</p>
                       <i class="fas fa-trash de" data="eliminado" id="0"></i>
                      </li>`

           lista.insertAdjacentHTML("beforeend",elemento); //beforeend colocar antes de finalizar la lista
}

botonEnter.addEventListener('click', () => {
    const tarea = input.value
    if(tarea){
        agregartarea(tarea);
    }
    input.value = "";
})

document.addEventListener('keyup', function(event){
    if(event.key =='Enter'){
        const tarea = input.value
        if(tarea){
            agregartarea(tarea);
        }
        input.value="";
    }
})



