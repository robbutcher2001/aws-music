import React, { Component } from 'react';
import { connect } from 'react-redux';

import Loading from './common/loading';
import RowItem from './common/grid/row-item';
import Container from './common/grid/container';

import { createRowData } from './common/grid/helpers';
import { fetchAlbums } from '../actions/fetch-albums';

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
    this.props.fetchAlbums(`artist/${this.props.match.params.artistId}/albums`);
  }

  render() {
    if (!this.props.albums || this.props.albums.length < 1) {
      return <Loading title='blah' heading='something' />
    }

    const rowData = createRowData(this.props.albums);

    const GridRows = rowData.map(row => {
      return (
        <GridRow key={row[0].id} rowData={row} artistId={this.props.match.params.artistId}/>
      );
    });

    return <Container title='done' heading='more' rows={GridRows} />
  }
}

function mapStateToProps(state) {
  return {
    gridTitle: state.gridInfo.gridTitle,
    gridHeading: state.gridInfo.gridHeading,
    albums: state.albums
  };
}

export default connect(mapStateToProps, { fetchAlbums })(AlbumsGrid);
