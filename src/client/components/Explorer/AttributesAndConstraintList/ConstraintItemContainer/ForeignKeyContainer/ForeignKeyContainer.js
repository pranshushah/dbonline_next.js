import Styles from './ForeignKeyContainer.module.scss';
import React, { useState } from 'react';
import { EXPLORERCONSTANT } from '../../../../../utils/constant/explorer';
/**
 * @param {{
 * show:boolean,
 * table:mainTableDetailsType,
 * onAddConstraintIconClicked:Function,
 * }} props
 */

function ForeignKeyContainer({
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
    e.stopPropagation(); //if don't use this it also open the foreign keys constraints
    onAddConstraintIconClicked(table, EXPLORERCONSTANT.FOREIGN);
  }
  // if use keypress and press shift+c it add c in constraint name input because it autofoused
  function keyboradEnterHandler(e) {
    if (e.which === 13) {
      toogleArrow();
    }
    if (!e.altKey && e.which === 67 && !e.ctrlKey && e.shiftKey) {
      onAddConstraintIconClicked(table, EXPLORERCONSTANT.FOREIGN);
    }
  }
  return (
    <li
      className={
        show ? [Styles.container, Styles.show].join(' ') : Styles.container
      }>
      {show && (
        <span
          onKeyUp={keyboradEnterHandler}
          tabIndex={0}
          onClick={toogleArrow}
          className={
            open
              ? [Styles.liContainer, Styles.down].join(' ')
              : Styles.liContainer
          }>
          foreign keys
          <span
            title='add foreign key'
            className={Styles.add}
            onClick={addConstraintClickHandler}
          />
        </span>
      )}
      <ul
        className={
          show ? [Styles.show, Styles.container].join(' ') : Styles.container
        }>
        {children.map((child) => React.cloneElement(child, { show: open }))}
      </ul>
    </li>
  );
}

export default ForeignKeyContainer;
