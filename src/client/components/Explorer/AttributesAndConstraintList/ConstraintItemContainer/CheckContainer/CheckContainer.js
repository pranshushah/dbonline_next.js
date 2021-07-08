import Styles from './Check.module.scss';
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
  // if use keypress and press shift+c it add c in constraint name input because it autofoused
  function keyboradEnterHandler(e) {
    if (e.which === 13) {
      toogleArrow();
    }
    if (!e.altKey && e.which === 67 && !e.ctrlKey && e.shiftKey) {
      onAddConstraintIconClicked(table, EXPLORERCONSTANT.CHECK);
    }
  }

  function addConstraintClickHandler(e) {
    e.stopPropagation();
    onAddConstraintIconClicked(table, EXPLORERCONSTANT.CHECK);
  }
  return (
    <>
      <li
        className={
          show ? [Styles.container, Styles.show].join(' ') : Styles.container
        }>
        {show && (
          <span
            onClick={toogleArrow}
            tabIndex={0}
            onKeyUp={keyboradEnterHandler}
            className={
              open
                ? [Styles.liContainer, Styles.down].join(' ')
                : Styles.liContainer
            }>
            check constraint
            <span
              title='add check constraint'
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
    </>
  );
}

export default PrimaryKeyContainer;
