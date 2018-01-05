import React, { Component } from 'react';
import moment from 'moment';

class AdminDashboardPage extends Component {
  goBack() {
    this.props.history.goBack();
  }

  render() {
    return (
      <div>
        {moment().format('DD/MM/YYYY')}

        <div>
          <button className="btn" onClick={(e) => { this.goBack(e); }}>Go back</button>
        </div>
      </div>
    );
  }
}

export default AdminDashboardPage;
