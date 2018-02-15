import React, { Component } from 'react';
import { connect } from 'react-redux';

export class NowPlaying extends Component {
  constructor(props) {
    super(props);
  }

  renderNotPlaying(extraContent) {
    return (
      <div>
        <div id="logo">
          <span className="image avatar48">
            <img src="/images/headphones.png" alt="No album art" style={{backgroundColor: '#222629'}}/>
          </span>
          <h1 id="title">Nothing playing</h1>
        </div>
        {extraContent}
      </div>
    );
  }

  renderNowPlaying(extraContent) {
    return (
      <div>
        <div id="logo">
          <span className="image avatar48">
            <img src={'/' + this.props.meta.albumart} alt={this.props.meta.artist + ' album art'} />
          </span>
          <h1 id="title">Now playing</h1>
          <p>{this.props.meta.artist + ' | ' + this.props.meta.album}</p>
        </div>
        {extraContent}
      </div>
    );
  }

  render() {
    if (!this.props.location) {
      return this.renderNotPlaying();
    }

    return this.renderNowPlaying(
      <audio autoPlay controls preload="auto" title="iOS test title" style={{width: '100%'}}>
        <source src={'/' + this.props.location}/>
      </audio>
    );
  }
}

function mapStateToProps(state) {
  console.log(state.playingMeta);
  return {
    location: state.playingLocation,
    meta: state.playingMeta
  };
}

export default connect(mapStateToProps)(NowPlaying);
