const listContainer = document.getElementById('list-container')

const URL = "http://localhost:8080/todo/";

/**
 * Método para borrar un To Do de la API
 * @param {*} id numero identificador id del ToDo buscado
 */
const deleteToDo = async (id) => {
    let options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json; charset=utf-8'
        },
    }

    await fetch(URL + id, options)
        .catch((error) => {
            let message = error.statusText || "Ocurrió un error al cargar";
            alert(`Error ${error.status}: ${message}`);
        });

    location.reload();

}

/**
 * Método añadir un To Do nuevo a la API
 * @param {*} idList numero identificador d ela lista
 * @param {*} toDo Texto d ela tarea a realziar
 * @param {*} finish Booleano que confirma si la tarea está finalizada
 */
const setToDo = async (idList, toDo) => {

    let options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify({
            idList: idList,
            toDo: toDo,

        })
    }

    await fetch(URL, options)
        .then((response) => response.json())
        .catch((error) => {
            let message = error.statusText || "Ocurrió un error al cargar";
            alert(`Error ${error.status}: ${message}`);
        })

    location.reload();
}


/**
 * Método para actualziar el To Do en la API
 * @param {*} list información del To Do en formato json
 */
const updateToDo = async (id, listId, title, finish) => {
    console.log("hola");
    let options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify({
            idList: listId,
            toDo: title,
            finish: finish
            
        })
    }

    await fetch(URL + id, options)


    location.reload();
}


export { updateToDo, deleteToDo, setToDo};