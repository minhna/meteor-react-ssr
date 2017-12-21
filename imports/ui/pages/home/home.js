import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import callWithPromise from '/imports/helpers/call-with-promise.js';

class HomePage extends Component {
  onClick() {
    const callMethod = async () => {
      const result1 = await callWithPromise('test.task', { index: 1 });
      console.log(result1);
      const result2 = await callWithPromise('test.task', { index: 2 });
      console.log(result2);
    };

    callMethod();
  }

  render() {
    return (
      <div className="home-page-container container">
        <h1>Home Page</h1>
        <Link to="/admin">admin</Link>
        <button className="btn" onClick={(e) => { this.onClick(e); }}>Some button</button>
      </div>
    );
  }
}

export default HomePage;
