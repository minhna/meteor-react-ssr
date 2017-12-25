import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import TestSimpleSchema from '/imports/ui/components/test/simpleSchema.js';
import TestSyncMethodCall from '/imports/ui/components/test/syncMethodCall.js';

class HomePage extends Component {

  render() {
    return (
      <div className="home-page-container container">
        <h1>Home Page</h1>
        <Link to="/admin">admin</Link>
        <h2>Test sync method call</h2>
        <TestSyncMethodCall />
        <h2>test simpl-schema</h2>
        <TestSimpleSchema />
      </div>
    );
  }
}

export default HomePage;
