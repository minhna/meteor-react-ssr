import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

import { showError, showSuccess } from '/imports/ui/helpers/alerts.js';

class VerifyEmail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      message: 'Loading...',
    };
  }

  componentWillMount() {
    const { token } = this.props.match.params;
    if (!token) {
      this.setState({
        message: 'Token was not found',
      });
      showError('Token was not found');
    }
  }

  componentDidMount() {
    const { token } = this.props.match.params;
    if (!token) {
      return;
    }
    // call meteor method
    Accounts.verifyEmail(token, (error) => {
      this.setState({
        message: 'Loaded',
      });

      // send user to login page
      this.props.history.push('/accounts/login');
      if (error) {
        Meteor.setTimeout(() => {
          showError(error.message);
        }, 100);
      } else {
        Meteor.setTimeout(() => {
          showSuccess('Accounts verified successfully');
        }, 100);
      }
    });
  }

  render() {
    return (
      <div className="email-verify-container">
        <h1>Email Verification</h1>
        <div className="message">{this.state.message}</div>
      </div>
    );
  }
}

export default VerifyEmail;
