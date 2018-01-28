import React, { Component } from 'react';

import LeftSidePanelContainer from './left-side-panel/left-side-panel-container';
// import RightSideViewContainer from './right-side-view/right-side-view-container';

//temp
import ItemView from '../containers/item-view';

export default class MusicApp extends Component {
  render() {
    return (
      <div>
        <LeftSidePanelContainer />
        <ItemView />
      </div>
    );
  }
}
