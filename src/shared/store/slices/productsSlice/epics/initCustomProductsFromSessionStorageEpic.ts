import { Epic, ofType } from 'redux-observable';
import { map } from 'rxjs/operators';
import { RootState, TAction } from '../../../models';
import { createAction } from '@reduxjs/toolkit';
import { TryParseJSON } from '../../../../utils/TryParseJSON';
import { addProducts } from '../productsSlice';
import { Product } from '../models';

export const initCustomProductsFromSessionStorage = createAction('products/initCustomProductsFromSessionStorageEpicAction');

export const initCustomProductsFromSessionStorageEpic: Epic<TAction, TAction, RootState> = (action$) =>
  action$.pipe(
    ofType(initCustomProductsFromSessionStorage.type),
    map(() => {
      const fromStorage = sessionStorage.getItem('customProducts');
      const customProducts = TryParseJSON<Product[]>(fromStorage);
      if (customProducts) {
        return addProducts(customProducts);
      }
      return { type: 'none' } as TAction;
    }),
  );
