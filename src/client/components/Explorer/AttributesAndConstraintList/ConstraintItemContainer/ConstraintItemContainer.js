import Styles from './ConstraintItemContainer.module.scss';
import React, { useState } from 'react';

/**
 * @param {{
 * parentShow:boolean,
 * children:React.Component[]
 * }} props
 */

function ConstraintItemContainer({ children, parentShow }) {
  const [open, setOpen] = useState(false);
  function toogleArrow() {
    setOpen((open) => !open);
  }
  if (!parentShow && open) {
    setOpen(false);
  }
  function keyboradEnterHandler(e) {
    if (e.which === 13) {
      toogleArrow();
    }
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
          constraints
        </span>
      )}
      <ul className={Styles.container}>
        {children.map((child, index) =>
          React.cloneElement(child, { show: open, key: index }),
        )}
      </ul>
    </li>
  );
}

export default ConstraintItemContainer;
