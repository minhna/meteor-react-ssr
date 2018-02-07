import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

import { showError, showSuccess } from '/imports/ui/helpers/alerts.js';
import MaterialHelper from '/imports/ui/helpers/materialcss.js';

class ResetPasswordForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: '',
      loading: false,
    };

    this.fields = {};
  }

  componentDidMount() {

  }

  onResetPassword(e) {
    e.preventDefault();
    const checkResult = MaterialHelper.checkAll(this.fields);
    // console.log(checkResult);
    if (checkResult !== true) {
      console.log(checkResult);
      return;
    }

    if (this.state.loading === true) {
      console.log('loading');
      return;
    }

    this.setState({
      loading: true,
    });

    // call method to reset password
    const { token } = this.props.match.params;

    Accounts.resetPassword(token, this.state.password, (err) => {
      if (err) {
        showError(err.message);
      } else {
        // send user to login page
        this.props.history.push('/accounts/login');
      }
    });
  }

  onCancel(e) {
    e.preventDefault();
    // send user to profile page
    this.props.history.push('/accounts/login');
  }

  onFieldChange(field, value) {
    // console.log(field, value);
    const setObj = {};
    setObj[field] = value;
    this.setState(setObj);
  }

  render() {
    let submitBtnClass = 'waves-effect waves-light btn';
    if (this.state.loading) {
      submitBtnClass += ' disabled';
    }

    return (
      <div className="row">
        <h3 className="center-align">Reset Password</h3>
        <form className="col s12">
          <div className="row">
            <div className="input-field col s12">
              <input
                id="password"
                type="password"
                ref={(input) => { this.fields.password = input; }}
                className="validate"
                required
                pattern=".{6,15}"
                value={this.state.password}
                onChange={(e) => { this.onFieldChange('password', e.target.value); }}
              />
              <label htmlFor="password" data-error="Password must be at least 6 characters, but not more than 15">New Password</label>
            </div>
          </div>
          <div className="row center-align">
            <div className="col s6">
              <button
                className={submitBtnClass}
                onClick={(e) => { this.onResetPassword(e); }}
              >Reset Password
              </button>
            </div>
            <div className="col s6">
              <button className="waves-effect waves-light btn grey" onClick={(e) => { this.onCancel(e); }}>Cancel</button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default ResetPasswordForm;
