import { createSlice } from '@reduxjs/toolkit';

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: {
    items: []
  },
  reducers: {
    toggleFavorite: (state, action) => {
      const cocktailId = action.payload;
      const exists = state.items.includes(cocktailId);
      if (exists) {
        state.items = state.items.filter(id => id !== cocktailId);
      } else {
        state.items.push(cocktailId);
      }
    }
  }
});

export const { toggleFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;