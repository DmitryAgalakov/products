import { createAction, PayloadAction } from '@reduxjs/toolkit';
import { Epic, ofType } from 'redux-observable';
import { EMPTY } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { catchError, map, switchMap } from 'rxjs/operators';
import { RootState, TAction } from '../../../models';
import { replaceProduct } from '../productsSlice';
import { Product } from '../models';

interface Payload {
  product: Product;
}

export const changeProduct = createAction<Payload>('products/changeProductEpicAction');

export const changeProductEpic: Epic<TAction, TAction, RootState> = (action$) =>
  action$.pipe(
    ofType(changeProduct.type),
    switchMap(({ payload }: PayloadAction<Payload>) => {
      const { product } = payload;
      return ajax.put<Partial<Product>>(`https://fakestoreapi.com/products/${product.id}`, product).pipe(
        map((res) => {
          const changedProduct: Product = {
            ...product,
            ...res,
          };
          return replaceProduct(changedProduct);
        }),
      );
    }),
    catchError((e) => {
      console.error(`Произошла ошибка при изменении продукта: ${e.message}`);
      return EMPTY;
    }),
  );
