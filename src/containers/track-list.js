import React, { Component } from 'react';
import { connect } from 'react-redux';

import Loading from './common/loading';
import RowItem from './common/grid/row-item';
import Container from './common/grid/container';

import { fetchTracks } from '../actions/fetch-tracks';

const loadingTitle = 'Tracks';
const loadingHeading = 'Grabbing tracks..';

const getLoadedTitle = tracks => {
  let loadedTitle;
  tracks.forEach(track => {
    if (typeof loadedTitle === 'undefined') {
      loadedTitle = track.artist.concat(' - ').concat(track.album);
    }
  });

  return loadedTitle;
}

const getLoadedHeading = tracks => {
  let loadedHeading;
  tracks.forEach(track => {
    if (typeof loadedHeading === 'undefined') {
      loadedHeading = track.year;
    }
  });

  return loadedHeading;
}

const List = props => {
  const Items = props.items.map(item => {
    return (
      <li key={item.id}>
        <a>{item.title}</a>
      </li>
    );
  });

  return (
    <ol className="track-list ">
      {Items}
    </ol>
  );
}

export class TrackList extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const artistId = this.props.match.params.artistId;
    const albumId = this.props.match.params.albumId;
    this.props.fetchTracks(`artist/${artistId}/album/${albumId}/tracks`);
  }

  render() {
    if (!this.props.tracks || this.props.tracks.length < 1) {
      return <Loading title={loadingTitle} heading={loadingHeading} />
    }

    let loadedTitle = getLoadedTitle(this.props.tracks);
    let loadedHeading = getLoadedHeading(this.props.tracks);
    const tracks = <List items={this.props.tracks}/>

    return <Container title={loadedTitle} heading={loadedHeading} rows={tracks} />
  }
}

function mapStateToProps(state) {
  return {
    tracks: state.picker.tracks
  };
}

export default connect(mapStateToProps, { fetchTracks })(TrackList);
