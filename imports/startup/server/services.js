import { Meteor } from 'meteor/meteor';
import { ServiceConfiguration } from 'meteor/service-configuration';

Meteor.startup(function() {
  ServiceConfiguration.configurations.upsert(
    { service: 'facebook' },
    {
      $set: {
        loginStyle: 'popup',
        appId: 'THE_APP_ID', // See table below for correct property name!
        secret: 'THE_KEY',
      },
    },
  );
  ServiceConfiguration.configurations.upsert(
    { service: 'google' },
    {
      $set: {
        loginStyle: 'popup',
        clientId: 'THE_CLIENT_ID', // See table below for correct property name!
        secret: 'SOME_KEY',
      },
    },
  );
});
