const listContainer = document.getElementById('list-container')

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
                const newList = row(list);
                listContainer.append(newList);
                
                const ul = document.createElement('ul');

                list.toDos.forEach((toDo) => {
                    const li = todoTrigger(toDo, list.id)
                    ul.append(li);
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
    .catch((error) => {
        let message = error.statusText || "Ocurrió un error al cargar";
        alert(`Error ${error.status}: ${message}`);
    })
}

/**
 * Función para llenar el elemento lista
 * @param {*} list es la lista en formato json
 * @param {*} type es el tipo de alert o eviso para mostrar
 * @returns elementos html para insertar en el index
 */
const row = (list, type = "success") => {
    const wrapper = document.createElement('div')
    wrapper.innerHTML = [
        `<div class="alert alert-${type} alert-dismissible" id="${list.id}" role="alert">`,
        `   <input type="text" id="title" name="title" class="border-0 bg-transparent w-75" placeholder="${list.title}">`,
        '   <button type="button" class="btn-add-todo border-0 bg-transparent float-end" "data-bs-dismiss="alert" aria-label="">&#10133</button>',
        '   <button type="button" class="btn-close" id="btn-delete-list" aria-label="Close"></button>',
        `<div class="toDo" id="toDos-${list.id}"> </div>`,
        '</div>'
    ].join('')

    return wrapper;
}

/**
 * unción para llenar el elemento To Do dentro de una lista
 * @param {*} toDo Título de la tarea en formato string
 * @param {*} listId lista a la cual pertenece el To Do
 * @param {*} type es el tipo de alert o eviso para mostrar
 * @returns elementos html para insertar en el index
 */
const todoTrigger = (toDo, listId, type = "success") => {
        const wrapper = document.createElement('li')
        wrapper.className = "list-group-item"
        wrapper.innerHTML = [
            `<form class="alert alert-${type} alert-dismissible border-0 " id="${listId}" role="alert">`,
            `   <input class="checkbox" type="checkbox" name="finish" id="check-${toDo.id}" value="done">`,
            `   <input type="text" id="${toDo.id}" name="todo" class="toDo border-0 bg-transparent w-75" placeholder="${toDo.toDo}">`,
            `   <button type="button" class="btn-delete-toDo btn-close" id="${toDo.id}" aria-label="Close"></button>`,
            '</form>'
        ].join('')
    
        return wrapper;

};

export { getAllLists, getList, updateList, deleteList, setList};