import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import MusicBanner from './music-banner';
// import ArtistsView from './artist-album-grid-view/artists-view';
import ArtistsGrid from '../../containers/artists-grid';
import AlbumsGrid from '../../containers/albums-grid';
import TrackList from '../../containers/track-list';

export default class RightSideViewContainer extends Component {
  render() {
    return (
      <div id="main">
        <MusicBanner />
        <BrowserRouter>
          <Switch>
            <Route path='/artist/:artistId/album/:albumId' component={TrackList} />
            <Route path='/artist/:artistId' component={AlbumsGrid} />
            <Route path='/' component={ArtistsGrid} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}
