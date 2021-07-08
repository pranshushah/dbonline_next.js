import React from 'react';
import Styles from './Checks.module.scss';
import { EXPLORERCONSTANT } from '../../../../../../utils/constant/explorer';
/**
 * @param {{
 * table:mainTableDetailsType
 * show:boolean,
 * item:object,
 * onItemClicked:Function
 * }} props
 */

export default function Checks({ children, table, show, item, onItemClicked }) {
  function itemClickHandler() {
    onItemClicked(table, EXPLORERCONSTANT.CHECK, item);
  }

  function keyboradEnterHandler(e) {
    if (e.which === 13) {
      itemClickHandler();
    }
  }

  return (
    show && (
      <li
        tabIndex={0}
        onKeyPress={keyboradEnterHandler}
        onClick={itemClickHandler}
        className={
          show ? [Styles.show, Styles.container].join(' ') : Styles.container
        }>
        {children}
      </li>
    )
  );
}
