'use strict';
//User -> Input -> click -> renderShows() -> API -> renderAllShows()

//const mainPage = document.querySelector('.js_main_page');
const searchInput =  document.querySelector('.js_search_input');
const searchBtn =  document.querySelector('.js_search_btn');
//const favBtn = document.querySelector('.js_fav_btn');

const allTvShows = document.querySelector('.js_results_ul');
const favTvShows = document.querySelector('.js_fav_ul')
const oneTvShow = document.querySelector('.js_card_li')

let tvShowsData = []
let favTvShowsData = []
/*
const one Tv ShowObj = {
    "score": 0.7404193,
    "show": {
      "id": 72204,
      "url": "https://www.tvmaze.com/shows/72204/united",
      "name": "United",
      "type": "Documentary",
      "language": "English",
      "genres": [
        "Sports"
      ],
      "status": "To Be Determined",
      "runtime": null,
      "averageRuntime": 46,
      "premiered": "2022-12-07",
      "ended": null,
      "officialSite": "https://10play.com.au/united/episodes",
      "schedule": {
        "time": "",
        "days": [
          "Wednesday"
        ]
      },
      "rating": {
        "average": null
      },
      "weight": 4,
      "network": null,
      "webChannel": {
        "id": 386,
        "name": "10 Play",
        "country": {
          "name": "Australia",
          "code": "AU",
          "timezone": "Australia/Sydney"
        },
        "officialSite": null
      },
      "dvdCountry": null,
      "externals": {
        "tvrage": null,
        "thetvdb": null,
        "imdb": null
      },
      "image": null,
      "summary": "\u003Cp\u003E\u003Cb\u003EUnited\u003C/b\u003E is a docuseries that charts Western United FC's course from A-League cellar dwellers to Champions in under 12 months.\u003C/p\u003E\u003Cp\u003EWith a refreshed playing squad, a brand new head coach in Socceroos legend John Aloisi and a renewed hunger throughout the Club, Western United set about competing at the top of the league, and the rest is history.\u003C/p\u003E\u003Cp\u003E\u003Ci\u003EUnited \u003C/i\u003Egives an insight into the key moves off the pitch as the Green and Black recruited new players and headed to a new training facility at the NEC Hangar.\u003C/p\u003E\u003Cp\u003EA key topic for the Club continues to be the Wyndham City Stadium precinct, and the series goes into the work being done to continue working towards construction of the 15,000-seat arena and the surrounding city which will bring the West of Melbourne to life.\u003C/p\u003E",
      "updated": 1698365842,
      "_links": {
        "self": {
          "href": "https://api.tvmaze.com/shows/72204"
        },
        "previousepisode": {
          "href": "https://api.tvmaze.com/episodes/2674232",
          "name": "Episode 6"
        }
      }
    }
  }
//2. Llamar al API -> function + fetch + renderShows()
//LLAMA AL HACER CLICK
*/
//Llamar al API -> function + fetch + renderAllTvShows()
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

function retrieveFavs(){
    const favTvShowsFromLS = JSON.parse(localStorage.getItem("favs"));
    if (favTvShowsFromLS){
        favTvShowsData = favTvShowsFromLS
        renderAllFav()
    }
}
retrieveFavs()
retrieveData();
