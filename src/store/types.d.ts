import { IGlobal } from './global';
import { IReduxThunkPage } from '@/pages/ReduxThunk/flow';
import { IReduxPage } from '@/pages/Redux/flow';

export interface IStoreState {
  global: IGlobal;
  thunkPage: IReduxThunkPage;
  reduxPage: IReduxPage;
}

export interface IAction<T = any> {
  type: string;
  payload: T;
}
