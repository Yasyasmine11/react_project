import { configureStore } from '@reduxjs/toolkit';
import favoritesReducer from './slices/favoritesSlice';
import shoppingListReducer from './slices/shoppingListSlice';

export const store = configureStore({
  reducer: {
    favorites: favoritesReducer,
    shoppingList: shoppingListReducer
  }
});