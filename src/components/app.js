import React, { Component } from 'react';

import SidePanel from './sidepanel/side-panel-container';
import RightView from './rightview/right-view-container';

export default class MusicApp extends Component {
  render() {
    return (
      <div>
        <SidePanel />
        <RightView />
      </div>
    );
  }
}
