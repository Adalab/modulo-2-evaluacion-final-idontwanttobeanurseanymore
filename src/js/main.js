'use strict';

const searchInput =  document.querySelector('.js_search_input');
const searchBtn =  document.querySelector('.js_search_btn');

const allTvShowsUl = document.querySelector('.js_results_ul');
const favTvShowsUl = document.querySelector('.js_fav_ul')
const oneTvShow = document.querySelector('.js_list')
const message = document.querySelector('.js_result_message')

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
    const name = oneTvShow.show.name 
    const id = oneTvShow.show.id
    const imgTvShow = oneTvShow.show.image ? `<img src=" ${oneTvShow.show.image.medium}">` : `<img src="https://placehold.co/210x295?text=No+Image+Available">`;
    const rate = oneTvShow.show.rating.average ? `★ ${oneTvShow.show.rating.average}` : `No rate available`
    const html = `
    <li class="list js_list ${favClass}" id="${id}"><h3 class="name">${name.slice(0, 20)}</h3>${imgTvShow}<h3 class="rate">${rate}</h3>
    </li> 
    `
    return html
}
function renderAllTvShows(tvShowsData){
    let html = "";
    for(const tvShow of tvShowsData){
        html += renderOneTvShow(tvShow)
    }
    if(!html){
        message.innerHTML = `We couldn't find ' ${searchInput.value} '`
    }else{
        message.innerHTML = `Your search: ' ${searchInput.value} '`
    }
    allTvShowsUl.innerHTML = html;
}
function renderAllFav(){
    let html = "";
    for (const tvShow of favTvShowsData){
        html += renderOneTvShow(tvShow);
    }
    favTvShowsUl.innerHTML = html;
}
function handleClickBtn(ev){
    ev.preventDefault();
    fetch(`https://api.tvmaze.com/search/shows?q=${searchInput.value}`)
    .then(res => res.json())
    .then(data => {
        tvShowsData = data
        renderAllTvShows(tvShowsData)
    })
}
function handleClickFav(ev){
    const clickedLi = ev.target.closest('.js_list');
    if (!clickedLi) return;
    const clickedId = parseInt(clickedLi.id);

    const clickedShow = tvShowsData.find(
        (eachObj) => eachObj.show.id === clickedId
    );
    const favIndex = favTvShowsData.findIndex(
        (eachObj) => eachObj.show.id === clickedShow.show.id
    );
    
    if (clickedShow){
        if (favIndex !== -1){
            favTvShowsData.splice(favIndex, 1)
        }else {
            favTvShowsData.push(clickedShow)
        }
    }
    localStorage.setItem("favs", JSON.stringify(favTvShowsData));
    clickedLi.classList.toggle('favourite');
    renderAllFav()
}
searchBtn.addEventListener('click', handleClickBtn)
allTvShowsUl.addEventListener('click', handleClickFav)

function retrieveData(){
    const tvShowsFromLS = JSON.parse(localStorage.getItem("cache"));
    if (tvShowsFromLS){
        tvShowsData = tvShowsFromLS
        renderAllTvShows(tvShowsData)
    }else {
        fetch(`api.tvmaze.com/search/shows?q=${searchInput.value}`)
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
