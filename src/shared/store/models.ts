import { rootReducer } from './rootReducer';

export type TAction<T = any> = { type: string; payload: T };
export type RootState = ReturnType<typeof rootReducer>;
