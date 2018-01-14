import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import NotFoundPage from '/imports/ui/pages/notFound/notFound.js';
import LoadableWrapper from '/imports/helpers/react-loadable/LoadableWrapper.js';

const LoadableHomePage = LoadableWrapper({
  loader: () => import('/imports/ui/pages/home/home.js'),
  serverSideRequirePath: '/imports/ui/pages/home/home.js',
});
const LoadableTestPage = LoadableWrapper({
  loader: () => import('/imports/ui/pages/test/test.js'),
  serverSideRequirePath: '/imports/ui/pages/test/test.js',
});

const SiteLayout = () => (
  <div className="site-container">
    <Helmet>
      <title>Site layout</title>
    </Helmet>
    <div className="header-container" />
    <div className="row body-container">
      <Switch>
        <Route exact path="/" component={LoadableHomePage} />
        <Route exact path="/test" component={LoadableTestPage} />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
    <div className="footer-container" />
  </div>
);

export default SiteLayout;
