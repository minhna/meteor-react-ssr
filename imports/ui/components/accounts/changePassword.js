import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

import { showError, showSuccess } from '/imports/ui/helpers/alerts.js';
import MaterialHelper from '/imports/ui/helpers/materialcss.js';

class ChangePasswordForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPassword: '',
      password: '',
      password2: '',
      loading: false,
    };

    this.fields = {};
  }

  componentWillMount() {
    if (!Meteor.userId()) {
      // user must login to use this feature
      this.props.history.push('/accounts/login');
      Meteor.setTimeout(() => {
        showError('Please login first');
      }, 100);
    }
  }

  componentDidMount() {

  }

  onChangePassword(e) {
    e.preventDefault();
    const checkResult = MaterialHelper.checkAll(this.fields);
    // console.log(checkResult);
    if (checkResult !== true) {
      console.log(checkResult);
      return;
    }

    // check new password confirmation
    if (this.state.password !== this.state.password2) {
      showError('New password confirmation doesn\'t match');
      return;
    }

    if (this.state.loading === true) {
      console.log('loading');
      return;
    }

    this.setState({
      loading: true,
    });

    Accounts.changePassword(this.state.currentPassword, this.state.password, (err) => {
      this.setState({
        loading: false,
      });

      if (err) {
        if (err.message) {
          showError(err.message);
        } else {
          console.log(err);
        }
      } else {
        Meteor.logoutOtherClients();
        Meteor.logout((err2) => {
          if (err2) {
            if (err2.message) {
              showError(err2.message);
            } else {
              console.log(err2);
            }
          } else {
            // send user to login page
            this.props.history.push('/accounts/login');
            Meteor.setTimeout(() => {
              showSuccess('Password changed successfully. Please login again.');
            }, 100);
          }
        });
      }
    });
  }

  onCancel(e) {
    e.preventDefault();
    // send user to profile page
    this.props.history.push('/accounts/profile');
  }

  onFieldChange(field, value) {
    // console.log(field, value);
    const setObj = {};
    setObj[field] = value;
    this.setState(setObj, () => {
      if (field === 'password' || field === 'password2') {
        this.validatePassword();
      }
    });
  }

  validatePassword() {
    let passwordValid = true;
    let password2Valid = true;
    if (this.state.password === '') {
      passwordValid = false;
    } else {
      passwordValid = true;
    }

    if (this.state.password2 === '') {
      password2Valid = false;
    } else if (this.state.password2 !== this.state.password) {
      password2Valid = false;
    } else {
      password2Valid = true;
    }

    $(this.fields.password).addClass(passwordValid ? 'valid' : 'invalid');
    $(this.fields.password).removeClass(passwordValid ? 'invalid' : 'valid');
    $(this.fields.password2).addClass(password2Valid ? 'valid' : 'invalid');
    $(this.fields.password2).removeClass(password2Valid ? 'invalid' : 'valid');
  }

  render() {
    let submitBtnClass = 'waves-effect waves-light btn';
    if (this.state.loading) {
      submitBtnClass += ' disabled';
    }

    return (
      <div className="row">
        <h3 className="center-align">Change Password</h3>
        <form className="col s12">
          <div className="row">
            <div className="input-field col s12">
              <input
                id="current-password"
                type="password"
                ref={(input) => { this.fields.currentPassword = input; }}
                className="validate"
                required
                value={this.state.currentPassword}
                onChange={(e) => { this.onFieldChange('currentPassword', e.target.value); }}
              />
              <label htmlFor="current-password">Current Password</label>
            </div>
          </div>
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
          <div className="row">
            <div className="input-field col s12">
              <input
                id="password2"
                type="password"
                ref={(input) => { this.fields.password2 = input; }}
                className="validate"
                required
                pattern=".{6,}"
                value={this.state.password2}
                onChange={(e) => { this.onFieldChange('password2', e.target.value); }}
              />
              <label htmlFor="password2">Re-Enter Password</label>
            </div>
          </div>
          <div className="row center-align">
            <button
              className={submitBtnClass}
              onClick={(e) => { this.onChangePassword(e); }}
            >Change Password
            </button>
          </div>
          <div className="row center-align">
            <button className="waves-effect waves-light btn grey" onClick={(e) => { this.onCancel(e); }}>Cancel</button>
          </div>
        </form>
      </div>
    );
  }
}

export default ChangePasswordForm;
