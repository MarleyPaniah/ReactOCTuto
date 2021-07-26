// Store/Reducers/favoriteReducer.js

const initialState = { favoritesFilm: [] }

function toggleFavorite(state = initialState, action) {
    let nextState
    switch (action.type) {
        case 'TOGGLE_FAVORITE':
            const favoriteFilmIndex = state.favoritesFilm.findIndex(item => item.id == action.value.id) // Look for the movie in fav list. If not there, returns -1
            if (favoriteFilmIndex !== -1) {
                // The movie is already in the favorites, it is removed from the list
                nextState = {
                    ...state,
                    // Rerender the list by filtering out the movie that has this id
                    favoritesFilm: state.favoritesFilmFilm.filter((item, index) => index !== favoriteFilmIndex)
                }
            }
            else {
                // The movie is not in favorites, so it is added to the list
                nextState = {
                    ...state,
                    favoritesFilm: [...state.favoritesFilm, action.value]
                }
            }

            return nextState || state
        default:
            return state
    }
}

export default toggleFavorite