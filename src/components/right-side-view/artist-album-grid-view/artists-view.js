import React, { Component } from 'react';

import GenericView from './generic-view';
import Grid from './grid';

export default class ArtistsView extends GenericView {
  constructor(props) {
    super(props);

    this.state = {
      gridTitle: 'Artists',
      gridHeading: 'Hold up, loading..',
      gridData: []
    }

    super.fetchGridData('artists', 'Who would you like to listen to?');
  }

  render() {
    return super.render();
  }
}
