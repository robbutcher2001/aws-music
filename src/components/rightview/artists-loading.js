import React, { Component } from 'react';

export default class App extends Component {
  render() {
    return (
      <div id="loading" className="row">
        <div className="12u 12u(mobile)">
          <i className="fa fa-cog fa-spin fa-3x fa-fw"></i>
          <span className="sr-only">Loading..</span>
        </div>
      </div>
    );
  }
}
