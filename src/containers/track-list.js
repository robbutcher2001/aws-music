import React, { Component } from 'react';
import { connect } from 'react-redux';

import Loading from './common/loading';
import TrackButton from './track-button';
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

const TrackButtons = props => {
  const TrackButtons = props.tracks.map(track => {
    return (
      <li key={track.id}>
        <TrackButton track={track} artistId={props.artistId} albumId={props.albumId} />
      </li>
    );
  });

  return (
    <ol className="track-list ">
      {TrackButtons}
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

    const artistId = this.props.match.params.artistId;
    const albumId = this.props.match.params.albumId;

    let loadedTitle = getLoadedTitle(this.props.tracks);
    let loadedHeading = getLoadedHeading(this.props.tracks);
    const trackButtons = <TrackButtons tracks={this.props.tracks} artistId={artistId} albumId={albumId} />

    return <Container title={loadedTitle} heading={loadedHeading} rows={trackButtons} />
  }
}

function mapStateToProps(state) {
  return {
    tracks: state.picker.tracks
  };
}

export default connect(mapStateToProps, { fetchTracks })(TrackList);
