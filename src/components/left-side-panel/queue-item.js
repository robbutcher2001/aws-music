import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getTrack } from '../../actions/get-track';

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
    this.props.getTrack(`artist/${artistId}/album/${albumId}/track/${trackId}`);
  }

  render() {
    return (
      <li key={this.props.track.id}>
        <a onClick={this.onClick} className='skel-layers-ignoreHref'>
          <span className='icon fa-pause'>{this.props.track.title}</span>
        </a>
      </li>
    );
  }
}

export default connect(null, { getTrack })(QueueItem);
