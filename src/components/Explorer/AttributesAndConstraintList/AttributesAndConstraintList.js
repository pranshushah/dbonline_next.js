import React from 'react';
import '../../../utils/Types';
import Styles from './AttributesAndConstraintList.module.scss';
/**
 * @param {{
 * children:React.Component[],
 * show:boolean
 * }} props
 */

function AttrAndConstraintList({ children, show }) {
  return (
    <ul
      className={
        show ? [Styles.container, Styles.show].join(' ') : Styles.container
      }>
      {children.map((child, index) =>
        React.cloneElement(child, { parentShow: show, key: index }),
      )}
    </ul>
  );
}

export default AttrAndConstraintList;
