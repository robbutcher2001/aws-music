import React from 'react';

const Loading = ({title, heading}) => {
  return (
    <section className="two">
      <div className="container">
        <h2>{title}</h2>
        <p>{heading}</p>
        <div id="loading" className="row">
          <div className="12u 12u(mobile)">
            <i className="fa fa-cog fa-spin fa-3x fa-fw"></i>
            <span className="sr-only">Loading..</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Loading;
