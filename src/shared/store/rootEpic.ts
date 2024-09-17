import { combineEpics } from 'redux-observable';
import { RootState, TAction } from './models';
import { getProductsEpic } from './slices/productsSlice/epics/getProductsEpic';
import { createCustomProductEpic } from './slices/productsSlice/epics/createProductEpic';
import { customProductsToSessionStorageEpic } from './slices/productsSlice/epics/customProductsToSessionStorageEpic';
import { initCustomProductsFromSessionStorageEpic } from './slices/productsSlice/epics/initCustomProductsFromSessionStorageEpic';
import { changeProductEpic } from './slices/productsSlice/epics/changeProductEpic';

export const rootEpic = combineEpics<TAction, TAction, RootState>(
  getProductsEpic,
  createCustomProductEpic,
  customProductsToSessionStorageEpic,
  initCustomProductsFromSessionStorageEpic,
  changeProductEpic,
);
