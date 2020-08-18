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
  if (!parentShow && open) {
    setOpen(false);
  }
  return (
    <li className={Styles.text}>
      <span
        onClick={toogleArrow}
        className={
          open
            ? [Styles.liContainer, Styles.down].join(' ')
            : Styles.liContainer
        }>
        attributes
      </span>
      <ul className={Styles.container}>
        {children.map((child) => React.cloneElement(child, { show: open }))}
      </ul>
    </li>
  );
}

export default AttrListContainer;
