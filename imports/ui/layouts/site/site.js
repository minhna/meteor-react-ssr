import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Switch, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import { Alert } from '/imports/ui/helpers/alerts.js';
import NotFoundPage from '/imports/ui/pages/notFound/notFound.js';
import LoadableWrapper from '/imports/helpers/react-loadable/LoadableWrapper.js';

const LoadableHomePage = LoadableWrapper({
  loader: () => import('/imports/ui/pages/home/home.js'),
  modules: ['/imports/ui/pages/home/home.js'],
});
const LoadableTestPage = LoadableWrapper({
  loader: () => import('/imports/ui/pages/test/test.js'),
  modules: ['/imports/ui/pages/test/test.js'],
});
const LoadableAccountPage = LoadableWrapper({
  loader: () => import('/imports/ui/pages/accounts/accounts.js'),
  modules: ['/imports/ui/pages/accounts/accounts.js'],
});

if (Meteor.isClient) {
  import 'react-s-alert/dist/s-alert-default.css';
}

const SiteLayout = () => (
  <div className="site-container">
    <Helmet>
      <title>Site layout</title>
    </Helmet>
    <div className="header-container" />
    <div className="row body-container">
      <Switch>
        <Route exact path="/" component={LoadableHomePage} />
        <Route path="/accounts" component={LoadableAccountPage} />
        <Route exact path="/test" component={LoadableTestPage} />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
    <div className="footer-container" />
    <Alert stack={{ limit: 3 }} />
  </div>
);

export default SiteLayout;
