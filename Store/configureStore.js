// Store/confirhureStore.js

import { createStore } from 'redux';
import toggleFavorite from './Reducers/favoriteReducer';

export default createStore(toggleFavorite)