//API/TMDBApi.js

import API_TOKEN from '../Helpers/token'

export function getFilmsFromApiWithSearchedText(text) {
    const url = 'https://api.themoviedb.org/3/search/movie?api_key='+API_TOKEN+'&language=fr&query='+text;
    return fetch(url)
        .then((response) => response.json()) //La réponse a correctement été reçue et transformée en JSON
        .catch((error) => console.log(error)) // En cas d'erreur
}
