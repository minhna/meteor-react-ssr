import React from 'react';
import { Route, Switch } from 'react-router-dom';

import MainComponent from '/imports/ui/components/main.js';
import SiteLayout from '/imports/ui/layouts/site/site.js';
import AdminLayout from '/imports/ui/layouts/admin/admin.js';

export default (
  <MainComponent>
    <Switch>
      <Route path="/admin" component={AdminLayout} />
      <Route path="/" component={SiteLayout} />
    </Switch>
  </MainComponent>
);
