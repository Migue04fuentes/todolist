// Declaración de constantes
// fecha
const fecha = document.querySelector('#fecha');
// lista
const lista = document.querySelector('#lista');
// input de tareas
const input = document.querySelector('#input');
//Boton de anexar tareas
const botonEnter = document.querySelector('#boton-enter');

// Variables de las clases html
const check = 'fa-check-circle';
const uncheck = 'fa-circle';
const linethrough = 'line-through';

let id = 0;

// Función agregar tarea

function agregartarea(tarea,id,realizado,eliminado) {


    //Cuando eliminado sea true nada de esto se va a ejecutar
    if(eliminado){
        return
    }
    
    // marcar si esta realizado o no
    const REALIZADO = realizado ?check :uncheck;
    // tachar si esta realizado
    const LINE = realizado ?linethrough :"";

    const elemento = `<li id="elemento">
                       <i class="far ${REALIZADO}" data="realizado" id="${id}"></i>
                       <p class="text ${LINE}">${tarea}</p>
                       <i class="fas fa-trash de" data="eliminado" id="${id}"></i>
                      </li>`

    lista.insertAdjacentHTML("beforeend", elemento); //beforeend colocar antes de finalizar la lista
  id++;
}

// Tarea realizada
function tarearealizada(element){
    // marcar si esta realizada o no
    element.classList.toggle(check);
    element.classList.toggle(uncheck);
    // subrayado, parentNode para identificar los elementos hijos
    element.parentNode.querySelector('.text').classList.toggle(linethrough);
}






botonEnter.addEventListener('click', () => {
    const tarea = input.value
    if (tarea) {
        agregartarea(tarea,id,false,false);
    }
    input.value = "";
    id++;
})

document.addEventListener('keyup', function (event) {
    if (event.key == 'Enter') {
        const tarea = input.value
        if (tarea) {
            agregartarea(tarea,id,false,false);
        }
        input.value = "";
        id++;
    }
})

// Detectar click en la lista
lista.addEventListener('click', function(event){
    const element = event.target;  // Obtener un elemento(Bloque de código) del DOM
    //atributes enlista todos los identificadores 
    //dentro de este elemento, se especifica que es data
    //y luego se le pide el valor
    const elementdata = element.attributes.data.value; 
    
    if(elementdata == 'realizado'){
        tarearealizada(element);
    }else if(elementdata){
        eliminartarea(element);
    }
})



