const urlBase = 'https://rickandmortyapi.com/api/character/';

const loadData = (url, page = 1) => {
    url += `?page=${page}`
    fetch(url)
    .then(respuesta => respuesta.json())
    .then(respJson => {
        const info = respJson.info;
        const personajes = respJson.results;
        console.log(info.next);
        console.log(info.prev);
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
        <img src="${personaje.image}" class="card-img-top" alt="...">
        <div class="card-body">
        <h5 class="card-title">${personaje.name}</h5>
        <p class="card-text">${personaje.status}</p>
        <a href="#" class="btn btn-primary">Go somewhere</a>
        </div>
    </div>`;
    card.innerHTML = html;
  return card;
}

// const creaButtons = () => {
//     const contenedorButtons = document.querySelector('#botones');
//     contenedorButtons.innerText = '';
//     const btnPrev = document.createElement('button');
//     btnPrev.id = 'prev';
//     btnPrev.className = 'btn btn-success btn-lg mx-3';
//     btnPrev.innerText = 'Anterior';
//     contenedorButtons.appendChild(btnPrev);
//     const btnNext = document.createElement('button');
//     btnNext.id = 'next';
//     btnNext.className = 'btn btn-success btn-lg mx-3';
//     btnNext.innerText = 'Siguiente';
//     contenedorButtons.appendChild(btnNext);
// }