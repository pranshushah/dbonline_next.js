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

  return (
    <li
      onClick={itemClickHandler}
      className={
        show ? [Styles.show, Styles.container].join(' ') : Styles.container
      }>
      {children}
    </li>
  );
}
