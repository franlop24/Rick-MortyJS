const urlBase = 'https://rickandmortyapi.com/api/character/';

const loadData = (url, page = 1) => {
    url += `?page=${page}`
    fetch(url)
    .then(respuesta => respuesta.json())
    .then(respJson => {
        const info = respJson.info;
        const personajes = respJson.results;
        //console.log(info.next);
        //console.log(info.prev);
        //creaButtons();
        if(!info.prev){
            document.querySelector('#prev').classList.add('disabled')
        } else {
            document.querySelector('#prev').classList.remove('disabled')
            document.querySelector('#prev').setAttribute('data-id', Number(page) - 1)
        }
        if(!info.next){
            document.querySelector('#next').classList.add('disabled')
        } else {
            document.querySelector('#next').classList.remove('disabled')
            document.querySelector('#next').setAttribute('data-id', Number(page) + 1)
        }
        console.log(personajes);
        showCharacters(personajes);
    })
}



const loadCharacterInfo = (url, id) => {
    let urlCharacter = `${url}${id}`;
    console.log(urlCharacter);
    const modalContent = document.querySelector('.modal-body');
    modalContent.removeChild(modalContent.firstChild);
    modalContent.appendChild(spinner());
    setTimeout(() => {
        fetch(urlCharacter)
        .then(respuesta => respuesta.json())
        .then(personaje => {
            //TODO: Implementar Modal con info del personaje
            modalContent.removeChild(modalContent.firstChild);
            document.querySelector('.modal-title').innerText = personaje.name;
            modalContent.appendChild(modalBody(personaje));
        });
    }, 2000);
}

const modalBody = (personaje) => {
    const div = document.createElement('div');
    const origen = personaje.origin.name;
    const location = personaje.location.name;
    const episodes = personaje.episode.length;
    let html = '';
    html += origen === 'unknown'? `<h4>Se desconoce su origen</h4>`:
                        `<h4>Viene de ${origen}</h4>`;
    html += `<h4>Se encuentra en ${location}</h4>`;
    html += `<img src="${personaje.image}" class="rounded mx-auto d-block">`;
    html += `<p>Aparece en ${episodes} episodios</p>`;
    div.innerHTML = html;
    return div;
}

const showModal = (e) => {
    e.preventDefault();
    if(e.target.classList.contains('btn')){
        let id = e.target.getAttribute('data-id');
        loadCharacterInfo(urlBase, id);
    }
}

document.querySelector('#respuesta').addEventListener('click', showModal);

const navegacion = (e) => {
    e.preventDefault();
    if(e.target.classList.contains('btn')){
        let page = e.target.getAttribute('data-id');
        loadData(urlBase, page);
    }
}

loadData(urlBase);

document.querySelector('.botones').addEventListener('click', navegacion);

const showCharacters = (personajes) => {
    const contenedorRespuesta = document.querySelector('#respuesta');
    while(contenedorRespuesta.firstChild){
        contenedorRespuesta.removeChild(contenedorRespuesta.firstChild);
    }
    personajes.forEach(personaje => {
        contenedorRespuesta.appendChild(creaCard(personaje));
    })
}

const spinner = () => {
    const div = document.createElement('div');
    const html = 
    `<div class="d-flex justify-content-center">
        <div class="spinner-border text-info" role="status">
        <span class="visually-hidden">Loading...</span>
        </div>
    </div>`;
    div.innerHTML = html;
    return div;
}

const creaCard = (personaje) => {
    const card = document.createElement('div');
    card.style = 'float: left;';
    const html = `
    <div class="card m-2" style="width: 18rem; ">
        <img loading="lazy" src="${personaje.image}" class="card-img-top" alt="...">
        <div class="card-body">
        <h5 class="card-title">${personaje.name}</h5>
        <p class="card-text">${personaje.status}</p>
        <button 
            class="btn btn-primary btn-block" 
            data-id="${personaje.id}"
            data-bs-toggle="modal" 
            data-bs-target="#exampleModal">Ver Más</button>
        </div>
    </div>`;
    card.innerHTML = html;
  return card;
}