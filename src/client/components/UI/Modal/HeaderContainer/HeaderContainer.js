import React from 'react';
import Styles from './HeaderContainer.module.scss';
/**
 * @param {{
 * secondary:boolean,
 * primary:boolean,
 * danger:boolean,
 * size:("medium"|"large"|"huge"),
 * title:string,
 * }} props
 */

function HeaderContainer({ primary, secondary, size, danger, title }) {
  const classes = [];
  let cls = [Styles.header];
  switch (size) {
    case 'huge': {
      cls.push(Styles.huge);
      break;
    }
    case 'large': {
      cls.push(Styles.large);
      break;
    }
    default: {
      cls.push(Styles.medium);
    }
  }
  return title ? (
    <header className={classes}>
      <h1 className={cls.join(' ')}>{title}</h1>
    </header>
  ) : null;
}

export default HeaderContainer;
