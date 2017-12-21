import { Meteor } from 'meteor/meteor';

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
});
