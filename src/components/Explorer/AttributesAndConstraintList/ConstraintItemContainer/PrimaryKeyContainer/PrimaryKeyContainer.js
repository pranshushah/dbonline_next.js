import Styles from './PrimaryKeyContainer.module.scss';
import React, { useState } from 'react';
import { EXPLORERCONSTANT } from '../../../../../utils/constant/explorer';
/**
 * @param {{
 * show:boolean,
 * table:mainTableDetailsType,
 * onItemClicked:Function,
 * onAddConstraintIconClicked:Function
 * item:object
 * }} props
 */

function PrimaryKeyContainer({
  children,
  show,
  onItemClicked,
  item,
  table,
  onAddConstraintIconClicked,
}) {
  const [open, setOpen] = useState(false);
  function toogleArrow() {
    setOpen((open) => !open);
  }
  if (!show && open) {
    setOpen(false);
  }
  function constraintClickHandler() {
    onItemClicked(table, EXPLORERCONSTANT.PRIMARY, item);
  }
  function addConstraintClickHandler(e) {
    e.stopPropagation();
    onAddConstraintIconClicked(table, EXPLORERCONSTANT.PRIMARY);
  }
  return (
    <li
      className={
        show ? [Styles.container, Styles.show].join(' ') : Styles.container
      }>
      <span
        onClick={toogleArrow}
        className={
          open
            ? [Styles.liContainer, Styles.down].join(' ')
            : Styles.liContainer
        }>
        primary key
        {children ? null : (
          <span
            title='add Primary Key'
            className={Styles.add}
            onClick={addConstraintClickHandler}
          />
        )}
      </span>
      <ul
        className={
          show ? [Styles.container, Styles.show].join(' ') : Styles.container
        }>
        <li
          onClick={constraintClickHandler}
          className={
            open
              ? [Styles.elementShow, Styles.elementContainer].join(' ')
              : Styles.elementContainer
          }>
          {children}
        </li>
      </ul>
    </li>
  );
}

export default PrimaryKeyContainer;
