import { Meteor } from 'meteor/meteor';
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
      // do something
      console.log('valid');
    }
    if (validationContext.validationErrors()) {
      // do something
      console.log(validationContext.validationErrors());
    }

    return 'finished';
  },
});
