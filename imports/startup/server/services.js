import { Meteor } from 'meteor/meteor';
import { ServiceConfiguration } from 'meteor/service-configuration';

Meteor.startup(function() {
  ServiceConfiguration.configurations.upsert(
    { service: 'facebook' },
    {
      $set: {
        loginStyle: 'popup',
        appId: '1067602116715609', // See table below for correct property name!
        secret: '02d12897bf2f9797ede0f48a15b942e8',
      },
    },
  );
});
