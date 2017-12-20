import React, { Component } from 'react';

export default class UpNext extends Component {
  render() {
    return (
      <nav id="nav">
        <ul>
          <li><a href="#top" id="top-link" className="skel-layers-ignoreHref"><span className="icon fa-pause">Currently playing</span></a></li>
          <li><a href="#portfolio" id="portfolio-link" className="skel-layers-ignoreHref"><span>Open Up - Leftfield</span></a></li>
        </ul>
      </nav>
    );
  }
}
