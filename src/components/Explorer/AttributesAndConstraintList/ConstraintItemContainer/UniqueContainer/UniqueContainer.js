import Styles from './Unique.module.scss';
import React, { useState } from 'react';
import { EXPLORERCONSTANT } from '../../../../../utils/constant/explorer';
/**
 * @param {{
 * table:mainTableDetailsType
 * show:boolean,
 * onAddConstraintIconClicked:Function,
 * }} props
 */

function PrimaryKeyContainer({
  children,
  show,
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
  function addConstraintClickHandler(e) {
    e.stopPropagation();
    onAddConstraintIconClicked(table, EXPLORERCONSTANT.UNIQUE);
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
        unique constraints
        <span
          title='add unique constraint'
          className={Styles.add}
          onClick={addConstraintClickHandler}
        />
      </span>
      <ul
        className={
          show ? [Styles.show, Styles.container].join(' ') : Styles.container
        }>
        {children.map((child) => React.cloneElement(child, { show: open }))}
      </ul>
    </li>
  );
}

export default PrimaryKeyContainer;
