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

  function primaryEnterClick(e) {
    if (e.which === 13) {
      constraintClickHandler();
    }
  }
  // if use keypress and press shift+c it add c in constraint name input because it autofoused
  function keyboradEnterHandler(e) {
    if (e.which === 13) {
      toogleArrow();
    }
    if (!e.altKey && e.which === 67 && !e.ctrlKey && e.shiftKey) {
      children
        ? null
        : onAddConstraintIconClicked(table, EXPLORERCONSTANT.UNIQUE);
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
          primary key
          {children ? null : (
            <span
              title='add Primary Key'
              className={Styles.add}
              onClick={addConstraintClickHandler}
            />
          )}
        </span>
      )}
      <ul
        className={
          show ? [Styles.container, Styles.show].join(' ') : Styles.container
        }>
        {open && (
          <li
            tabIndex={0}
            onKeyPress={primaryEnterClick}
            onClick={constraintClickHandler}
            className={
              open
                ? [Styles.elementShow, Styles.elementContainer].join(' ')
                : Styles.elementContainer
            }>
            {children}
          </li>
        )}
      </ul>
    </li>
  );
}

export default PrimaryKeyContainer;
