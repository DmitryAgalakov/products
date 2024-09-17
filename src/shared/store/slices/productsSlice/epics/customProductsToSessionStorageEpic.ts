import { Epic, ofType } from 'redux-observable';
import { map } from 'rxjs/operators';
import { RootState, TAction } from '../../../models';
import { addProducts, removeProduct } from '../productsSlice';
import { changeProduct } from './changeProductEpic';

export const customProductsToSessionStorageEpic: Epic<TAction, TAction, RootState> = (action$, state$) =>
  action$.pipe(
    ofType(removeProduct.type, changeProduct.type, addProducts.type),
    map(() => {
      const customProducts = state$.value.products.products.filter((p) => p.creationDate);
      sessionStorage.setItem('customProducts', JSON.stringify(customProducts));
      return { type: 'none' } as TAction;
    }),
  );
