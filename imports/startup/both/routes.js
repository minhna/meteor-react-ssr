import React from 'react';
import { Route, Switch } from 'react-router-dom';

import LoadableWrapper from '/imports/helpers/loadable/LoadableWrapper.js';

const LoadableAdminLayout = LoadableWrapper({
  loader: () => import('/imports/ui/layouts/admin/admin.js'),
  serverSideRequirePath: '/imports/ui/layouts/admin/admin.js',
});
const LoadableSiteLayout = LoadableWrapper({
  loader: () => import('/imports/ui/layouts/site/site.js'),
  serverSideRequirePath: '/imports/ui/layouts/site/site.js',
});

export default (
  <Switch>
    <Route path="/admin" component={LoadableAdminLayout} />
    <Route path="/" component={LoadableSiteLayout} />
  </Switch>
);
