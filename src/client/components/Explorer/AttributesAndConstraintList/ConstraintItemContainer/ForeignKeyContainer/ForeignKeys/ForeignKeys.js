import React from 'react';
import Styles from './ForeignKeys.module.scss';
import { EXPLORERCONSTANT } from '../../../../../../utils/constant/explorer';
/**
 * @param {{
 * table:mainTableDetailsType
 * show:boolean,
 * item:object,
 * onItemClicked:Function
 * }} props
 */

export default function ForeignKeys({
  children,
  show,
  item,
  onItemClicked,
  table,
}) {
  function itemClickHandler() {
    onItemClicked(table, EXPLORERCONSTANT.FOREIGN, item);
  }

  function keyboradEnterHandler(e) {
    if (e.which === 13) {
      itemClickHandler();
    }
  }

  return (
    show && (
      <li
        onKeyPress={keyboradEnterHandler}
        tabIndex={0}
        onClick={itemClickHandler}
        className={
          show ? [Styles.show, Styles.container].join(' ') : Styles.container
        }>
        {children}
      </li>
    )
  );
}
