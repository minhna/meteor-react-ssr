import { Promise } from 'meteor/promise';

export const callWithPromise = (method, params) => {
  return new Promise((resolve, reject) => {
    Meteor.call(method, params, (error, result) => {
      if (error) reject(error);
      resolve(result);
    });
  });
}
