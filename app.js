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
    fetch(urlCharacter)
        .then(respuesta => respuesta.json())
        .then(personaje => {
            //TODO: Implementar Modal con info del personaje
            console.log(personaje);
            alert(personaje.name);
        });
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

const creaCard = (personaje) => {
    const card = document.createElement('div');
    card.style = 'float: left;';
    const html = `
    <div class="card m-2" style="width: 18rem; ">
        <img loading="lazy" src="${personaje.image}" class="card-img-top" alt="...">
        <div class="card-body">
        <h5 class="card-title">${personaje.name}</h5>
        <p class="card-text">${personaje.status}</p>
        <button class="btn btn-primary btn-block" data-id="${personaje.id}">Ver Más</button>
        </div>
    </div>`;
    card.innerHTML = html;
  return card;
}