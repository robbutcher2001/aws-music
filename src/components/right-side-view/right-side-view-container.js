import React, { Component } from 'react';

import MusicBanner from './music-banner';
import ArtistsView from './artist-album-grid-view/artists-view';

export default class RightSideViewContainer extends Component {
  render() {
    return (
      <div id="main">
        <MusicBanner />
        <ArtistsView />
      </div>
    );
  }
}
