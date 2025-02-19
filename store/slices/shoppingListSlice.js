import { createSlice } from '@reduxjs/toolkit';

const shoppingListSlice = createSlice({
  name: 'shoppingList',
  initialState: {
    items: {}
  },
  reducers: {
    addToShoppingList: (state, action) => {
      const { ingredient, measure } = action.payload;
      if (state.items[ingredient]) {
        state.items[ingredient].count += 1;
      } else {
        state.items[ingredient] = {
          measure,
          count: 1
        };
      }
    },
    removeFromShoppingList: (state, action) => {
      const ingredient = action.payload;
      if (state.items[ingredient]) {
        if (state.items[ingredient].count > 1) {
          state.items[ingredient].count -= 1;
        } else {
          delete state.items[ingredient];
        }
      }
    },
    incrementQuantity: (state, action) => {
      const ingredient = action.payload;
      if (state.items[ingredient]) {
        state.items[ingredient].count += 1;
      }
    },
    decrementQuantity: (state, action) => {
      const ingredient = action.payload;
      if (state.items[ingredient]) {
        if (state.items[ingredient].count > 1) {
          state.items[ingredient].count -= 1;
        } else {
          delete state.items[ingredient];
        }
      }
    },
    clearShoppingList: (state) => {
      state.items = {};
    }
  }
});

export const { addToShoppingList, removeFromShoppingList, incrementQuantity, decrementQuantity, clearShoppingList } = shoppingListSlice.actions;
export default shoppingListSlice.reducer;
