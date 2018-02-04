import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchAlbums } from '../actions/fetch-albums';
import Grid from './grid';

export class AlbumsGrid extends Grid {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchAlbums(`artist/${this.props.match.params.artistId}/albums`);
  }

  render() {
    return super.render();
  }
}

function mapStateToProps(state) {
  return {
    gridTitle: state.gridInfo.gridTitle,
    gridHeading: state.gridInfo.gridHeading,
    gridData: state.albums
  };
}

export default connect(mapStateToProps, { fetchAlbums })(AlbumsGrid);
