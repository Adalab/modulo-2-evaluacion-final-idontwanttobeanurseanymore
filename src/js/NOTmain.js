'use strict';
//User -> Input -> click -> renderShows() -> API -> renderAllShows()



//3. Mostrar  -> renderShows(data){x.innerHTML + loop}
//4. x.eventListener('click', (ev) => {
//  ev.preventDefault()
//  const searchInputValue = searchInput.value
//  renderAllShows(searchInputValue)
//})

//1. HTML -> JS (querySelector())
const mainPage = document.querySelector('.js_main_page');
const searchInput =  document.querySelector('.js_search_input');
const searchBtn =  document.querySelector('.js_search_btn');
const cardResults = document.querySelector('.js_card_results')

//2. Llamar al API -> function + fetch + renderShows()
//LLAMA AL HACER CLICK
searchBtn.addEventListener('click', (ev) => {
    ev.preventDefault();
    const userSearch = searchInput.value;
    retrieveData(userSearch);
    
})
function renderAllTvShows(tvShowsData){
    let html = ''
    for(oneTvShow of tvShowsData){
        html += 
            `<li><h3>${oneTvShow.show.name}</h3>
            <img src="${oneTvShow.show.image.medium}"> 
            </li>` //si no hay: placeholder.com (condicional ternario???)
    }
    cardResults.innerHTML = html //Pintar en cards
}
//createElement()
/*
const favCard = document.createElement('div')
const favCardText = favCard.Card.createTextNode(`${}`);
favCard.appendChild(favCardText)*/
//LET

let tvShowsData = []
let favTvShowsData = []
//.includes(valor del input)
//FUNCTIONS




function renderAllData(){
    html += renderOnetvShowData(onetvshow)

}




/*



*/

//LS
function retrieveData(){
    const tvShowsFromLS = JSON.parse(localStorage.getItem("cache"));
    if(tvShowsData = tvShowsFromLS){
        //Si hay datos, pintalos
    }else{
        renderAllData(tvShowsData)
        fetch('https://api.tvmaze.com/search/shows?q=girls')
    .then(res => res.json())
    .then(data =>{
        //devuelve un obj!!
        //asignar variable
        //tvShowsData = data
        localStorage.setItem("cache", JSON.stringify(tvShowsData));
        renderAllData(tvShowsData)
    })
    }
}
retrieveData();
// SECCIÓN DE ACCIONES AL CARGAR LA PÁGINA

//   - Pedir datos al servidor
//   - Render elementos
