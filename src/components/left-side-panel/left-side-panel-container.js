import React, { Component } from 'react';

import NowPlaying from './now-playing';
import UpNext from './up-next';

export default class LeftSidePanelContainer extends Component {
  render() {
    return (
      <div id="header">
        <div className="top">
          <NowPlaying />
          <UpNext />
        </div>
      </div>
    );
  }
}
