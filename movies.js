const APIURL = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";
const IMGPATH = "https://image.tmdb.org/t/p/w1280";
const SEARCHAPI = "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";
const RECOMENDATIONS = "https://api.themoviedb.org/3/movie/recommendations?api_key=e308cbf37e9345b73b598e3be38f321b&language=en-US&page=1"

const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("searchh");

//Pelis mejor rateadas (topp)
getMovies(APIURL);
//Llamar a la API y convertirla en JSON
async function getMovies(url) {
    const resp = await fetch(url);
    const respData = await resp.json();

    console.log(respData);

    showMovies(respData.results);
}
//Función que muestra las películas mejor rateadas
function showMovies(movies) {
    //Limpiar el main
    main.innerHTML = "";

    //Para cada película nos trae la img, el promedio de votos, la descripción y el título
    movies.forEach((movie) => {
        const { poster_path, title, vote_average, overview } = movie;

        const movieEl = document.createElement("div");
        movieEl.classList.add("movie");

        movieEl.innerHTML = `
            <img
                src="${IMGPATH + poster_path}"
                alt="${title}"
            />
            <div class="movie-info">
                <h3>${title}</h3>
                <span class="${getClassByRate(
                    vote_average
                )}">${vote_average}</span>
            </div>
            <div class="overview">
                <h3>Overview:</h3>
                ${overview}
            </div>
        `;

        main.appendChild(movieEl);
    });
}

//Pone color a la votación dependiendo del # de votaciones
function getClassByRate(vote) {
    if (vote >= 8) {
        return "green";
    } else if (vote >= 5) {
        return "orange";
    } else {
        return "red";
    }
}

//Search función
form.addEventListener("submit", (e) => {
    e.preventDefault();

    const searchTerm = search.value;

    if (searchTerm) {
        getMovies(SEARCHAPI + searchTerm);

        search.value = "";
    }
    console.log(searchTerm)
});

//Peli random para recomendar --------(NADA SIRVEEE)-----
/*for (let i = 0; i < APIURL.length; i++){
    console.log(i);
}*/
/*window.addEventListener("random" , function random(){
    let i = Math.floor(Math.random()*APIURL.length);
    console.log("I:" , i);

    document.getElementById("main").innerHTML = respData[i];
}, false)*/

/*getMovies(RECOMENDATIONS);
function rondomReco(){
    console.log("hola")
    console.log(respData.results["0"]);
}*/


//Bloqueamos y desbloqueamos páginas dependiendo del botón en el cual le piques
function inicioCosas(){
    document.getElementById("navv").style.display="flex";
    document.getElementById("pags").style.display="block";
    document.getElementById("home").style.display="block";
    document.getElementById("buscar").style.display="none";
    document.getElementById("searchh").style.display="none";
    document.getElementById("inicioP").style.display="none";
}

function navCosas(){
    document.getElementById("pags").style.display="block";
}

function homee(){
    document.getElementById("home").style.display="block";
    document.getElementById("reco").style.display="none";
    document.getElementById("topp").style.display="none";
    document.getElementById("searchh").style.display="block";
    document.getElementById("buscar").style.display="none";
    document.getElementById("main").style.display="none";
}

function recoo(){
    document.getElementById("reco").style.display="block";
    document.getElementById("home").style.display="none";
    document.getElementById("topp").style.display="none";
    document.getElementById("searchh").style.display="block";
    document.getElementById("buscar").style.display="none";
    document.getElementById("main").style.display="none";
}

function toppP(){
    document.getElementById("topp").style.display="block";
    document.getElementById("home").style.display="none";
    document.getElementById("reco").style.display="none";
    document.getElementById("searchh").style.display="block";
    document.getElementById("buscar").style.display="none";
    document.getElementById("main").style.display="block";
}


function searchh(){
    document.getElementById("home").style.display="none";
    document.getElementById("reco").style.display="none";
    document.getElementById("topp").style.display="none";
    document.getElementById("searchh").style.display="block";
    document.getElementById("buscar").style.display="block";
    document.getElementById("main").style.display="none";

    //Se limpia lo que el usuario haya tecleado en el Search
    document.getElementById("inputt").value="";
}