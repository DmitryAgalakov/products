import { createEpicMiddleware } from 'redux-observable';
import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { RootState, TAction } from './models';
import { rootReducer } from './rootReducer';
import { rootEpic } from './rootEpic';

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const epicMiddleware = createEpicMiddleware<TAction, TAction, RootState>();

const createStore = () => {
  const store = configureStore({
    reducer: rootReducer,
    devTools: process.env.NODE_ENV !== 'production',
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }).concat(epicMiddleware),
  });
  epicMiddleware.run(rootEpic);
  return store;
};

export const store = createStore();
