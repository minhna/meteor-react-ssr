import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import { onPageLoad } from 'meteor/server-render';

const history = createHistory();

onPageLoad(async () => {
  const routes = (await import('../both/routes.js')).default;
  const App = () => (
    <Router history={history}>
      {routes}
    </Router>
  );
  ReactDOM.hydrate(<App />, document.getElementById('app'));
});
