import React, { Component } from 'react';

class MainComponent extends Component {
  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}

export default MainComponent;
