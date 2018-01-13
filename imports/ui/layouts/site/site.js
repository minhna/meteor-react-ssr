import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Loadable from 'react-loadable';

import Loading from '/imports/ui/components/loading.js';
import NotFoundPage from '/imports/ui/pages/notFound/notFound.js';

const LoadableHomePage = Loadable({
  loader: () => import('/imports/ui/pages/home/home.js'),
  loading: Loading,
  delay: 200,
  serverSideRequirePath: '/imports/ui/pages/home/home.js',
});

const LoadableTestPage = Loadable({
  loader: () => import('/imports/ui/pages/test/test.js'),
  loading: Loading,
  delay: 200,
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
