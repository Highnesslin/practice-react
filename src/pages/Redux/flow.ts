import reqProduce from '@/http/produce';
import { IPageReq } from '@/http/type';
import { IAction } from '@/store/types';
import { Dispatch } from 'redux';

// Action
export type AsyncUpdateList = (list: IProduce) => void;
export type UpdateDetail = (param: { id: string; detail: IProduce }) => void;

// state
export type IProduce = {
  id: string;
  name: string;
  num: number;
};

export interface IReduxPage {
  byIds: {
    [key: string]: IProduce;
  };
  allIds: Array<IReduxPage['byIds']>;
}

const REDUX_UPDATE_LIST = 'REDUX_UPDATE_LIST'; // 更新列表
const REDUX_UPDATE_DETAIL = 'REDUX_UPDATE_DETAIL'; // 更新某一项

export const asyncUpdateList = (params: IPageReq) => (dispatch: Dispatch<IAction>) => {
  reqProduce(params).then(res => {
    console.log(params);
    dispatch({
      type: REDUX_UPDATE_LIST,
      payload: { list: res.data },
    });
  });
};

export const updateDetail = (id: string, detail: IProduce) => {
  return {
    type: REDUX_UPDATE_DETAIL,
    payload: { id, detail },
  };
};

const initialState: IReduxPage = {
  byIds: {},
  allIds: [],
};

const ReduxReducer = (
  state = initialState,
  action: IAction<{
    id: string;
    detail: IProduce;
    list: Array<IProduce>;
  }>
): IReduxPage => {
  const { type, payload } = action;

  switch (type) {
    case REDUX_UPDATE_LIST: {
      const byIds: IReduxPage['byIds'] = { ...state.byIds };
      const allIds: IReduxPage['allIds'] = [];
      payload.list.forEach(item => {
        byIds[item.id] = item;
      });
      return {
        ...state,
        byIds,
        allIds,
      };
    }
    case REDUX_UPDATE_DETAIL: {
      const nextByIds = {
        ...state.byIds,
        [payload.id]: payload.detail,
      };
      return {
        ...state,
        byIds: nextByIds,
      };
    }
    default: {
      return { ...state };
    }
  }
};

export default ReduxReducer;
