import React from 'react';
import { renderToString } from 'react-dom/server';
import { onPageLoad } from 'meteor/server-render';
import { StaticRouter } from 'react-router';
import routes from '../both/routes.js';

onPageLoad((sink) => {
  const context = {};

  const App = props => (
    <StaticRouter location={props.location} context={context}>
      {routes}
    </StaticRouter>
  );

  sink.renderIntoElementById('app', renderToString(<App location={sink.request.url} />));
});
