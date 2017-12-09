import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import HomePage from '/imports/ui/pages/home/home.js';
import NotFoundPage from '/imports/ui/pages/notFound/notFound.js';

class SiteLayout extends Component {

  render() {
    return (
      <div className="site-container">
        <div className="header-container">
        </div>
        <div className="row body-container">
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route component={NotFoundPage} />
          </Switch>
        </div>
        <div className="footer-container">
        </div>
      </div>
    )
  }
}

export default SiteLayout;
