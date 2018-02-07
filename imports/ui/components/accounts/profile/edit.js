import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';

import { UserHelper } from '/imports/helpers/user.js';
import MaterialHelper from '/imports/ui/helpers/materialcss.js';

import { SelectBox } from '/imports/ui/components/common/form.js';

import Loading from '/imports/ui/components/common/loading.js';

class ProfileEdit extends Component {

  constructor(props){
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      phone: '',
      phoneCode: '',
      email: '',
      country: '',
      loading: false
    }
  }

  _updateState(user){
    if(user){
      const country = user.profile ? CountriesHelper.getCountryByShortCode(user.profile.country) : null;
      const phone = UserHelper.getPhone(user);
      const email = UserHelper.getEmail(user);

      this.setState({
        firstName: user.profile ? user.profile.firstName : '',
        lastName: user.profile ? user.profile.lastName : '',
        phone: phone ? phone.number : '',
        phoneCode: country ? country.phoneCode: '',
        email: email.address,
        country: country ? country.shortCode : ''
      }, ()=>{
        Materialize.updateTextFields();
        this.onCountryChange(this.state.country);
      });
    }
  }

  componentWillMount(){
    this._updateState(this.props.user);
  }

  componentWillReceiveProps(nextProps){
    this._updateState(nextProps.user);
  }

  onFirstNameChange(e){
    e.preventDefault();
    this.setState({
      firstName: e.target.value
    });
  }

  onLastNameChange(e){
    e.preventDefault();
    this.setState({
      lastName: e.target.value
    });
  }

  onEmailChange(e){
    e.preventDefault();
    this.setState({
      email: e.target.value
    });
  }

  onCancel(e){
    e.preventDefault();
    //send user to profile page
    this.props.params.history.push('/accounts/profile');
  }

  onSave(e){
    const checkResult = MaterialHelper.checkAll(this.refs);
    // console.log(checkResult);
    if(checkResult !== true){
      console.log(checkResult);
      return;
    }

    if(this.state.loading === true){
      console.log('loading');
      return;
    }

    this.setState({
      loading: true
    });

    Meteor.call("users.updateProfile", {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      country: this.state.country,
      phone: this.state.phone
    }, (error, result)=>{
      this.setState({
        loading: false
      });
      if(error){
        showError(error.message);
      }
      else {
        //send user to profile page
        this.props.params.history.push('/accounts/profile');
        Meteor.setTimeout(function(){
          showSuccess('Profile updated successfully');
        }, 100);
      }
    });
  }

  onCountryChange(shortCode){
    //get the country phone code
    const country = CountriesHelper.getCountryByShortCode(shortCode);
    const phoneCode = country ? country.phoneCode : '';
    let currentPhone = this.state.phone;
    //fist, remove current phone code from current phone
    const pat = new RegExp('^\\+'+this.state.phoneCode);
    currentPhone = currentPhone.replace(pat, "");
    //then add new phone code to the begining
    currentPhone = '+' + phoneCode + currentPhone;

    this.setState({
      country: shortCode,
      phoneCode: country ? country.phoneCode : '',
      phone: currentPhone
    }, ()=>{
      Materialize.updateTextFields();
    });
  }

  onPhoneChange(e){
    e.preventDefault();
    const pat = new RegExp('^\\+'+this.state.phoneCode);
    //check if the value contains phone code
    if(this.state.phoneCode){
      if(!pat.test(e.target.value)){
        return;
      }
    }
    //check invalid char
    const pat2 = new RegExp('[^0-9\\+\\- ]');
    if(pat2.test(e.target.value)){
      return;
    }

    let value = e.target.value;
    //remove some multiple chars near by
    value = value.replace(/([\\-]+)/g, '-');
    value = value.replace(/(\s+)/g, ' ');
    //only allow + char at the begining
    value = value.replace(/(?!^)[\\+]/g, '');

    this.setState({
      phone: value
    });
  }

  renderCountrySelectOptions(){
    return CountriesHelper.list().map((country)=>{
      return (
        {text: country.name, value: country.shortCode}
      );
    })
  }

  renderUserInfo(){
    if(!this.props.user){
      return null;
    }

    return (
      <div className="container">
        <div className="row">
          <div className="input-field col s12">
            <input id="first-name" type="text" className="validate" ref="firstName"
              value={this.state.firstName} onChange={(e)=>{this.onFirstNameChange(e)}}/>
            <label htmlFor="first-name">First Name</label>
          </div>
        </div>
        <div className="row">
          <div className="input-field col s12">
            <input id="last-name" type="text" className="validate" ref="lastName"
              value={this.state.lastName} onChange={(e)=>{this.onLastNameChange(e)}}/>
            <label htmlFor="last-name">Last Name</label>
          </div>
        </div>
        <div className="row">
          <div className="input-field col s12">
            <input disabled id="email" type="email" className="validate" ref="email"
              value={this.state.email} onChange={(e)=>{this.onEmailChange(e)}}/>
            <label htmlFor="email">Email address</label>
          </div>
        </div>
        <div className="row">
          <div className="input-field col s12">
            <SelectBox id="country" placeholder="Select your country" options={this.renderCountrySelectOptions()}
              onChangeCallback={this.onCountryChange.bind(this)} value={this.state.country} required={true}
              ref={(input)=>{this.refs.country = input}} />
            <label htmlFor="country">Country</label>
          </div>
        </div>
        <div className="row">
          <div className="input-field col s12">
            <i className="material-icons prefix">phone_android</i>
            <input id="phone" type="tel" className="validate" ref="phone"
              value={this.state.phone} onChange={(e)=>{this.onPhoneChange(e)}}/>
            <label htmlFor="phone">Mobile Phone</label>
          </div>
        </div>
      </div>
    )
  }

  render() {
    return (
      <div className="user-profile-wrapper">
        <h3 className="center-align">Update Profile</h3>
        {this.renderUserInfo()}

        <div className="row">
          <div className="col s6 center-align">
            <button className="waves-effect waves-light btn" onClick={(e)=>{this.onSave(e)}}>Save</button>
          </div>
          <div className="col s6 center-align">
            <button className="waves-effect waves-light btn" onClick={(e)=>{this.onCancel(e)}}>Cancel</button>
          </div>
        </div>

        <Loading loading={this.props.loadingUser} zIndex={10} />
      </div>
    )
  }
}

export default withTracker((props)=>{
  let returnObj = {
    user: null,
    loadingUser: true
  }

  //load the user
  const userSub = Meteor.subscribe("users.current");
  if(userSub.ready()){
    returnObj.user = Meteor.users.findOne({_id: Meteor.userId()});
    returnObj.loadingUser = false;
  }

  return returnObj;
})(ProfileEdit);
