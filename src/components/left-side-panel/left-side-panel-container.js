import React, { Component } from 'react';

import NowPlaying from './now-playing';
import Queue from './queue';

export default class LeftSidePanelContainer extends Component {
  render() {
    return (
      <div id="header">
        <div className="top">
          <NowPlaying />
          <Queue />
        </div>
      </div>
    );
  }
}
