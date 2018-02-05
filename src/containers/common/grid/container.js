import React from 'react';

const Container = ({ title, heading, rows }) => {
  return (
    <section className="two">
      <div className="container">
        <h2>{title}</h2>
        <p>{heading}</p>
        <div id="grid">
          {rows}
        </div>
      </div>
    </section>
  );
}

export default Container;
