import SimpleSchema from 'simpl-schema';
import { Mongo } from 'meteor/mongo';

const Tests = new Mongo.Collection('tests');

Tests.schema = new SimpleSchema({
  createdAt: {
    type: String,
    label: 'The date this document was created.',
    optional: true,
  },
  updatedAt: {
    type: String,
    label: 'The date this document was last updated.',
    optional: true,
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
    optional: true,
  },
  'favorites.$': {
    type: String,
    label: 'A user who has favorited this document.',
    optional: true,
  },
});

export default Tests;
