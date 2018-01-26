import React from 'react';
import { renderToNodeStream } from 'react-dom/server';
import { onPageLoad } from 'meteor/server-render';
import { StaticRouter } from 'react-router';
import { Helmet } from 'react-helmet';
import Loadable from 'react-loadable';

onPageLoad(async (sink) => {
  const context = {};

  const routes = (await import('../both/routes.js')).default;

  const App = props => (
    <StaticRouter location={props.location} context={context}>
      {routes}
    </StaticRouter>
  );

  const modules = [];
  const html = renderToNodeStream((
    <Loadable.Capture report={(moduleName) => { modules.push(moduleName); }}>
      <App location={sink.request.url} />
    </Loadable.Capture>
  ));

  // we have a list of modules here, hopefully Meteor will allow to add them to bundle
  // console.log(modules);

  sink.renderIntoElementById('app', html);

  const helmet = Helmet.renderStatic();
  sink.appendToHead(helmet.meta.toString());
  sink.appendToHead(helmet.title.toString());
});
