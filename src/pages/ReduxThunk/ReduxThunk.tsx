import React from 'react';
import { connect } from 'react-redux';
import { IPageRoute } from '../types';
import { IReduxPage, UpdateUser, AsyncUpdateUser, updateUser, asyncUpdateUser } from './flow';
import { IGlobal } from '@/store/global';
import { IStoreState } from '@/store/types';
import login from '@/http/user';

interface IProps extends IPageRoute<any>, IReduxPage {
  global: IGlobal;
  updateUser: UpdateUser;
  asyncUpdateUser: AsyncUpdateUser;
}

class Redux extends React.Component<IProps> {
  onClick = () => {
    login({
      username: 'root',
      password: 'root',
    }).then(({ data }) => {
      if (!data) return;

      this.props.updateUser({
        name: data.username,
        mobile: data.mobile,
        avator: data.avator,
      });
    });
  };

  onClickAsync = () => {
    this.props.asyncUpdateUser({
      username: 'root',
      password: 'root',
    });
  };

  render() {
    return (
      <div>
        <ul>
          <li>1.store.dispatch(action)</li>
          <li>
            2.connect 方法是一个高阶组件，并且将mapStateToProps 和 mapDispatchToProps
            的执行结果作为被包裹组件的 props 属性。
          </li>
          <li>
            3.因为 connect 中订阅了 store 的更新，当 store 更新时，就会重新执行
            mapStateToProps，将结果重新注入。从而使视图更新。
          </li>
          <li>
            4.在早期的 react-redux 版本中，connect 会在返回的高阶组件中 shouldComponentUpdate
            中做一次浅比较，在最近的版本中，改用 hooks 实现了同样的逻辑。来防止被包裹的组件做无用的
            render。
          </li>
        </ul>

        <div style={{ paddingLeft: '10px' }}>userInfo:{JSON.stringify(this.props.userInfo)}</div>
        <div>
          <button onClick={this.onClick}>同步更新User</button>
          <p>action派发dispatch，同步执行reducers，redux代码和业务分开写</p>
        </div>
        <div>
          <button onClick={this.onClickAsync}>异步更新User</button>
          <p>
            redux代码和业务写在一起，dispatch可以派发一个异步任务，任务结束后发出action，使用Redux-thunk，在actionCreators中编写异步逻辑，而不只是派发dispatch
          </p>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: IStoreState) => ({
  global: state.global,
  ...state.thunkPage,
});

const mapDispatchToProps = {
  updateUser,
  asyncUpdateUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(Redux);
