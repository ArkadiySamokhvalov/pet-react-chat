import React from 'react';
import sprite from '../../assets/img/sprite.svg';

const Icon = (props) => (
  <svg viewBox='0 0 16 16' className={`icon icon-${props.id}`}>
    <use xlinkHref={`${sprite}#icon-${props.id}`} />
  </svg>
);

export default Icon;
