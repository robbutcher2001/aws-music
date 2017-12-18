import React, { Component } from 'react';

import MusicBanner from './music-banner';
import Artists from './artists';

export default class App extends Component {
  render() {
    return (
      <div id="main">
        <MusicBanner />
        <Artists />
      </div>
    );
  }
}