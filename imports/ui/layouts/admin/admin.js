import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Loadable from 'react-loadable';

import Loading from '/imports/ui/components/loading.js';
import NotFoundPage from '/imports/ui/pages/notFound/notFound.js';

const LoadableDashboardPage = Loadable({
  loader: () => import('/imports/ui/pages/admin/dashboard/dashboard.js'),
  loading: Loading,
  delay: 200,
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
