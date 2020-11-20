import { createStore, combineReducers, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import reduxThunkReducer from '@/pages/ReduxThunk/flow';
import globalReducer from './global';
import { IStoreState } from './types';
import ReduxReducer from '@/pages/Redux/flow';

const reducers = combineReducers<IStoreState>({
  global: globalReducer,
  thunkPage: reduxThunkReducer,
  reduxPage: ReduxReducer,
});

export default createStore(reducers, applyMiddleware(thunk, logger));
