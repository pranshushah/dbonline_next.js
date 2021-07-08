import Styles from './AttributeItemContainer.module.scss';
import React, { useState } from 'react';
/**
 * @param {{
 * table:mainTableDetailsType,
 * parentShow:boolean
 * }} props
 */

function AttrListContainer({ children, parentShow }) {
  const [open, setOpen] = useState(false);
  function toogleArrow() {
    setOpen((open) => !open);
  }

  function keyboradEnterHandler(e) {
    if (e.which === 13) {
      toogleArrow();
    }
  }
  if (!parentShow && open) {
    setOpen(false);
  }
  return (
    <li className={Styles.text}>
      {parentShow && (
        <span
          onKeyPress={keyboradEnterHandler}
          tabIndex={0}
          onClick={toogleArrow}
          className={
            open
              ? [Styles.liContainer, Styles.down].join(' ')
              : Styles.liContainer
          }>
          attributes
        </span>
      )}
      <ul className={Styles.container}>
        {children.map((child) => React.cloneElement(child, { show: open }))}
      </ul>
    </li>
  );
}

export default AttrListContainer;
