import React from 'react';
import Styles from './NavLinksContainer.module.scss';

function NavLinksContainer({ children }) {
  return <ul className={Styles.navLinksContainer}>{children}</ul>;
}

export default NavLinksContainer;
