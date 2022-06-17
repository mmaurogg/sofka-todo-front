const listContainer = document.getElementById('list-container')

const URL = "http://localhost:8080/list/";
let arrList = [];
let listFilter = [];

/**
 * Método para descargar y mostrar en la página la informacion de las listas de la API
 */
const getAllLists = async () => {
    await fetch(URL)
    .then((res) => {
        return (res.ok)?res.json():Promise.reject(res);
    })
    .then((json) => {
        arrList = json;

        json.forEach((list) => {
            const newList = row(list.id, list.title);
            listContainer.append(newList);
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
const getList = async (id)=> {
    await fetch(URL+id)
    .then((res) => {
        return (res.ok)?res.json():Promise.reject(res);
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
    
    let res = await fetch(URL+id, options)
    .catch((error) => {
        let message = error.statusText || "Ocurrió un error al cargar";
        alert(`Error ${error.status}: ${message}`);
    });
    
    if(!res.ok) throw new Error({ status: res.status, statusText: res.statusText});
    
    location.reload();

}

/**
 * Método añadir una lista nuevo a la API
 * @param {*} list información de la lista en formato json
 */
const setList = async  (title) => {
    let options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify({
            title: title
        })
    }
    
    let res = await fetch(URL, options)
        .then((response) => response.json())
        .then((response) => {
            console.log( response.id );
            const newList = row(response.id, title);
            listContainer.append(newList);

            })
        .catch((error) => {
            let message = error.statusText || "Ocurrió un error al cargar";
            alert(`Error ${error.status}: ${message}`);
        })
        
    //location.reload();
}


/**
 * Método para actualziar la lista en la API
 * @param {*} list información la lista en formato json
 */
const updateList = async (id, title) => {

    let options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify({
            title: title
        })
    }
    
    let res = await fetch(URL+id, options);
    
    if(!res.ok) throw new Error({ status: res.status, statusText: res.statusText});

    location.reload();
}



const row = (id, message, type = "success" ) => {
    const wrapper = document.createElement('div')
    wrapper.innerHTML = [
      `<div class="alert alert-${type} alert-dismissible" id="${id}" role="alert">`,
      `   <input type="text" id="title" name="title" class="border-0 bg-transparent" placeholder="${message}">`,
      '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
      '</div>'
    ].join('')
  
    return wrapper;
  }



//-------------------------------------
/**
 * Método para buscar y mostrar en la página un heroe de la API
 * @param {*} search palabra buscada en la información de heroes
 */
const searchHeros = (search) => {

    filtrarHeroes(search);

    const cards = buildPage(listFilter)
    console.log(cards);
    document.getElementById("search").replaceChildren(cards);
    console.log(listFilter);

}

/**
 * Método para filtrar los heroes de la API y agregarlos en el array de listFilter
 * @param {*} search palabra buscada en la información de heroes
 */
const filtrarHeroes = (search) => {

    listFilter = [];
    search = search.toLocaleLowerCase();

    arrList.forEach(element => {
        const aliasLower = element.alias.toLocaleLowerCase();
        const nameLower = element.name.toLocaleLowerCase();

        if (aliasLower.indexOf(search) >= 0 || nameLower.indexOf(search) >= 0) {
            listFilter.push(element);
        }
    });
}




/**
 * Método para construir los elementos html dle heroe para mostrar en la página
 * @param {*} heros array compuesta por varios heroes
 * @returns elementos html de heroes para ser agregados a un elemento en la página
 */
let buildPage = (heros) => {

    const unknownImage = "https://cdn-icons-png.flaticon.com/512/149/149071.png";

    heros.forEach(element => { 
        template.getElementById("alias").textContent = element.alias;
        template.getElementById("name").textContent = element.name;
        template.getElementById("power").textContent = element.power;
        template.getElementById("isAlive").textContent = "pendiente";
        template.getElementById("link").src = element.link || unknownImage;
        
        template.getElementById("edit").dataset.alias = element.alias;
        template.getElementById("edit").dataset.name = element.name;
        template.getElementById("edit").dataset.power = element.power;
        template.getElementById("edit").dataset.isAlive = element.isAlive;
        template.getElementById("edit").dataset.id = element.id;
        template.getElementById("edit").dataset.link = element.link;
        
        template.getElementById("delete").dataset.value = element.id;

        let clone = document.importNode(template,true);
        fragment.append(clone);
    });

    const cards = document.createElement("div");
    cards.className = "row row-cols-1 row-cols-md-3 g-4";
    cards.id = "cards";

    cards.append(fragment);
    
    return cards;
}

export {getAllLists, getList, updateList, deleteList, setList, searchHeros};