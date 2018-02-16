import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getTrackLocation } from '../../actions/get-track-location';
import { getTrackMeta } from '../../actions/get-track-meta';
import { reshuffleQueue } from '../../actions/reshuffle-queue';
import { makeTrackActive } from '../../actions/make-track-active';

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
    this.props.reshuffleQueue(this.props.track);
    this.props.makeTrackActive(this.props.track);
  }

  render() {
    if (this.props.active) {
      return (
        <li key={this.props.track.id}>
          <a onClick={this.onClick} className='skel-layers-ignoreHref active'>
            <span className='icon fa-music'>{this.props.track.title}</span>
          </a>
        </li>
      );
    }
    else {
      return (
        <li key={this.props.track.id}>
          <a onClick={this.onClick} className='skel-layers-ignoreHref'>
            <span>{this.props.track.title}</span>
          </a>
        </li>
      );
    }
  }
}

export default connect(null, { getTrackLocation, getTrackMeta, reshuffleQueue, makeTrackActive })(QueueItem);
