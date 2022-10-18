// Declaración de constantes
// fecha
const fecha = document.querySelector("#fecha");
// lista
const lista = document.querySelector("#lista");

const elemento = document.querySelector("#elemento");
// input de tareas
const input = document.querySelector("#input");
//Boton de anexar tareas
const botonEnter = document.querySelector("#boton-enter");

// Variables de las clases html
const check = "fa-check-circle";
const uncheck = "fa-circle";
const linethrough = "line-through";

//variable para guadar listas
let LIST;

// variable de inicio de id;
let id;

// FECHA
const FECHA = new Date();
fecha.innerHTML = FECHA.toLocaleDateString("es-mx", {
  weekday: "long",
  month: "short",
  day: "numeric",
});

// Función agregar tarea
function agregartarea(tarea, id, realizado, eliminado) {
  //Cuando eliminado sea true nada de esto se va a ejecutar
  if (eliminado) {
    return;
  }

  // marcar si esta realizado o no
  const REALIZADO = realizado ? check : uncheck;
  // tachar si esta realizado
  const LINE = realizado ? linethrough : "";

  const elemento = `<li id="elemento">
                       <i class="far ${REALIZADO}" data="realizado" id="${id}"></i>
                       <p class="text ${LINE}">${tarea}</p>
                       <i class="fas fa-trash de" data="eliminado" id="${id}"></i>
                      </li>`;

  lista.insertAdjacentHTML("beforeend", elemento); //beforeend colocar antes de finalizar la lista
  id++;
}

// Tarea realizada
function tarearealizada(element) {
  // marcar si esta realizada o no
  element.classList.toggle(check);
  element.classList.toggle(uncheck);
  // subrayado, parentNode para identificar los elementos hijos
  element.parentNode.querySelector(".text").classList.toggle(linethrough);

  LIST[element.id].realizado = LIST[element.id].realizado ? false : true;
}

//Eliminación de tarea
function eliminartarea(element) {
  element.parentNode.parentNode.removeChild(element.parentNode);

  LIST[element.id].eliminado = true;
}

// guardar tarea al dar click
botonEnter.addEventListener("click", () => {
  const tarea = input.value;
  if (tarea) {
    agregartarea(tarea, id, false, false);
    LIST.push({
      nombre: tarea,
      id: id,
      realizado: false,
      eliminado: false,
    });
  }
  localStorage.setItem("TODO", JSON.stringify(LIST));
  id++;
  input.value = "";
});

// Al presionar enter guardar tarea
document.addEventListener("keyup", function (event) {
  if (event.key == "Enter") {
    const tarea = input.value;
    if (tarea) {
      agregartarea(tarea, id, false, false);
      LIST.push({
        nombre: tarea,
        id: id,
        realizado: false,
        eliminado: false,
      });
    }
    localStorage.setItem("TODO", JSON.stringify(LIST));
    input.value = "";
    id++;
    console.log(LIST);
  }
});

// Detectar click en la lista
lista.addEventListener("click", function (event) {
  const element = event.target; // Obtener un elemento(Bloque de código) del DOM
  //atributes enlista todos los identificadores
  //dentro de este elemento, se especifica que es data
  //y luego se le pide el valor
  
  try {
    const elementData = element.attributes.data.value;
    if (elementData === "realizado") {
      tarearealizada(element);
    } else if (elementData === "eliminado") {
      eliminartarea(element);
    }
    localStorage.setItem("TODO", JSON.stringify(LIST));
  } catch (error) { return}
});

//extraer json de localstorage

let data = localStorage.getItem("TODO");
if (data) {
  LIST = JSON.parse(data);
  id = LIST.length;
  cargarlista(LIST);
} else {
  LIST = [];
  id = 0;
}

//cargar json en la lista
function cargarlista(DATA) {
  DATA.forEach(function (i) {
    agregartarea(i.nombre, i.id, i.realizado, i.eliminado);
  });
}
