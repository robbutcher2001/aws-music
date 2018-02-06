import React, { Component } from 'react';
import { connect } from 'react-redux';

export class NowPlaying extends Component {
  constructor(props) {
    super(props);
  }

  renderNowPlaying(extraContent) {
    return (
      <div>
        <div id="logo">
          <span className="image avatar48">
            <img src="/album-art/london-grammar-if-you-wait" alt="London Grammar album art" />
          </span>
          <h1 id="title">Now playing</h1>
          <p>London Grammar | 2014</p>
        </div>
        {extraContent}
      </div>
    );
  }

  render() {
    if (!this.props.queue || this.props.queue.length < 1) {
      return this.renderNowPlaying();
    }

    return this.renderNowPlaying(
      <audio autoPlay controls preload="auto" title="iOS test title" style={{width: '100%'}}>
        <source src={'/' + this.props.queue.pop().location}/>
      </audio>
    );
  }
}

function mapStateToProps(state) {
  return {
    queue: state.queue
  };
}

export default connect(mapStateToProps)(NowPlaying);
