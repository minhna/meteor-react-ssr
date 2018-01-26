import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';

class TestSimpleSchema extends Component {

  onTestFailInsert(e) {
    e.preventDefault();
    Meteor.call('test.insert', { data: { title: 'abc' } }, (error, result) => {
      if (error) {
        console.log('error', error);
      }
      if (result) {
        console.log(result);
      }
    });
  }

  onTestSuccessInsert(e) {
    e.preventDefault();
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
      <div className="row">
        <div className="col s6">
          <button className="btn" onClick={(e) => { this.onTestFailInsert(e); }}>Test fail insert</button>
        </div>
        <div className="col s6">
          <button className="btn" onClick={(e) => { this.onTestSuccessInsert(e); }}>Test success insert</button>
        </div>
      </div>
    );
  }
}

export default TestSimpleSchema;
