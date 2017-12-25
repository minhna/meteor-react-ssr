import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';

class TestSimpleSchema extends Component {

  onTestInsert(e) {
    Meteor.call('test.insert', { data: { title: 'abc' } }, (error, result) => {
      if (error) {
        console.log('error', error);
      }
      if (result) {
        console.log(result);
      }
    });
  }

  render() {
    return (
      <div>
        <button className="btn" onClick={(e) => { this.onTestInsert(e); }}>Test insert</button>
      </div>
    );
  }
}

export default TestSimpleSchema;
