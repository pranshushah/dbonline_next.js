import React from 'react';
import Styles from './NavContainer.module.scss';

function NavContainer({ dark, children }) {
  return (
    <nav
      className={
        dark
          ? [Styles.headerContainer, Styles.headerContainerDark].join(' ')
          : Styles.headerContainer
      }>
      {children}
    </nav>
  );
}

export default NavContainer;
