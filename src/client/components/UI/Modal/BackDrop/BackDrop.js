import React from 'react';
import Styles from './BackDrop.module.scss';
function BackDrop({ clicked, show }) {
  return show ? <div onClick={clicked} className={Styles.backDrop} /> : null;
}

export default BackDrop;
