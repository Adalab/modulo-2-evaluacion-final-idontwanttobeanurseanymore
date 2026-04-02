'use strict';
//User -> Input -> click -> renderShows() -> API -> renderAllShows()


//1. HTML -> JS (querySelector())
const mainPage = document.querySelector('.js_main_page');
const searchInput =  document.querySelector('.js_search_input');
const searchBtn =  document.querySelector('.js_search_btn');
const allTvShows = document.querySelector('.js_card_results');
const oneTvShow = document.querySelector('.js_card')

let tvShowsData = []
let favTvShowsData = []
//2. Llamar al API -> function + fetch + renderShows()
//LLAMA AL HACER CLICK

function handleClickBtn(ev){
    ev.preventDefault();
    fetch(`https://api.tvmaze.com/search/shows?q=${searchInput.value}`)
    .then(res => res.json())
    .then(data => {
        console.log(data)
        const searchedTvShows = data.show
        renderAllTvShows(searchedTvShows)
    }) //fetch busca según el input y almacena el resultado 
        //el resultado es el argumento que le pasamos a la funcion que pinta
}
searchBtn.addEventListener('click', handleClickBtn)
//al hacer click, llama a la función que hace fetch

function handleClickFav(ev){
    console.log(ev.currentTarget)
    const clickedTvShowId = ev.currentTarget.show.id;
    //id del show clicked
    const clickedTvShow = tvShowsData.find(
        (eachShow) => eachShow.id === clickedTvShowId);
        //"iguala" el id al show
    if(clickedTvShowId !== undefined){ //si existe
        const favIndex = favTvShowsData.findIndex((eachShow) => eachShow.id === clickedTvShow.id) //buscalo
    
    if(favIndex !== -1){  //si ya está, "córtalo"
        favTvShowsData.splice(favIndex, 1)
    }else{ //si no está, "pushealo"
        favTvShowsData.push(clickedTvShow)
    }
    localStorage.setItem("favs", JSON.stringify(favTvShowsData))
    renderAllTvShows(tvShowsData)
    //renderAllFavourites() - función para pintar los favs
}}

function renderOneTvShow(oneTvShow){
    const favIndex = favTvShowsData.findIndex((eachFavShow) => eachFavShow.id === oneTvShow.id)
    const favClass = favIndex !== -1 ? "favourite" : ""
    const html = `
    <li class="" id=""><h3></h3>
    <u
    `
}


/*
function renderAllTvShows(tvShowsData){
    //1 función que haga todo o una función que llame a 2 funciones??
    let html = '';
    for(const tvShow of tvShowsData){
        html +=
            `<li><h3>${tvShow.show.name}</h3>
            <img src="${tvShow.show.image.medium}"> 
            </li>` //si no hay: placeholder.com (condicional ternario???)
    }
} //allTvShows.innerHTML = html
 */