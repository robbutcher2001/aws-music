import React, { Component } from 'react';
import { connect } from 'react-redux';

import Loading from './common/loading';
import RowItem from './common/grid/row-item';
import Container from './common/grid/container';

import { createRowData } from './common/grid/helpers';
import { fetchArtists } from '../actions/fetch-artists';

const loadingTitle = 'Artists';
const loadingHeading = 'Hold up, loading..';
const loadedTitle = 'Artists';
const loadedHeading = 'Who would you like to listen to?';

const GridRow = props => {
  const RowItems = props.rowData.map(rowItem => {
    return (
      <RowItem key={rowItem.id} rowItem={rowItem} link={`/artist/${rowItem.id}`} />
    );
  });

  return (
    <div className="row">
      {RowItems}
    </div>
  );
}

export class ArtistsGrid extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchArtists('artists');
  }

  render() {
    if (!this.props.artists || this.props.artists.length < 1) {
      return <Loading title={loadingTitle} heading={loadingHeading} />
    }

    const rowData = createRowData(this.props.artists);

    const GridRows = rowData.map(row => {
      return (
        <GridRow key={row[0].id} rowData={row} />
      );
    });

    return <Container title={loadedTitle} heading={loadedHeading} rows={GridRows} />
  }
}

function mapStateToProps(state) {
  return {
    artists: state.picker.artists
  };
}

export default connect(mapStateToProps, { fetchArtists })(ArtistsGrid);
