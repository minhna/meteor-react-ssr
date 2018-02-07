import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';

import { showError } from '/imports/ui/helpers/alerts.js';

import MaterialHelper from '/imports/ui/helpers/materialcss.js';

class RegisterForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      password2: '',
      loading: false,
    };

    this.fields = {};
  }

  componentDidMount() {

  }

  onCreateAccount(e) {
    e.preventDefault();
    const checkResult = MaterialHelper.checkAll(this.fields);
    // console.log(checkResult);
    if (checkResult !== true) {
      // console.log(checkResult);
      return;
    }

    if (this.state.loading === true) {
      // console.log('loading');
      return;
    }

    this.setState({
      loading: true,
    });

    const { email, password } = this.state;
    Meteor.call('users.register', {
      email,
      password,
    }, (error, result) => {
      this.setState({
        loading: false,
      });
      if (error) {
        showError(error.message);
        // console.log(error);
        return;
      }
      if (result) {
        // login this user
        // Meteor.loginWithPassword(email, password, (err) => {
        //   if (err) {
        //     showError(err.message);
        //   }
        // });
        // send user to login page
        this.props.history.push('/accounts/login');
      }
    });
  }

  onCancel(e) {
    e.preventDefault();
    // send user to login page
    this.props.history.push('/accounts/login');
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
        <h3 className="center-align">Create Account</h3>
        <form className="col s12">
          <div className="row">
            <div className="input-field col s12">
              <input
                id="email"
                type="email"
                className="validate"
                required
                ref={(input) => { this.fields.email = input; }}
                value={this.state.email}
                onChange={(e) => { this.onFieldChange('email', e.target.value); }}
              />
              <label htmlFor="email">Email address</label>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s12">
              <input
                id="password"
                type="password"
                required
                ref={(input) => { this.fields.password = input; }}
                value={this.state.password}
                onChange={(e) => { this.onFieldChange('password', e.target.value); }}
              />
              <label htmlFor="password">Password</label>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s12">
              <input
                id="password2"
                type="password"
                ref={(input) => { this.fields.password2 = input; }}
                value={this.state.password2}
                onChange={(e) => { this.onFieldChange('password2', e.target.value); }}
              />
              <label htmlFor="password2">Re-Enter Password</label>
            </div>
          </div>
          <div className="row center-align">
            <div className="col s12 m6">
              <button
                className={submitBtnClass}
                onClick={(e) => { this.onCreateAccount(e); }}
              >Create Account
              </button>
            </div>
            <div className="col s12 m6">
              <button className="waves-effect waves-light btn grey" onClick={(e) => { this.onCancel(e); }}>Cancel</button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default RegisterForm;
