'use strict';
//CONST
const mainPage = document.querySelector('.js_main_page');
const searchInput =  document.querySelector('.js_search_input');
const searchBtn =  document.querySelector('.js_search_btn');
const cardResults = document.querySelector('.js_card_results')
//createElement()
const favCard = document.createElement('div')
const favCardText = favCard.Card.createTextNode(`${}`);
favCard.appendChild(favCardText)
//LET

let tvShowsData = []
if(tvShowsData){
    fetch('https://api.tvmaze.com/search/shows?q=girls')
    .then(res => res.json())
    .then(data =>{
        //devuelve un obj!!
        //asignar variable
    })
}
//FUNCTIONS
//LOOPS
const html = ''
for(tvShow of tvShowsData){
    html += 
        `<li><h3>${oneTvShow.show.name}</h3>
        <img src="${oneTvShow.image.medium}"> 
        </li>` //si no hay: placeholder.com (condicional ternario???)
}
cardResults.innerHTML = html
//FUNCTIONS (EVENTS)

//FUNCTIONS (RENDER)
//EVENTS
searchBtn.addEventListener('click', () => {

})

//FETCH

//CARGAR LS
// Si tenemos LS, no hagas Fetch()
/*



*/

//LS

// SECCIÓN DE ACCIONES AL CARGAR LA PÁGINA

//   - Pedir datos al servidor
//   - Render elementos