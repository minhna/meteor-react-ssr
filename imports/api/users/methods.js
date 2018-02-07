// Methods related to users

import { Meteor } from 'meteor/meteor';
import { Email } from 'meteor/email';
import { Match } from 'meteor/check';
import { Accounts } from 'meteor/accounts-base';
// import moment from 'moment';

// import { Permissions } from '/imports/common/helpers/permissions';
// import { Rules } from '/imports/api/rules/rules.js';
// import { UserHelper } from '/imports/helpers/user.js';

Meteor.methods({
  'users.register': ({ email, password }) => {
    if (!Match.test(email, String)) {
      throw Meteor.Error('users.create.3', 'Invalid Email');
    }
    // check if email is existing
    if (Meteor.users.findOne({ email })) {
      throw Meteor.Error('users.create.4', 'Email is existing');
    }

    if (!Match.test(password, String)) {
      throw Meteor.Error('users.create.7', 'Invalid Password');
    }

    // console.log(email, password);
    if (Meteor.isServer) {
      const userId = Accounts.createUser({ email, password });
      if (userId) {
        // send confirmation email
        const { email: realEmail, user, token } =
          Accounts.generateVerificationToken(userId, email);
        const url = Meteor.absoluteUrl(`accounts/verify-email/${token}`);
        const options = Accounts.generateOptionsForEmail(realEmail, user, url, 'verifyEmail');
        Email.send(options);

        return userId;
      }
    }

    return false;
  },

  'users.forgotPassword': ({ email }) => {
    if (!Match.test(email, String)) {
      throw Meteor.Error('users.forgotPassword.1', 'Invalid Email');
    }

    if (Meteor.isServer) {
      const userToReset = Accounts.findUserByEmail(email);
      if (userToReset) {
        // Accounts.sendResetPasswordEmail(user._id, email);
        const { email: realEmail, user, token } = Accounts.generateResetToken(userToReset._id, email, 'resetPassword');
        // console.log(realEmail, user, token);
        // send email
        const url = Meteor.absoluteUrl(`accounts/reset-password/${token}`);
        const options = Accounts.generateOptionsForEmail(realEmail, user, url, 'resetPassword');
        // console.log(options);
        Email.send(options);
      }
    }

    return true;
  },
});
