import SimpleSchema from 'simpl-schema';
import { Mongo } from 'meteor/mongo';

const Tests = new Mongo.Collection('tests');

Tests.schema = new SimpleSchema({
  owner: {
    type: String,
    label: 'the ID of user this document belongs to.',
  },
  createdAt: {
    type: String,
    label: 'The date this document was created.',
    autoValue() {
      if (this.isInsert) return (new Date()).toISOString();
      return null;
    },
  },
  updatedAt: {
    type: String,
    label: 'The date this document was last updated.',
    autoValue() {
      if (this.isInsert || this.isUpdate) return (new Date()).toISOString();
      return null;
    },
  },
  title: {
    type: String,
    label: 'The title of the document.',
  },
  body: {
    type: String,
    label: 'The body of the document.',
  },
  favorites: {
    type: Array,
    label: 'Users who have favorited this document.',
    defaultValue: [],
  },
  'favorites.$': {
    type: String,
    label: 'A user who has favorited this document.',
  },
});

export default Tests;
