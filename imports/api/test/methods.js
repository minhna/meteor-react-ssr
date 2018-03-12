import { Meteor } from 'meteor/meteor';
import { DDPRateLimiter } from 'meteor/ddp-rate-limiter';

import Tests from './tests.js';

Meteor.methods({
  'test.task': async ({ index }) => {
    // console.log('do task with index: '+index);

    function waitXSeconds(x) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(x);
        }, x * 1000);
      });
    }

    await waitXSeconds(2);
    return index;
  },

  'test.insert': ({ data }) => {
    const validationContext = Tests.schema.newContext();
    validationContext.validate(data);
    if (validationContext.isValid()) {
      const data2 = data;
      data2.createdAt = new Date();
      Tests.insert(data2);
    } else {
      // do something
      const errors = validationContext.validationErrors().map(elm => `${elm.name} is ${elm.type}, actual value: ${elm.value}`);
      throw new Meteor.Error('001', errors[0]);
      // console.log(validationContext.validationErrors());
    }

    return 'finished';
  },
});

const testInsertRule = {
  type: 'method',
  name: 'test.insert',
};
DDPRateLimiter.addRule(testInsertRule, 2, 10000);
