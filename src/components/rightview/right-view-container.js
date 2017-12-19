import React, { Component } from 'react';

import MusicBanner from './music-banner';
import Artists from './artists';

export default class RightViewContainer extends Component {
  render() {
    return (
      <div id="main">
        <MusicBanner />
        <Artists />
      </div>
    );
  }
}
