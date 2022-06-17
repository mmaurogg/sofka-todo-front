import {getAllLists, getList, updateList, deleteList, setList } from "./js/listService.js";
import { setToDo } from "./js/toDoService.js";

const listContainer = document.getElementById('list-container')

/**
 * Función inicializadora que muestra todos los heroes al cargar la página
 */
 document.addEventListener("DOMContentLoaded", getAllLists);

const listTrigger = document.getElementById('btn-add-task')
if (listTrigger) {
  listTrigger.addEventListener('click', () => {
    let cont = 0;
    setList("Ingrese el tíyulo de la lista"+ cont++)


    // listContainer.append(row('Nice, you triggered this alert message!', 'success'));
  })
}



document.addEventListener("click", (event) => {
    
    if (event.target.matches(".btn-close")) {

        let isDelete = confirm(`¿Desea eliminar este elemento?`);
        if (isDelete) {
            try {
                deleteList(event.target.parentNode.id)
            } catch (error) {
                let message = error.statusText || "Ocurrió un error al cargar";
                alert(`Error${error.status}: ${message}`);
            }
        }
    }

    if(event.target.matches("#title")){

        document.addEventListener("keypress", (key) => {
            if(key.charCode === 13){
                const id = event.target.parentNode.id;
                const title = event.target.value;
                updateList(id, title)
            }
            
        })    
    }

    if (event.target.matches(".btn-add-todo")) {
        setToDo( event.target.parentNode.id ,"Ingrese un To Do")

        console.log(event.target.parentNode.id)

    }

})






