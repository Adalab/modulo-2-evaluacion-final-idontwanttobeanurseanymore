'use strict';

const searchInput =  document.querySelector('.js_search_input');
const searchBtn =  document.querySelector('.js_search_btn');
const removeAllBtn = document.querySelector('.js_remove_all_btn');

const allTvShowsUl = document.querySelector('.js_results_ul');
const favTvShowsUl = document.querySelector('.js_fav_ul')


const message = document.querySelector('.js_result_message')
const favMessage = document.querySelector('.js_fav_message')

let tvShowsData = []
let favTvShowsData = []

function retrieveFavs(){
    const favTvShowsFromLS = JSON.parse(localStorage.getItem("favs"));
    if (favTvShowsFromLS){
        favTvShowsData = favTvShowsFromLS
        renderAllFav()
    }
}
//RENDER
function renderOneTvShow(oneTvShow){
    const name = oneTvShow.show.name;
    const genre = oneTvShow.show.genres
    const id = oneTvShow.show.id;
    const imgTvShow = oneTvShow.show.image ? `<img src=" ${oneTvShow.show.image.medium}">` : `<img src="https://placehold.co/210x295?text=No+Image+Available">`;
    const rate = oneTvShow.show.rating.average ? `★ ${oneTvShow.show.rating.average}` : `No rate available`;
    let genrehtml = ''
    for(const oneGenre of genre){
        genrehtml += `
        <li> ${oneGenre}
        </li>
        `
    }
    const html = `
    <li class="list js_list" id="${id}" style="background-color: ${
            favTvShowsData.some(show => show.show.id === id) ? 'pink' : ''
        }"><button class="remove_btn js_remove_btn">X</button><ul class="genreUl js_genreUl">${genrehtml}</ul><button class="genre js_genre_btn"></button><h3 class="name">${name.slice(0, 20)}</h3>${imgTvShow}<h3 class="rate">${rate}</h3>
    </li> 
    `
    return html
}

function clickGenre(){

}
const genreBtn = document.querySelector('.js_genre_btn');




function renderAllTvShows(tvShowsData){
    let html = "";
    for(const tvShow of tvShowsData){
        html += renderOneTvShow(tvShow)
    }
    if(!searchInput.value){
        message.textContent = ""
    }else if(!html){
        message.textContent = `We couldn't find ' ${searchInput.value} '`
    }else{
        message.textContent = `Your search: ' ${searchInput.value} '`
    }
    allTvShowsUl.innerHTML = html;
}
function renderAllFav(){
    let html = "";
    for (const tvShow of favTvShowsData){
        html += renderOneTvShow(tvShow);
    }
    favTvShowsUl.innerHTML = html;

    if (favTvShowsData.length > 0){
        favMessage.textContent = "Your ♥ shows:";
        favMessage.style.display = "block";
        removeAllBtn.style.display = "block";
    }else{
        favMessage.textContent = "There's no ♥ yet";
        removeAllBtn.style.display = "none";
    }
}
//HANDLE
function handleClickBtn(ev){
    ev.preventDefault();
    fetch(`https://api.tvmaze.com/search/shows?q=${searchInput.value}`)
    .then(res => res.json())
    .then(data => {
        tvShowsData = data
        localStorage.setItem("cache", JSON.stringify(tvShowsData));
        renderAllTvShows(tvShowsData)
    })
}
function handleClickFav(ev){
    const clickedLi = ev.target.closest('.js_list');
    if (!clickedLi) return;
    
    const clickedId = parseInt(clickedLi.id);

    if (ev.target.classList.contains('js_remove_btn')){
        const favIndex = favTvShowsData.findIndex(
            (eachObj) => eachObj.show.id === clickedId
        );

        if (favIndex !== -1){
            favTvShowsData.splice(favIndex, 1)
            localStorage.setItem("favs", JSON.stringify(favTvShowsData));
        }
        renderAllTvShows(tvShowsData);
        renderAllFav();
        return;
    }
    if (ev.target.classList.contains('js_genre_btn')){
        
    }
    const clickedShow = tvShowsData.find(show => show.show.id === clickedId);
    if (!clickedShow) return;
    
    const favIndex = favTvShowsData.findIndex(show => show.show.id === clickedId);

    if (favIndex === -1) {
        favTvShowsData.push(clickedShow); 
        localStorage.setItem("favs", JSON.stringify(favTvShowsData));
        renderAllTvShows(tvShowsData);
        renderAllFav();
    }
}
//REMOVE ALL
function removeAll(){
        favTvShowsData = []
        localStorage.setItem("favs", JSON.stringify(favTvShowsData));
        
        renderAllTvShows(tvShowsData);
        renderAllFav();
}
//RETRIEVE
function retrieveData(){
    const data = localStorage.getItem("cache");
    if (data && data !== "undefined"){
        tvShowsData = JSON.parse(data)
    }else if (searchInput.value) {
        fetch(`https://api.tvmaze.com/search/shows?q=${searchInput.value}`)
        .then(res => res.json())
        .then(data => {
            tvShowsData = data
            localStorage.setItem("cache", JSON.stringify(tvShowsData));
            renderAllTvShows(tvShowsData)
        })
    }
}
//EVENT LISTENER
searchBtn.addEventListener('click', handleClickBtn);
removeAllBtn.addEventListener('click', removeAll)
allTvShowsUl.addEventListener('click', handleClickFav);
favTvShowsUl.addEventListener('click', handleClickFav)
//CALLS
retrieveFavs()
retrieveData()