import React, { Component } from 'react';
import { connect } from 'react-redux';

import Loading from './common/loading';
import RowItem from './common/grid/row-item';
import Container from './common/grid/container';

import { createRowData } from './common/grid/helpers';
import { fetchAlbums } from '../actions/fetch-albums';

const loadingTitle = 'Albums';
const loadingHeading = 'Grabbing albums..';
const loadedTitle = 'Albums';
const loadedHeading = 'Which is your favourite album?';

const GridRow = props => {
  const RowItems = props.rowData.map(rowItem => {
    const link = `/artist/${props.artistId}/album/${rowItem.id}`;
    return (
      <RowItem key={rowItem.id} rowItem={rowItem} link={link} />
    );
  });

  return (
    <div className="row">
      {RowItems}
    </div>
  );
}

export class AlbumsGrid extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const artistId = this.props.match.params.artistId;
    this.props.fetchAlbums(`artist/${artistId}/albums`);
  }

  render() {
    if (!this.props.albums || this.props.albums.length < 1) {
      return <Loading title={loadingTitle} heading={loadingHeading} />
    }

    const rowData = createRowData(this.props.albums);

    const GridRows = rowData.map(row => {
      return (
        <GridRow key={row[0].id} rowData={row} artistId={this.props.match.params.artistId}/>
      );
    });

    return <Container title={loadedTitle} heading={loadedHeading} rows={GridRows} />
  }
}

function mapStateToProps(state) {
  return {
    albums: state.picker.albums
  };
}

export default connect(mapStateToProps, { fetchAlbums })(AlbumsGrid);
