import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withTracker } from 'meteor/react-meteor-data';

import MaterialHelper from '/imports/ui/helpers/materialcss.js';
import { showError } from '/imports/ui/helpers/alerts.js';

class LoginForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
    };

    this.fields = {};
  }

  onFieldChange(field, value) {
    // console.log(field, value);
    const setObj = {};
    setObj[field] = value;

    this.setState(setObj);
  }

  onRegister(e) {
    e.preventDefault();
    this.props.history.push('/accounts/register');
  }

  onLogin(e) {
    e.preventDefault();

    const checkResult = MaterialHelper.checkAll(this.fields);
    // console.log(checkResult);
    if (checkResult !== true) {
      // console.log(checkResult);
      return;
    }

    let redirectURL = '/';
    if (this.props.match.params && this.props.match.params.redirect) {
      redirectURL = decodeURIComponent(this.props.match.params.redirect);
    }

    Meteor.loginWithPassword({ email: this.state.email }, this.state.password, (err) => {
      if (err) {
        // console.log(err);
        showError(err.message);
      } else {
        // send user to redirect url
        this.props.history.push(redirectURL);
      }
    });
  }

  onLogout(e) {
    e.preventDefault();
    Meteor.logout((error) => {
      if (error) {
        showError(error.message);
      } else {
        // send user to login page
        this.props.history.push('/accounts/login');
      }
    });
  }

  onLoginWithFacebook(e) {
    e.preventDefault();
    Meteor.loginWithFacebook({
      requestPermissions: ['public_profile'],
      auth_type: 'rerequest',
    });
  }

  render() {
    if (this.props.loggedIn === true) {
      return (
        <div className="container">
          <h3 className="center-align">Login</h3>
          <p>You are already logged in.</p>
          <div className="center-align">
            <button
              className="waves-effect waves-light btn"
              onClick={(e) => { this.onLogout(e); }}
            >
              Logout
            </button>
          </div>
        </div>
      );
    }
    return (
      <div className="row login-page-wrapper">
        <h3 className="center-align">Login</h3>
        <form className="col s12">
          <div className="row">
            <div className="input-field col s12">
              <input
                id="email"
                ref={(input) => { this.fields.email = input; }}
                type="email"
                className="validate"
                value={this.state.email}
                onChange={(e) => { this.onFieldChange('email', e.target.value); }}
              />
              <label htmlFor="email">Email</label>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s12">
              <input
                id="password"
                ref={(input) => { this.fields.password = input; }}
                type="password"
                className="validate"
                value={this.state.password}
                onChange={(e) => { this.onFieldChange('password', e.target.value); }}
              />
              <label htmlFor="password">Password</label>
              <Link to="/accounts/forgot-password" className="input-field-helper">Forgot Password?</Link>
            </div>
          </div>
          <div className="row center-align">
            <div className="col s6">
              <button
                className="waves-effect waves-light btn"
                onClick={(e) => { this.onLogin(e); }}
              >
                Login
              </button>
            </div>
            <div className="col s6">
              <button
                className="waves-effect waves-light btn grey"
                onClick={(e) => { this.onRegister(e); }}
              >
                Register
              </button>
            </div>
          </div>
          <div className="row center-align">
            <div className="col s12 m6">
              <button
                className="waves-effect waves-light btn blue"
                onClick={(e) => { this.onLoginWithFacebook(e); }}
              >
                Login with Facebook
              </button>
            </div>
            <div className="col s12 m6"></div>
          </div>
        </form>
      </div>
    );
  }
}

export default withTracker((props) => {
  const returnObj = {
    loggedIn: false,
  };
  // prevent problem with server-render
  if (Meteor.isServer) {
    return returnObj;
  }
  // console.log(Meteor.userId());
  if (Meteor.userId()) {
    returnObj.loggedIn = true;
  }

  return returnObj;
})(LoginForm);
