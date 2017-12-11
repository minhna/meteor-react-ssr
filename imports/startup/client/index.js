import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch } from 'react-router-dom';
import { onPageLoad } from 'meteor/server-render';

import routes from '../both/routes.js';

const App = () => (
  <BrowserRouter>
    <Switch>
      {routes}
    </Switch>
  </BrowserRouter>
)

onPageLoad(() => {
  ReactDOM.hydrate(<App />, document.getElementById('app'));
});
