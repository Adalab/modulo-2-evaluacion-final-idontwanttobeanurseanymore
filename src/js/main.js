'use strict';

const searchInput =  document.querySelector('.js_search_input');
const searchBtn =  document.querySelector('.js_search_btn');

const allTvShows = document.querySelector('.js_results_ul');
const favTvShows = document.querySelector('.js_fav_ul')
const oneTvShow = document.querySelector('.js_card_li')

let tvShowsData = []
let favTvShowsData = []

function retrieveFavs(){
    const favTvShowsFromLS = JSON.parse(localStorage.getItem("favs"));
    if (favTvShowsFromLS){
        favTvShowsData = favTvShowsFromLS
        renderAllFav()
    }
}
function renderOneTvShow(oneTvShow){
    const favIndex = favTvShowsData.findIndex(
        (eachObj) => eachObj.show.id === oneTvShow.show.id)
    const favClass = favIndex !== -1 ? "favourite" : ""

    const imgTvShow = oneTvShow.show.image ? `<img src=" ${oneTvShow.show.image.medium}">` : `<img src="https://placehold.co/210x295/f5f5f5/666666/?text=No\nImage\nAvailable">`;

    const html = `
    <li class="card_li js_card_li ${favClass}" id="${oneTvShow.show.id}"><h3>${oneTvShow.show.name}</h3>${imgTvShow}
    </li> 
    `
    return html
}
function renderAllTvShows(tvShowsData){
    let html = "";
    for(const tvShow of tvShowsData){
        html += renderOneTvShow(tvShow)
    }
    allTvShows.innerHTML = html;
}
function renderAllFav(){
    let html = "";
    for (const tvShow of favTvShowsData){
        html += renderOneTvShow(tvShow);
    }
    favTvShows.innerHTML = html;
}
function handleClickBtn(ev){
    ev.preventDefault();
    fetch(`https://api.tvmaze.com/search/shows?q=${searchInput.value}`)
    .then(res => res.json())
    .then(data => {
        tvShowsData = data
        renderAllTvShows(tvShowsData)
    }) //fetch busca según el input y almacena el resultado 
        //el resultado es el argumento que le pasamos al render
}
function handleClickFav(ev){
    const clickedLi = ev.target.closest('.js_card_li');
    const clickedId = parseInt(clickedLi.id);
    const clickedShow = tvShowsData.find(
        (eachObj) => eachObj.show.id === clickedId);
   
    if (clickedShow !== undefined){
        const favIndex = favTvShowsData.findIndex(
            (eachObj) => eachObj.show.id === clickedShow.show.id)
        if (favIndex !== -1){
            favTvShowsData.splice(favIndex, 1)
        }else {
            favTvShowsData.push(clickedShow)
        }
        localStorage.setItem("favs", JSON.stringify(favTvShowsData));
        clickedLi.classList.toggle('favourite');
        renderAllFav()
    }
}
searchBtn.addEventListener('click', handleClickBtn)
allTvShows.addEventListener('click', handleClickFav)

function retrieveData(){
    const tvShowsFromLS = JSON.parse(localStorage.getItem("cache"));
    if (tvShowsFromLS){
        tvShowsData = tvShowsFromLS
        renderAllTvShows(tvShowsData)
    }else {
        fetch(`api.tvmaze.com/search/shows?q=girls`)
        .then(res => res.json())
        .then(data => {
            tvShowsData = data
            localStorage.setItem("cache", JSON.stringify(tvShowsData));
            renderAllTvShows(tvShowsData)
        })
    }
}

retrieveFavs()
retrieveData();