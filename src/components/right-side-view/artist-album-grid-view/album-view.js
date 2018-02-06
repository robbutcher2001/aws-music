import React, { Component } from 'react';

import GenericView from './generic-view';
import Grid from './grid';

export default class AlbumView extends GenericView {
  constructor(props) {
    super(props);

    this.state = {
      gridTitle: 'Albums',
      gridHeading: 'Grabbing albums..',
      gridData: []
    }

    super.fetchGridData('artist/1/albums', 'Which is your favourite album?');
  }

  render() {
    return super.render();
  }
}
