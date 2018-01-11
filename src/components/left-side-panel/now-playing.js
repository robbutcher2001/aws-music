import React, { Component } from 'react';

export default class NowPlaying extends Component {
  render() {
    return (
      <div id="logo">
        <span className="image avatar48">
          <img src="/album-art/london-grammar-if-you-wait" alt="London Grammar album art" />
        </span>
        <h1 id="title">Now playing</h1>
        <p>London Grammar | 2014</p>
      </div>
    );
  }
}
