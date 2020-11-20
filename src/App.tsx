import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import RouteView from './routes/RouteView';
import RouteConfig from './routes/routes.config';
import store from './store';

export default function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <RouteView children={RouteConfig} />
      </BrowserRouter>
    </Provider>
  );
}
