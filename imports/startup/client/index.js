import { Meteor } from 'meteor/meteor';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import { onPageLoad } from 'meteor/server-render';

if (Meteor.isClient) {
  import Materialize from 'materialize-css';
  // set global (that way we don´t need to import in every file)
  global.M = Materialize;
  global.Materialize = Materialize;
}

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
