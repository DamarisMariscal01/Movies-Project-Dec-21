let traerPeliRandom = (url) => {
    fetch('https://api.themoviedb.org/3/movie/?api_key=e308cbf37e9345b73b598e3be38f321b')

    .then(info => {
        console.log(info);
        return info.json();
    })
    .then(info => console.log(info))
}
traerPeliRandom();

const main = document.getElementById("main");
console.log("holap" , main);
const form = document.getElementById("form");
const search = document.getElementById("search");

const apiUrl = "https://api.themoviedb.org/3/movie/550?api_key=e308cbf37e9345b73b598e3be38f321b";
const IMGPATH = "https://image.tmdb.org/t/p/w500/kqjL17yufvn9OVLyXYpvtyrFfak.jpg";
const TOPRATED = "https://api.themoviedb.org/3/movie/top_rated?api_key=e308cbf37e9345b73b598e3be38f321b&language=en-US&page=1";
const RECOMENDATIONS = "https://api.themoviedb.org/3/movie/{movie_id}/recommendations?api_key=e308cbf37e9345b73b598e3be38f321b&language=en-US&page=1";
const SEARCH = "https://api.themoviedb.org/3/search/multi?api_key=e308cbf37e9345b73b598e3be38f321b&language=en-US&page=1&include_adult=false&query=string";

function inicioCosas(){
    console.log("holap")
    document.getElementById("navv").style.display="flex";
    document.getElementById("pags").style.display="block";
    document.getElementById("home").style.display="block";
    document.getElementById("inicioP").style.display="none";
}

function navCosas(){
    document.getElementById("pags").style.display="block";
}

function homee(){
    document.getElementById("home").style.display="block";
    document.getElementById("reco").style.display="none";
    document.getElementById("topp").style.display="none";
    document.getElementById("search").style.display="none";
    console.log("ouo");
}


function recoo(){
    document.getElementById("reco").style.display="block";
    document.getElementById("home").style.display="none";
    document.getElementById("topp").style.display="none";
    document.getElementById("search").style.display="none";
    console.log("123");


    pelis(apiUrl);
    async function pelis(url) {
        //es otra manera de llamar al fetch
        const resp = await fetch(url);
        const respData = await resp.json();
    
        console.log(respData);
    
        mostrarPelis(respData.results);
    }
    
    //mostrarPelis(apiUrl);
    function mostrarPelis(movies) {
        // clear main
        main.innerHTML = "";

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
                    <span class="${ratingPelis(vote_average)}">${vote_average}</span>
                </div>
                <div class="overview">
                    <h3>Overview:</h3>
                    ${overview}
                </div>
            `;
    
            main.appendChild(movieEl);
        });
    }
    
    //Se pone de color verde las pelis con votación de +=8, de naranja de <=5, y de rojo las demás
    function ratingPelis(vote) {
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
    
        if (searchTerm) {
            pelis(SEARCHAPI + searchTerm);
    
            search.value = "";
        }
    });
    
}


function toppP(){
    document.getElementById("topp").style.display="block";
    document.getElementById("home").style.display="none";
    document.getElementById("reco").style.display="none";
    document.getElementById("search").style.display="none";
    console.log("567");
}


function searchh(){
    document.getElementById("home").style.display="none";
    document.getElementById("reco").style.display="none";
    document.getElementById("topp").style.display="none";
    document.getElementById("search").style.display="block";

    document.getElementById("inputt").value="";
    console.log("lalala");

    form.addEventListener("submit", (e) => {
        e.preventDefault();
    
        const searchTerm = search.value;
    
        if (searchTerm) {
            traerPeliRandom(SEARCHAPI + searchTerm);
    
            search.value = "";
        }
    });
    console.log(searchTerm);

}