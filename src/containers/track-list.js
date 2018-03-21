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

export class TrackList extends Component {
  constructor(props) {
    super(props);

    this.state = { heading: 'Click tracks to queue' };
  }

  componentDidMount() {
    const artistId = this.props.match.params.artistId;
    const albumId = this.props.match.params.albumId;
    this.props.fetchTracks(`artist/${artistId}/album/${albumId}/tracks`);
  }

  //TODO: this class shouldn't render both title/heading of grid and the track list.
  // Split the rendering of these into two separate components so you can update the
  // heading without having to re-render the track list
  trackSelected(track) {
    this.setState({ heading: `${track.title} queued` });
  }

  createTrackButtons() {
    const TrackButtons = this.props.tracks.map(track => {
      return (
        <li key={track.id}>
          <TrackButton
            onTrackSelect={selectedTrack => this.trackSelected(selectedTrack)}
            track={track}
            artistId={this.props.match.params.artistId}
            albumId={this.props.match.params.albumId} />
        </li>
      );
    });

    return (
      <ol className="track-list ">
        {TrackButtons}
      </ol>
    );
  }

  render() {
    if (!this.props.tracks || this.props.tracks.length < 1) {
      return <Loading title={loadingTitle} heading={loadingHeading} />
    }

    const artistId = this.props.match.params.artistId;
    const albumId = this.props.match.params.albumId;

    let loadedTitle = getLoadedTitle(this.props.tracks);
    const trackButtons = this.createTrackButtons();

    return <Container title={loadedTitle} heading={this.state.heading} rows={trackButtons} />
  }
}

function mapStateToProps(state) {
  return {
    tracks: state.picker.tracks
  };
}

export default connect(mapStateToProps, { fetchTracks })(TrackList);
