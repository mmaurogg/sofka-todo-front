const listContainer = document.getElementById('list-container')

const URL = "http://localhost:8080/todo/";
let arrList = [];
let listFilter = [];

/**
 * Método para descargar y mostrar en la página la informacion de las listas de la API
 */
const getAllLists = async () => {
    await fetch(URL)
        .then((res) => {
            return (res.ok) ? res.json() : Promise.reject(res);
        })
        .then((json) => {
            arrList = json;

            json.forEach((list) => {
                const newToDo = row(list.id, list.title);
                listContainer.append(newToDo);
            })

            // const container = document.getElementById(`toDos-${idList}`)
            // const newToDo = row(response.id, toDo);
            // const ul = document.createElement('ul').appendChild(newToDo);

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
    // .then((json) =>{

    //     buildPage(json)
    // })
    // .catch((error) => {
    //     let message = error.statusText || "Ocurrió un error al cargar";
    //     alert(`Error ${error.status}: ${message}`);
    // })
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

    let res = await fetch(URL + id, options)
        .catch((error) => {
            let message = error.statusText || "Ocurrió un error al cargar";
            alert(`Error ${error.status}: ${message}`);
        });

    //if (!res.ok) throw new Error({ status: res.status, statusText: res.statusText });

    location.reload();

}

/**
 * Método añadir un To Do nuevo a la API
 * @param {*} toDo información de el To Do en formato json
 */
const setToDo = async (idList, toDo) => {

    const container = document.getElementById(`toDos-${idList}`)

    let options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify({
            idList: idList,
            toDo: toDo
        })
    }

    await fetch(URL, options)
        .then((response) => response.json())
        .then((response) => {
            console.log(response);
            const newToDo = row(response.id, toDo);
            const ul = document.createElement('ul').appendChild(newToDo);

            container.append(ul);

        })
        // .catch((error) => {
        //     let message = error.statusText || "Ocurrió un error al cargar";
        //     alert(`Error ${error.status}: ${message}`);
        // })

    //location.reload();
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

    let res = await fetch(URL + id, options);

    if (!res.ok) throw new Error({ status: res.status, statusText: res.statusText });

    location.reload();
}



const row = (id, message, type = "success") => {
    const wrapper = document.createElement('li')
    wrapper.className = "list-group-item"
    wrapper.innerHTML = [
        `<div class="alert alert-${type} alert-dismissible border-0" id="todo-${id}" role="alert">`,
         `   <input class="form-check-input me-1" type="checkbox" id="${id}" aria-label="...">`,
         `   <input type="text" id="todo" name="todo" class="border-0 bg-transparent" placeholder="${message}">`,
         '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
        '</div>'
    ].join('')

    return wrapper;
}


export { getAllLists, getList, updateList, deleteList, setToDo};