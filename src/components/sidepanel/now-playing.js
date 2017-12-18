import React, { Component } from 'react';

export default class App extends Component {
  render() {
    return (
      <div id="logo">
        <span className="image avatar48">
          <img src="images/cb.png" alt="" />
        </span>
        <h1 id="title">Now playing</h1>
      </div>
    );
  }
}
