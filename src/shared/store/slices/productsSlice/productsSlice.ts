import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from './models';

interface State {
  products: Product[];
}

const initialState: State = {
  products: [],
};

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    addProducts(state, { payload }: PayloadAction<Product[]>) {
      payload.forEach((newProduct) => {
        if (state.products.some((oldProduct) => oldProduct.id === newProduct.id)) {
          return;
        }
        state.products.push(newProduct);
      });
    },
    replaceProduct(state, { payload }: PayloadAction<Product>) {
      const oldProducts = state.products.filter((p) => p.id !== payload.id);
      state.products = [...oldProducts, payload];
    },
    removeProduct(state, { payload }: PayloadAction<number>) {
      state.products = state.products.filter((p) => p.id !== payload);
    },
  },
});

export const { addProducts, replaceProduct, removeProduct } = productsSlice.actions;
