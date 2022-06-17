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
                
                const ul = document.createElement('ul')
                const toDoList = list.toDos;
                
                toDoList.forEach((toDo) => {
                    const li = todoTrigger(toDo)
                    
                    ul.append(li);

                });

                const containerToDos = document.getElementById(`toDos-${list.id}`) 
                containerToDos.append(ul);
            })

        })
        // .catch((error) => {
        //     let message = error.statusText || "Ocurrió un error al cargar";
        //     alert(`Error ${error.status}: ${message}`);
        // })
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

    let res = await fetch(URL + id, options);

    if (!res.ok) throw new Error({ status: res.status, statusText: res.statusText });

    location.reload();
}




const row = (list, type = "success") => {
    const wrapper = document.createElement('div')
    wrapper.innerHTML = [
        `<div class="alert alert-${type} alert-dismissible" id="${list.id}" role="alert">`,
        `   <input type="text" id="title" name="title" class="border-0 bg-transparent" placeholder="${list.title}">`,
        '   <button type="button" class="btn-add-todo border-0 bg-transparent" "data-bs-dismiss="alert" aria-label="">&#10133</button>',
        '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
        `<div class="toDo" id="toDos-${list.id}"> </div>`,
        '</div>'
    ].join('')

    return wrapper;
}

const todoTrigger = (list, type = "success") => {
        const wrapper = document.createElement('li')
        wrapper.className = "list-group-item"
        wrapper.innerHTML = [
            `<div class="alert alert-${type} alert-dismissible border-0" id="todo-${list.id}" role="alert">`,
             `   <input class="form-check-input me-1" type="checkbox" id="${list.id}" aria-label="...">`,
             `   <input type="text" id="todo" name="todo" class="border-0 bg-transparent" placeholder="${list.toDo}">`,
             '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
            '</div>'
        ].join('')
    
        return wrapper;

};

export { getAllLists, getList, updateList, deleteList, setList};