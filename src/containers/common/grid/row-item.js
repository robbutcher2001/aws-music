import React from 'react';
import { Link } from 'react-router-dom';

const RowItem = ({rowItem, link}) => {
  return (
    <div className="3u 6u(mobile)">
      <article className="item">
        <Link className="image fit" to={link}>
          <img src={rowItem.albumart !== '-' ? `/${rowItem.albumart}` : '/images/headphones.png'} alt={rowItem.name} />
        </Link>
        <header>
          <h3>{rowItem.name}</h3>
        </header>
      </article>
    </div>
  );
}

export default RowItem;
