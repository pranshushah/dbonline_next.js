import React from 'react';
import Styles from './Logo.module.scss';

function Logo({ text }) {
  return <h1 className={Styles.Logo}>{text}</h1>;
}

export default Logo;
