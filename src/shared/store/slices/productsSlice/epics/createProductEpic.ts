import { createAction, PayloadAction } from '@reduxjs/toolkit';
import { Epic, ofType } from 'redux-observable';
import { EMPTY } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { catchError, map, switchMap } from 'rxjs/operators';
import { RootState, TAction } from '../../../models';
import { addProducts } from '../productsSlice';
import { Product } from '../models';

interface Payload {
  product: Omit<Product, 'id'>;
}

export const createProduct = createAction<Payload>('products/createProductEpicAction');

export const createCustomProductEpic: Epic<TAction, TAction, RootState> = (action$) =>
  action$.pipe(
    ofType(createProduct.type),
    switchMap(({ payload }: PayloadAction<Payload>) =>
      ajax.post<{ id: string }>(`https://fakestoreapi.com/products`, payload.product).pipe(
        map(() => {
          const product: Product = {
            // id: response.id, API возвращает всегда одинаковый айди = 21.
            id: Date.now(),
            ...payload.product,
          };
          return addProducts([product]);
        }),
      ),
    ),
    catchError((e) => {
      console.error(`Произошла ошибка при создании продукта: ${e.message}`);
      return EMPTY;
    }),
  );
