import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { showError } from '/imports/ui/helpers/alerts.js';
import MaterialHelper from '/imports/ui/helpers/materialcss.js';

class ForgotPasswordForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      emailSent: false,
    };

    this.fields = {};
  }

  onResetPasswordClick(e) {
    e.preventDefault();
    const isValid = MaterialHelper.checkAll(this.fields);
    if (isValid !== true) {
      return;
    }

    // call the method to send reset password link
    Meteor.call('users.forgotPassword', { email: $(this.fields.email)[0].value }, (error, result) => {
      if (error) {
        showError(error.message);
      }
      if (result) {
        this.setState({
          emailSent: true,
        });
      }
    });
  }

  onBackClick(e) {
    e.preventDefault();
    this.props.history.push('/accounts/login');
  }

  renderResetForm() {
    return (
      <div className="row">
        <h3 className="center-align">Reset Password</h3>
        <form className="col s12">
          <div className="row">
            <div className="input-field col s12">
              <input
                id="email"
                ref={(input) => { this.fields.email = input; }}
                type="email"
                className="validate"
                required
              />
              <label htmlFor="email">Email</label>
            </div>
          </div>
          <div className="row center-align">
            <div className="col s6">
              <button
                className="waves-effect waves-light btn"
                onClick={(e) => { this.onResetPasswordClick(e); }}
              >Reset Password
              </button>
            </div>
            <div className="col s6">
              <button
                className="waves-effect waves-light btn"
                onClick={(e) => { this.onBackClick(e); }}
              >Back
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }

  renderResultForm() {
    return (
      <div className="container">
        <h3>Please check email</h3>
        <p>An email which has reset pasword link has sent to you. Please check your email.</p>
      </div>
    );
  }

  render() {
    return (
      <div className="forgot-password-wrapper">
        {this.state.emailSent ? this.renderResultForm() : this.renderResetForm()}
      </div>
    );
  }
}

export default ForgotPasswordForm;
