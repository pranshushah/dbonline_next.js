import React from 'react';
import '../../../../utils/Types';
import Styles from './AttributeItem.module.scss';
import { EXPLORERCONSTANT } from '../../../../utils/constant/explorer';
/**
 * @param {{
 * attr:attributeObj,
 * show:boolean,
 * onItemClicked:Function,
 * table:mainTableDetailsType,
 * }} props
 */

function attrItem({ attr, show, table, onItemClicked }) {
  function ItemClickHandler() {
    onItemClicked(table, EXPLORERCONSTANT.ATTRIBUTE, attr);
  }
  return (
    <li
      onClick={ItemClickHandler}
      className={
        show ? [Styles.show, Styles.container].join(' ') : Styles.container
      }>
      {attr.name}
    </li>
  );
}

export default attrItem;
