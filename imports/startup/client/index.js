import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Switch } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import { onPageLoad } from 'meteor/server-render';

import routes from '../both/routes.js';

const history = createHistory();

const App = () => (
  <Router history={history}>
    <Switch>
      {routes}
    </Switch>
  </Router>
);

onPageLoad(() => {
  ReactDOM.hydrate(<App />, document.getElementById('app'));
});
