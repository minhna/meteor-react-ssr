// All links-related publications

import { Meteor } from 'meteor/meteor';
// import { check, Match } from 'meteor/check';

// for development only
import { getIndexes, explainQuery } from '/imports/helpers/server/explainQuery.js';

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

  // for development only
  getIndexes(Tests);
  explainQuery(Tests, query, options);

  return Tests.find(query, options);
});

Meteor.publish('tests.mine.noreactive', function () {
  if (!this.userId) {
    return this.ready();
  }

  const query = {
    owner: this.userId,
  };

  const options = {
    fields: { createdAt: 0 },
  };

  const tests = Tests.find(query, options);
  tests.forEach(test => this.added('tests', test._id, test));
  this.ready();
});
