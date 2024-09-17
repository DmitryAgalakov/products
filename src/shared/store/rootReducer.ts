import { combineReducers } from '@reduxjs/toolkit';
import { productsSlice } from './slices/productsSlice/productsSlice';

export const rootReducer = combineReducers({
  products: productsSlice.reducer,
});
