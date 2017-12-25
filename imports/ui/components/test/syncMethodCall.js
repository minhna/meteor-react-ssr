import React, { Component } from 'react';

import callWithPromise from '/imports/helpers/call-with-promise.js';

class TestSyncMethodCall extends Component {
  onTest(e) {
    const callMethod = async () => {
      const result1 = await callWithPromise('test.task', { index: 1 });
      console.log(result1);
      const result2 = await callWithPromise('test.task', { index: 2 });
      console.log(result2);
    };

    callMethod();
  }

  render() {
    return (
      <div>
        <button className="btn" onClick={(e) => { this.onTest(e); }}>Test Sync Method Call</button>
      </div>
    );
  }
}

export default TestSyncMethodCall;
