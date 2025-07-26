import { configureStore } from '@reduxjs/toolkit';
import shoppingCartSlice from './shopping-cart-slice';
import uiSlice from './ui-slice';

const store = configureStore({
  reducer: { shoppingCartSlice: shoppingCartSlice.reducer, uiSlice: uiSlice.reducer },
});

export default store;