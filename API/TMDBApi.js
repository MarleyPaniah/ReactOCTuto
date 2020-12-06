// API/TMDBApi.js

import API_TOKEN from '../Helpers/token'

export function getFilmsFromApiWithSearchedText(text, page) {
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${API_TOKEN}&language=fr&query=${text}&page=${page}`;
    console.log(url)
    return fetch(url)
        .then((response) => response.json()) // The response was corretly received and turned into a json
        .catch((error) => console.log(error)) // In case of error
}

export function getImageFromAPI(name) {
    return `https://image.tmdb.org/t/p/w300${name}`
}
 
