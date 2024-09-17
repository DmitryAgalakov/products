import { createAction } from '@reduxjs/toolkit';
import { Epic, ofType } from 'redux-observable';
import { EMPTY, of, throwError } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { catchError, map, switchMap } from 'rxjs/operators';
import { RootState, TAction } from '../../../models';
import { Product } from '../models';
import { addProducts } from '../productsSlice';

export const getProducts = createAction('products/getProductsEpicAction');

export const getProductsEpic: Epic<TAction, TAction, RootState> = (action$) =>
  action$.pipe(
    ofType(getProducts.type),
    switchMap(() => ajax.get<Product[]>(`https://fakestoreapi.com/products`).pipe(map(({ response }) => addProducts(response)))),
    catchError((e) => {
      console.error(`Произошла ошибка при загрузке продуктов: ${e.message}`);
      return EMPTY;
    }),
  );
