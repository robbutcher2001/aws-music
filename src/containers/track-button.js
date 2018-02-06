import React, { Component } from 'react';
import { connect } from 'react-redux';

import { queueTrack } from '../actions/queue-track';

export class TrackButton extends Component {
  constructor(props) {
    super(props);

    this.onClick = this.onClick.bind(this);
  }

  onClick(event) {
    event.preventDefault();

    const artistId = this.props.artistId;
    const albumId = this.props.albumId;
    const trackId = this.props.track.id;
    this.props.queueTrack(`artist/${artistId}/album/${albumId}/track/${trackId}`);
  }

  render() {
    return (
      <a onClick={this.onClick}>{this.props.track.title}</a>
    );
  }
}

export default connect(null, { queueTrack })(TrackButton);
