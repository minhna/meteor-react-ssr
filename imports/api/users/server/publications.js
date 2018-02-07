import { Meteor } from 'meteor/meteor';
// import { check, Match } from 'meteor/check';

Meteor.publish('users.current', function () {
  return Meteor.users.find({ _id: this.userId }, {
    fields: {
      profile: 1,
      roles: 1,
    },
  });
});
