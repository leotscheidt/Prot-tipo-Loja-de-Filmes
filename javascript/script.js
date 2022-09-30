const API_KEY = 'api_key=e03570d15afe89213a080483d58ebb43';
const BASE_URL = 'https://api.themoviedb.org/3';
const API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&' + API_KEY;
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const searchURL = BASE_URL + '/search/movie?' + API_KEY;

const c = (el) => document.querySelector(el);
const cs = (el) => document.querySelectorAll(el);

/*modelsJson.map((item, index) => {
    let modelsItem = c('.models .models-item').cloneNode(true);
    modelsItem.querySelector('.models-item--img img').src = item.img;
    modelsItem.querySelector('.models-item--price').innerHTML = `R$ ${item.price.toFixed(2)}`;
    modelsItem.querySelector('.models-item--name').innerHTML = item.name;
    modelsItem.querySelector('.models-item--desc').innerHTML = description.name;
    modelsItem.querySelector('a').addEventListener('click', (e) => {
        e.preventDefault();
        c('.modelsWindowArea').style.display = 'flex';
    });
    c('.models-area').append(modelsItem);
})*/

const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');
getMovies(API_URL);

function getMovies(url){

    fetch(url).then(res => res.json()).then(data => {
        console.log(data.results)
        showMovies(data.results);
    })

}

function showMovies(data){
    main.innerHTML='';

    data.forEach(movie => {
        const {title, poster_path, vote_average, overview} = movie;
        const movieElement = document.createElement('div');
        movieElement.classList.add('movie');
        movieElement.innerHTML = `<img src="${IMG_URL+poster_path}"
        alt="${title}">

        <div class = "movie-info">
           <h3>${title}</h3>
           <span class = "${getCor(vote_average)}">${vote_average}</span>
        </div>
        <div class = "resumo">
           <h3>Resumo</h3>
             ${overview};   
           </div>`
           main.appendChild(movieElement);
    })
}

function getCor(vote){
    if(vote >= 8){
        return 'green';
    }else if (vote >= 5){
        return 'orange';
    }else{
        return 'red';
    }
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const searchTerm = search.value;
    if(searchTerm){
        getMovies(searchURL + '&query=' + searchTerm)
    }else{
        getMovies(API_URL);
    }
})