import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import NotFoundPage from '/imports/ui/pages/notFound/notFound.js';
import LoadableWrapper from '/imports/helpers/loadable/LoadableWrapper.js';

const LoadableDashboardPage = LoadableWrapper({
  loader: () => import('/imports/ui/pages/admin/dashboard/dashboard.js'),
  serverSideRequirePath: '/imports/ui/pages/admin/dashboard/dashboard.js',
});

const AdminLayout = () => (
  <div className="site-container">
    <Helmet>
      <title>Admin layout</title>
    </Helmet>
    <div className="header-container" />
    <div className="row body-container">
      <Switch>
        <Route exact path="/admin" component={LoadableDashboardPage} />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
    <div className="footer-container" />
  </div>
);

export default AdminLayout;
