import React, { Component } from 'react';
import RouteContext from './context';

export default class Link extends Component {
  static contextType = RouteContext;

  constructor(props) {
    super(props);
    this.changeRoute = this.changeRoute.bind(this);
  }

  changeRoute(e) {
    const { setActivePath } = this.context;
    setActivePath(this.props.path);

    // 阻止默认浏览器动作(W3C)
    if (e.preventDefault) {
      e.preventDefault();
    } else {
      // IE中阻止函数器默认动作的方式
      window.event.returnValue = false;
    }

    return false;
  }

  render() {
    return (
      <a href="#!" onClick={this.changeRoute}>
        {this.props.children}
      </a>
    );
  }
}
