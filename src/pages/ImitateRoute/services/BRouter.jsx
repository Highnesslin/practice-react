import React from 'react';
import { createImitateRouter } from './history';

import RouteContext from './context';

class BRouter extends React.Component {
  constructor(props) {
    super(props);

    this.history = createImitateRouter();

    this.history.setActivePath(this.props.children[0].props.path);
  }

  render() {
    return (
      <RouteContext.Provider value={this.history}>{this.props.children}</RouteContext.Provider>
    );
  }
}
export default BRouter;
