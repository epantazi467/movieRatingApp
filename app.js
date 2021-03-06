const API_URL =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=550276426c11bd3887a77642fc64b4fe&page=1";
const IMG_PATH = "https://image.tmdb.org/t/p/w1280";
var SEARCH_URL =
  'https://api.themoviedb.org/3/search/movie?api_key=550276426c11bd3887a77642fc64b4fe&query="';
const TV_URL =
  "https://api.themoviedb.org/3/discover/tv?sort_by=popularity.desc&api_key=550276426c11bd3887a77642fc64b4fe&page=1";

const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");
const btn_tv = document.getElementById("btn_tv");
getMovies(API_URL);

async function getMovies(url) {
  const res = await fetch(url);
  const data = await res.json();
  showMovies(data.results);
}

btn_tv.addEventListener("click", (e) => {
  getTv(TV_URL);
  SEARCH_URL =
    'https://api.themoviedb.org/3/search/tv?api_key=550276426c11bd3887a77642fc64b4fe&query="';
});
async function getTv(url) {
  const res = await fetch(url);
  const data = await res.json();
  showTv(data.results);
}
function showTv(tv) {
  main.innerHTML = "";
  tv.forEach((tv) => {
    const { name, poster_path, vote_average, overview } = tv;
    const tvEl = document.createElement("div");
    tvEl.classList.add("movie");
    tvEl.innerHTML = `<img src="${IMG_PATH + poster_path}" alt="${name}">
    <div class="movie-info">
    
    <h3>${name}</h3>
    <span class="${getClassByRate(vote_average)}">${vote_average}</span>
  </div>
  <div class="overview">
    <h3>Overview</h3>
    ${overview}
  </div>
  `;
    main.appendChild(tvEl);
  });
}

window.addEventListener("scroll", function () {
  var header = document.querySelector("header");
  header.classList.toggle("sticky", window.scrollY > 0);
});

function showMovies(movies) {
  main.innerHTML = "";
  movies.forEach((movie) => {
    const { title, poster_path, vote_average, overview } = movie;
    const movieEl = document.createElement("div");
    movieEl.classList.add("movie");
    movieEl.innerHTML = `<img src="${IMG_PATH + poster_path}" alt="${title}">
    <div class="movie-info">
    
    <h3>${title}</h3>
    <span class="${getClassByRate(vote_average)}">${vote_average}</span>
  </div>
  <div class="overview">
    <h3>Overiview</h3>
    ${overview}
  </div>
  `;
    main.appendChild(movieEl);
  });
}
function getClassByRate(vote) {
  if (vote >= 8) {
    return "green";
  } else if (vote >= 5) {
    return "orange";
  } else {
    return "red";
  }
}
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const searchTerm = search.value;
  if (searchTerm && searchTerm !== "") {
    getMovies(SEARCH_URL + searchTerm);
    getTv(SEARCH_URL + searchTerm);

    search.value = "";
  } else {
    window.location.reload();
  }
});
