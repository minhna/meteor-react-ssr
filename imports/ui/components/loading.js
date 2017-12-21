import React, { Component } from 'react';

class Loading extends Component {

  render() {
    // console.log(this.props);
    if (this.props.error) {
      return <div>Error!</div>;
    } else if (this.props.timedOut) {
      return <div>Taking a long time...</div>;
    } else if (this.props.pastDelay) {
      return <div>Loading...</div>;
    } else {
      return null;
    }
  }
}

export default Loading;
