import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getTrackLocation } from '../../actions/get-track-location';
import { getTrackMeta } from '../../actions/get-track-meta';

export class QueueItem extends Component {
  constructor(props) {
    super(props);

    this.onClick = this.onClick.bind(this);
  }

  onClick(event) {
    event.preventDefault();
    const artistId = this.props.track.artistId;
    const albumId = this.props.track.albumId;
    const trackId = this.props.track.id;
    this.props.getTrackLocation(`artist/${artistId}/album/${albumId}/track/${trackId}`);
    this.props.getTrackMeta(this.props.track);
  }

  render() {
    return (
      <li key={this.props.track.id}>
        <a onClick={this.onClick} className='skel-layers-ignoreHref'>
          <span className='icon fa-play'>{this.props.track.title}</span>
        </a>
      </li>
    );
  }
}

export default connect(null, { getTrackLocation, getTrackMeta })(QueueItem);
