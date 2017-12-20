import React, { Component } from 'react';
import moment from 'moment';

class AdminDashboardPage extends Component {

  render(){
    return (
      <div>
        {moment().format("DD/MM/YYYY")}
      </div>
    )
  }
}

export default AdminDashboardPage;
