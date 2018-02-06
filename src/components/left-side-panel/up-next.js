import React, { Component } from 'react';
import { connect } from 'react-redux';

const QueueItem = props => {
  return (
    <li key={props.title}>
      <a href="#top" id="top-link" className='skel-layers-ignoreHref'>
        <span className='icon fa-pause'>{props.title}</span>
      </a>
    </li>
  );
}

export class UpNext extends Component {
  constructor(props) {
    super(props);
  }

  renderWithNav(items) {
    return (
      <nav id="nav">
        <ul>
          {items}
        </ul>
      </nav>
    );
  }

  render() {
    if (!this.props.queue || this.props.queue.length < 1) {
      return this.renderWithNav(
        <div>
          <QueueItem title={'Nothing queued'} />
          <QueueItem title={'Click track to queue'} />
        </div>
      );
    }

    const QueuedTracks = this.props.queue.map(track => {
      return (
        <QueueItem key={track.location} title={track.location} />
      );
    });

    return this.renderWithNav(
      <div>
        {QueuedTracks}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    queue: state.queue
  };
}

export default connect(mapStateToProps)(UpNext);
