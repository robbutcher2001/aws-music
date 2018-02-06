import React, { Component } from 'react';
import { connect } from 'react-redux';

export class NowPlaying extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (!this.props.queue || this.props.queue.length < 1) {
      return (
        <div id="logo">
          <span className="image avatar48">
            <img src="/album-art/london-grammar-if-you-wait" alt="London Grammar album art" />
          </span>
          <h1 id="title">Now playing</h1>
          <p>London Grammar | 2014</p>
        </div>
      );
    }

    return (
      <div id="logo">
        <span className="image avatar48">
          <img src="/album-art/london-grammar-if-you-wait" alt="London Grammar album art" />
        </span>
        <audio autoPlay controls preload="auto" title="iOS test title" style={{display: 'none'}}><source src={'/' + this.props.queue.pop().location}/></audio>
        <h1 id="title">Now playing</h1>
        <p>London Grammar | 2014</p>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    queue: state.queue
  };
}

export default connect(mapStateToProps)(NowPlaying);
