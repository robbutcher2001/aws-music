import React, { Component } from 'react';
import { connect } from 'react-redux';

import QueueItem from './queue-item';

export class Queue extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (!this.props.queue || this.props.queue.length < 1) {
      return <div/>
    }

    const QueueItems = this.props.queue.map(track => {
      return (
        <QueueItem key={track.id} track={track} active={track.active} />
      );
    });

    return (
      <nav id="nav">
        <ul>
          {QueueItems}
        </ul>
      </nav>
    );
  }
}

function mapStateToProps(state) {
  return {
    queue: state.queue
  };
}

export default connect(mapStateToProps)(Queue);
