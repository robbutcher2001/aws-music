import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchArtists } from '../actions/fetch-artists';

import Grid from './grid';

export class ArtistsGrid extends Grid {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchArtists('artists');
  }

  render() {
    return super.render();
  }
}

function mapStateToProps(state) {
  return {
    gridTitle: state.gridInfo.gridTitle,
    gridHeading: state.gridInfo.gridHeading,
    gridData: state.artists
  };
}

export default connect(mapStateToProps, { fetchArtists })(ArtistsGrid);
