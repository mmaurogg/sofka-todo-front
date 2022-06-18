const listContainer = document.getElementById('list-container');
const templateList = document.querySelector("#list-template").content;
const templateToDo = document.querySelector("#toDo-template").content;
const fragment = document.createDocumentFragment();

const URL = "http://localhost:8080/list/";

/**
 * Método para descargar y mostrar en la página la informacion de las listas de la API
 */
const getAllLists = async () => {
    await fetch(URL)
        .then((res) => {
            return (res.ok) ? res.json() : Promise.reject(res);
        })
        .then((json) => {
            console.log(json);

            json.forEach((list) => {
                let clone = document.importNode(row(list),true);
                fragment.append(clone);
                listContainer.append(fragment);
                
                const ul = document.createElement('ul');

                list.toDos.forEach((toDo) => {
                    let clone2 = document.importNode(todoTrigger(toDo, list.id),true);
                    fragment.append(clone2);
                    ul.append(fragment);
                });

                const containerToDos = document.getElementById(`toDos-${list.id}`) 
                containerToDos.append(ul);
            })

        })
        .catch((error) => {
            let message = error.statusText || "Ocurrió un error al cargar";
            alert(`Error ${error.status}: ${message}`);
        })
}

/**
 * Método para descargar y mostrar en la página la informacion de una lista de la API
 * @param {*} id numero identificador id del heroe buscado
 */
const getList = async (id) => {
    await fetch(URL + id)
        .then((res) => {
            return (res.ok) ? res.json() : Promise.reject(res);
        })
    .catch((error) => {
        let message = error.statusText || "Ocurrió un error al cargar";
        alert(`Error ${error.status}: ${message}`);
    })
}

/**
 * Método para borrar una lista de la API
 * @param {*} id numero identificador id de la lista buscada
 */
const deleteList = async (id) => {
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
 * Método añadir una lista nuevo a la API
 * @param {*} list información de la lista en formato json
 */
const setList = async (title) => {
    let options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify({
            title: title
        })
    }

    await fetch(URL, options)
        .then((response) => response.json())
        .then((response) => {
            console.log(response.id);
            const newList = row(response.id, title);
            listContainer.append(newList);

        })
        .catch((error) => {
            let message = error.statusText || "Ocurrió un error al cargar";
            alert(`Error ${error.status}: ${message}`);
        })

    location.reload();
}


/**
 * Método para actualziar la lista en la API
 * @param {*} list información la lista en formato json
 */
const updateList = async (id, title) => {

    let options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify({
            title: title
        })
    }

    await fetch(URL + id, options)

    location.reload();

}

/**
 * Función para llenar el elemento lista
 * @param {*} list es la lista en formato json
 * @returns elementos html del template para insertar en el index
 */
const row = (list) => {
    
    templateList.querySelector("#title").placeholder = list.title || "Ingrese una tarea";
    templateList.querySelector(".toDo").id = "toDos-"+list.id;
    templateList.querySelector(".alert").id = list.id;

    return templateList;
}

/**
 * unción para llenar el elemento To Do dentro de una lista
 * @param {*} toDo Título de la tarea en formato string
 * @param {*} listId lista a la cual pertenece el To Do
 * @returns elementos html del template para insertar en el index
 */
const todoTrigger = (toDo, listId,) =>{
    templateToDo.querySelector("form").id = listId;
    templateToDo.querySelector(".checkbox").id = "check-"+toDo.id;
    templateToDo.querySelector(".toDo").id = toDo.id;
    templateToDo.querySelector(".toDo").placeholder = toDo.toDo;
    templateToDo.querySelector(".btn-close").id = toDo.id;

    return templateToDo;
}

export { getAllLists, getList, updateList, deleteList, setList};



