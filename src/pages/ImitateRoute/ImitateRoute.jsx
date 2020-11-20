import React from 'react';
import BRouter from './services/BRouter';
import Link from './services/Link';
import Route from './services/Route';

export default function ImitateRoute() {
  return (
    <div>
      <p>BRouter</p>
      <BRouter>
        <Route path="/test/one" component={<div>hello</div>} />
        <Route path="/test/two" component={<div>world</div>} />
        <hr />
        <Link path="/test/one">one</Link>
        <Link path="/test/two">two</Link>
      </BRouter>
    </div>
  );
}
