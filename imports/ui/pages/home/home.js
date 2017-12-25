import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class HomePage extends Component {

  render() {
    return (
      <div className="home-page-container container">
        <h1>Home Page</h1>
        <Link to="/admin">admin</Link>
      </div>
    );
  }
}

export default HomePage;
