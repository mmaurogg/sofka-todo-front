import {getAllLists, getList, updateList, deleteList, setList, searchHeros} from "./js/services.js";

const listContainer = document.getElementById('list-container')

/**
 * Función inicializadora que muestra todos los heroes al cargar la página
 */
 document.addEventListener("DOMContentLoaded", getAllLists);

const listTrigger = document.getElementById('btn-add-task')
if (listTrigger) {
  listTrigger.addEventListener('click', () => {
    let cont = 0;
    setList("Add Title of the list"+ cont++)


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
})


// const toDoTrigger = document.getElementById('btn-add-ToDo')
// if (listTrigger) {
//   toDoTrigger.addEventListener('click', () => {
    

//       .append(row(id, 'Nice, you triggered this alert message!', 'success'));
//   })
// }



