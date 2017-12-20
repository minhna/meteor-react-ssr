import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Loadable from 'react-loadable';

import MainComponent from '/imports/ui/components/main.js';
// import SiteLayout from '/imports/ui/layouts/site/site.js';
// import AdminLayout from '/imports/ui/layouts/admin/admin.js';

import Loading from '/imports/ui/components/loading.js';

const LoadableAdminLayout = Loadable({
  loader: () => import('/imports/ui/layouts/admin/admin.js'),
  loading: Loading,
  delay: 200
});
const LoadableSiteLayout = Loadable({
  loader: () => import('/imports/ui/layouts/site/site.js'),
  loading: Loading,
  delay: 200
});

export default (
  <MainComponent>
    <Switch>
      <Route path="/admin" component={LoadableAdminLayout} />
      <Route path="/" component={LoadableSiteLayout} />
    </Switch>
  </MainComponent>
);
