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
const tvShow = {
    "score": 0.9074273,
    "show": ({
      "id": 139,
      "url": "https://www.tvmaze.com/shows/139/girls",
      "name": "Girls",
      "type": "Scripted",
      "language": "English",
      "genres": [
        "Drama",
        "Romance"
      ],
    })};

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
const html = ``
for(tvShow of tvShowsData){
    html += `${tvShow.show.name} ${tvShow.show.image}`
    cardResults = html
}

//EVENTS
searchBtn.addEventListener('click', () => {

})
//FETCH

//CARGAR LS
// Si tenemos LS, no hagas Fetch()
/*



*/

//LS