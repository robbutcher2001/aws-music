import React, { Component } from 'react';
import { connect } from 'react-redux';

export class NowPlaying extends Component {
  constructor(props) {
    super(props);

    this.state = { loading: false };

    this.trackLoading = this.trackLoading.bind(this);
    this.trackLoaded = this.trackLoaded.bind(this);
  }

  trackLoading(event) {
    event.preventDefault();

    this.setState({ loading: true });
    console.log(`track loading`);
  }

  trackLoaded(event) {
    event.preventDefault();

    this.setState({ loading: false });
    console.log(`track loaded`);
  }

  renderNotPlaying() {
    return (
      <div>
        <div id="logo">
          <span className="image avatar48">
            <img src="/images/headphones.png" alt="No album art" style={{backgroundColor: '#222629'}}/>
          </span>
          <h1 id="title">Nothing playing</h1>
        </div>
      </div>
    );
  }

  renderWithStatus(title) {
    return (
      <div>
        <div id="logo">
          <span className="image avatar48">
            <img src={`/${this.props.meta.albumart}`} alt={`${this.props.meta.artist} album art`} />
          </span>
          <h1 id="title">{title}</h1>
          <p>{`${this.props.meta.artist} | ${this.props.meta.album}`}</p>
        </div>
        <audio autoPlay controls preload="auto"
          title={`${this.props.meta.artist} | ${this.props.meta.title}`}
          style={{width: '100%'}}
          src={`/${this.props.raw.location}`}
          onLoadStart={this.trackLoading}
          onCanPlay={this.trackLoaded}
        />
      </div>
    );
  }

  render() {
    if (!this.props.raw) {
      return this.renderNotPlaying();
    }

    if (this.state.loading) {
      return this.renderWithStatus('Buffering..');
    }

    return this.renderWithStatus('Now playing');
  }
}

function mapStateToProps(state) {
  return {
    raw: state.playingLocation,
    meta: state.playingMeta
  };
}

export default connect(mapStateToProps)(NowPlaying);
