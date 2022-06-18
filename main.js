import { getAllLists, updateList, deleteList, setList } from "./js/listService.js";
import { deleteToDo, setToDo, updateToDo } from "./js/toDoService.js";

const listContainer = document.getElementById('list-container')

/**
 * Función inicializadora que muestra todos los heroes al cargar la página
 */
document.addEventListener("DOMContentLoaded", getAllLists);

/**
 * Función para agregar nuevas listas al documento
 */
const listTrigger = document.getElementById('btn-add-task')
if (listTrigger) {
    listTrigger.addEventListener('click', () => {
        setList("Ingrese un título")

    })
}

/**
 * Función que oye todos los click del documento para generar las acciones con los botones
*/
document.addEventListener("click", (event) => {

    // delete list
    if (event.target.matches("#btn-delete-list")) {

        let isDelete = confirm(`¿Desea eliminar este elemento?`);
        if (isDelete) {
            try {
                //deleteAllToDo(event.target.parentNode.id)
                deleteList(event.target.parentNode.id)
            } catch (error) {
                let message = error.statusText || "Ocurrió un error al cargar";
                alert(`Error${error.status}: ${message}`);
            }
        }
    }

    //Update list 
    if (event.target.matches("#title")) {

        document.addEventListener("keypress", (key) => {
            if (key.charCode === 13) {
                const id = event.target.parentNode.id;
                const title = event.target.value;
                updateList(id, title)
            }

        })
    }

    // crear To Do
    if (event.target.matches(".btn-add-todo")) {
        setToDo(event.target.parentNode.id, "Ingrese un To Do")

        console.log(event.target.parentNode.id)
    }

    // Borrar To Do
    if (event.target.matches(".btn-delete-toDo")) {
        
        let isDelete = confirm(`¿Desea eliminar este elemento?`);
        if (isDelete) {
            try {
                deleteToDo(event.target.id)
            } catch (error) {
                let message = error.statusText || "Ocurrió un error al cargar";
                alert(`Error${error.status}: ${message}`);
            }
        }
    }

    // update To Do
    if (event.target.matches(".toDo")) {
        document.addEventListener("keypress", (key) => {
            if (key.charCode === 13) {

                console.log(event.target.parentNode);
                const id = event.target.id;
                const title = event.target.value;
                const listId = event.target.parentNode.id;

                updateToDo(id, listId, title);
            }

        })
    }

})






