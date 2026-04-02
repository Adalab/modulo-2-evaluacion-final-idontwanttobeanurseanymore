'use strict';
//User -> Input -> click -> renderShows() -> API -> renderAllShows()

//1. HTML -> JS (querySelector('.'))
const mainPage = document.querySelector('.js_main_page');
const searchInput =  document.querySelector('.js_search_input');
const searchBtn =  document.querySelector('.js_search_btn');
const allTvShows = document.querySelector('.js_card_results');
const oneTvShow = document.querySelector('.js_card')

let tvShowsData = []
let favTvShowsData = []
const oneTvShowObj = {
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

function handleClickBtn(ev){
    ev.preventDefault();
    fetch(`https://api.tvmaze.com/search/shows?q=${searchInput.value}`)
    .then(res => res.json())
    .then(data => {
        //console.log(data)
        const searchedTvShows = data.show.name
        renderAllTvShows(searchedTvShows)
    }) //fetch busca según el input y almacena el resultado 
        //el resultado es el argumento que le pasamos a la funcion que pinta
}
searchBtn.addEventListener('click', handleClickBtn)
//al hacer click, llama a la función que hace fetch

function handleClickFav(ev){
    //console.log(ev.currentTarget)
    const clickedTvShowId = ev.currentTarget.show.id;
    //id del show clicked
    const clickedTvShow = tvShowsData.find(
        (eachShow) => eachShow.show.id === clickedTvShowId);
        //"iguala" el id al show
    if(clickedTvShowId !== undefined){ //si existe
        const favIndex = favTvShowsData.findIndex((eachShow) => eachShow.show.id === clickedTvShow.id) //buscalo
    
    if(favIndex !== -1){  //si ya está, "córtalo"
        favTvShowsData.splice(favIndex, 1)
    }else{ //si no está, "pushealo"
        favTvShowsData.push(clickedTvShow)
    }
    localStorage.setItem("favs", JSON.stringify(favTvShowsData))
    renderAllTvShows(tvShowsData)
    //renderAllFavourites() - función para pintar los favs
}}

function renderOneTvShow(oneTvShowObj){
    const favIndex = favTvShowsData.findIndex((eachFavShow) => eachFavShow.show.id === oneTvShowObj.show.id)
    const favClass = favIndex !== -1 ? "favourite" : ""
    const imgTvShow = `${oneTvShowObj.show.image ? `<img src="${oneTvShowObj.show.image.medium}">` : `<img src="https://placehold.co/210x295/f5f5f5/666666/?text=TV">`}`;

    const html = `
    <li class="js_card ${favClass}" id="${oneTvShowObj.show.id}"><h3>${oneTvShowObj.show.name}</h3>${imgTvShow}
    </li> 
    ` //cambiar datos en URL
    return html
    //allTvShows.innerHTML = html FUNCIONA
}
renderOneTvShow(oneTvShowObj)
console.log(renderOneTvShow(oneTvShowObj))


/*
function renderAllTvShows(tvShowsData){
    let html = "";
    for(const tvShow of tvShowsData){
        html += renderOneTvShow(tvShow)
    }
    allTvShows.innerHTML = html;
} 
renderAllTvShows(oneTvShowObj)
*/