import React, { Component } from 'react';
import RouteContext from './context';

export default class Route extends Component {
  static contextType = RouteContext;

  constructor(props) {
    super(props);
    const history = this.context;

    this.state = {
      location: this.props.path,
    };
  }

  componentDidMount() {
    this.unListen = this.context.appendListener(location => {
      this.setState({ location });
    });
  }

  componentWillUnmount() {
    this.unListen && this.unListen();
  }

  render() {
    const { activePath } = this.context;

    return (
      activePath === this.props.path && (
        <div>
          <p>{this.props.path}</p>
          <div>{this.props.component}</div>
        </div>
      )
    );
  }
}
