import { Dispatch } from 'redux';
import { IAction } from '@/store/types';
import login, { Ilogin } from '@/http/user';

export type UpdateUser = (user: IUser) => void;
export type AsyncUpdateUser = (user: Ilogin) => void;

export type IUser = {
  name: string;
  mobile: string;
  avator: string;
};
export interface IReduxPage {
  userInfo: IUser;
}

const REDUX_UPDATE_USER = 'REDUX_UPDATE_USER';

// 同步更新用户信息
export const updateUser = (user: IUser) => {
  return {
    type: REDUX_UPDATE_USER,
    payload: user,
  };
};

// 异步更新用户信息
export const asyncUpdateUser = (user: Ilogin) => (dispatch: Dispatch<IAction>) => {
  login(user).then(({ data }) => {
    if (!data) return;

    dispatch({
      type: REDUX_UPDATE_USER,
      payload: {
        name: data.username,
        mobile: data.mobile,
        avator: data.avator,
      },
    });
  });
};

const initialState: IReduxPage = {
  userInfo: {
    name: '',
    mobile: '',
    avator: '',
  },
};

const ReduxReducer = (state = initialState, action: IAction) => {
  const { type, payload } = action;
  switch (type) {
    case REDUX_UPDATE_USER: {
      return {
        ...state,
        userInfo: payload,
      };
    }
    default: {
      return { ...state };
    }
  }
};

export default ReduxReducer;
