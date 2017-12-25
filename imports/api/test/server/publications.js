// All links-related publications

import { Meteor } from 'meteor/meteor';
// import { check, Match } from 'meteor/check';
import Tests from '../tests.js';

Meteor.publish('tests.mine', function () {
  if (!this.userId) {
    return this.ready();
  }

  const query = {
    owner: this.userId,
  };

  const options = {
    fields: { createdAt: 0 },
  };

  return Tests.find(query, options);
});
