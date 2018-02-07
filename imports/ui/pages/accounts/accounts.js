import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { Switch, Route } from 'react-router-dom';
// import { Permissions } from '/imports/common/helpers/permissions';

import NotFoundPage from '/imports/ui/pages/notFound/notFound.js';
import LoginForm from '/imports/ui/components/accounts/login';
import ForgotPasswordForm from '/imports/ui/components/accounts/forgotPassword';
import RegisterForm from '/imports/ui/components/accounts/register.js';
import VerifyEmail from '/imports/ui/components/accounts/verifyEmail.js';
import ChangePasswordForm from '/imports/ui/components/accounts/changePassword.js';
import ResetPasswordForm from '/imports/ui/components/accounts/resetPassword.js';

if (Meteor.isClient) {
  import './accounts.scss';
}

class AccountsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allowed: true,
    };
  }

  componentWillMount() {

  }

  render() {
    if (this.state.allowed) {
      return (
        <div className="account-page">
          <div className="container">
            <Switch>
              <Route
                exact
                path="/accounts/login"
                component={LoginForm}
              />
              <Route
                exact
                path="/accounts/login/:redirect"
                component={LoginForm}
              />
              <Route
                exact
                path="/accounts/forgot-password"
                component={ForgotPasswordForm}
              />
              <Route
                exact
                path="/accounts/reset-password/:token"
                component={ResetPasswordForm}
              />
              <Route
                exact
                path="/accounts/change-password"
                component={ChangePasswordForm}
              />
              <Route
                exact
                path="/accounts/register"
                component={RegisterForm}
              />
              <Route
                exact
                path="/accounts/verify-email/:token"
                component={VerifyEmail}
              />
              <Route component={NotFoundPage} />
            </Switch>
          </div>
        </div>
      );
    }

    return (
      <div>...loading...</div>
    );
  }
}

export default AccountsPage;
