'use strict';
//User -> Input -> click -> renderShows() -> API -> renderAllShows()

//1. HTML -> JS (querySelector())
//2. Llamar al API -> function + fetch + renderShows()
//3. Mostrar  -> renderShows(data){x.innerHTML + loop}
//4. x.eventListener('click', (ev) => {
//  ev.preventDefault()
//  const searchInputValue = searchInput.value
//  renderAllShows(searchInputValue)
//})
//CONST
const mainPage = document.querySelector('.js_main_page');
const searchInput =  document.querySelector('.js_search_input');
const searchBtn =  document.querySelector('.js_search_btn');
const cardResults = document.querySelector('.js_card_results')
//createElement()
/*
const favCard = document.createElement('div')
const favCardText = favCard.Card.createTextNode(`${}`);
favCard.appendChild(favCardText)*/
//LET

let tvShowsData = []

//FUNCTIONS
function renderTvShows(){
    let html = ''
    for(tvShow of tvShowsData){
        html += 
            `<li><h3>${oneTvShow.show.name}</h3>
            <img src="${oneTvShow.image.medium}"> 
            </li>` //si no hay: placeholder.com (condicional ternario???)
    }
    cardResults.innerHTML = html
}
//LOOPS

//FUNCTIONS (EVENTS)

//FUNCTIONS (RENDER)
function renderAllData(){
    html += renderOnetvShowData(onetvshow)
}
function searchShows(){
    if(tvShowsData){
    fetch('https://api.tvmaze.com/search/shows?q=girls')
    .then(res => res.json())
    .then(data =>{
        renderAllData(tvShowsData);
        //devuelve un obj!!
        //asignar variable
        //tvShowsData = data
    })
}
}
//EVENTS
searchBtn.addEventListener('click', (ev) => {
    ev.preventDefault();
    const userSearch = searchInput.value;
    searchShows(userSearch);
    
})

//FETCH

//CARGAR LS
// Si tenemos LS, no hagas Fetch()
/*



*/

//LS
function retrieveData(){
    const tvShowsFromLS = JSON.parse(localStorage.getItem("cache"));
    if(tvShowFromLs){
        tvShowData = tvShowsFromLS;
    }else{
        renderAllData
        fetch('https://api.tvmaze.com/search/shows?q=girls')
    .then(res => res.json())
    .then(data =>{
        //devuelve un obj!!
        //asignar variable
        //tvShowsData = data
        //localStorage.setItem("cache", JSON.stringify(tvShowsData));
        renderAllTvShows(tvShowsData)
    })
    }
}
retrieveData();
// SECCIÓN DE ACCIONES AL CARGAR LA PÁGINA

//   - Pedir datos al servidor
//   - Render elementos