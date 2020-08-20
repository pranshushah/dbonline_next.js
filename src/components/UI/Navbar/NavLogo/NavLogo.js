import React from 'react';
import Styles from './Logo.module.scss';
import Link from 'next/link';

function Logo({ text }) {
  return (
    <Link href='/'>
      <a className={Styles.Logo}>{text}</a>
    </Link>
  );
}

export default Logo;
