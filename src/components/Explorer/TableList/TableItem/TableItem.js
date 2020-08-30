import React, { useState } from 'react';
import '../../../../utils/Types';
import Styles from './TableItem.module.scss';
import AttrAndConstraintList from '../../AttributesAndConstraintList/AttributesAndConstraintList';
import AttributeItemContainer from '../../AttributesAndConstraintList/AttributeItemContainer/AttributeItemContainer';
import ConstraintItemContainer from '../../AttributesAndConstraintList/ConstraintItemContainer/ConstraintItemContainer';
import AttrItem from '../../AttributesAndConstraintList/AttributeItem/AttributeItem';
import ForeignKeys from '../../AttributesAndConstraintList/ConstraintItemContainer/ForeignKeyContainer/ForeignKeys/ForeignKeys';
import Checks from '../../AttributesAndConstraintList/ConstraintItemContainer/CheckContainer/Checks/Checks';
import Uniques from '../../AttributesAndConstraintList/ConstraintItemContainer/UniqueContainer/Uniques/Uniques';
import PrimaryKey from '../../AttributesAndConstraintList/ConstraintItemContainer/PrimaryKeyContainer/PrimaryKeyContainer';
import ForeignKeyContainer from '../../AttributesAndConstraintList/ConstraintItemContainer/ForeignKeyContainer/ForeignKeyContainer';
import UniqueConstraint from '../../AttributesAndConstraintList/ConstraintItemContainer/UniqueContainer/UniqueContainer';
import CheckConstraint from '../../AttributesAndConstraintList/ConstraintItemContainer/CheckContainer/CheckContainer';

/**
 * @param {{
 * table:mainTableDetailsType,
 * onItemClicked:Function,
 * onAddConstraintIconClicked:Function,
 * }} props
 */

function TableItem({ table, onItemClicked, onAddConstraintIconClicked }) {
  const [open, setOpen] = useState(false);

  function toggleHandle() {
    setOpen((open) => !open);
  }
  function keyboradEnterHandler(e) {
    if (e.which === 13) {
      toggleHandle();
    }
  }
  const foreigns = table.tableLevelConstraint?.FOREIGNKEY.map(
    (foreignObj, index) => (
      <ForeignKeys
        key={index}
        table={table}
        onItemClicked={onItemClicked}
        item={foreignObj}>
        {foreignObj.constraintName}
      </ForeignKeys>
    ),
  );

  const checks = table.tableLevelConstraint?.CHECK.map((checkObj, index) => (
    <Checks
      key={index}
      onItemClicked={onItemClicked}
      item={checkObj}
      table={table}>
      {checkObj.constraintName}
    </Checks>
  ));

  const uniques = table.tableLevelConstraint?.UNIQUETABLELEVEL.map(
    (uniqueObj, index) => (
      <Uniques
        key={index}
        onItemClicked={onItemClicked}
        item={uniqueObj}
        table={table}>
        {uniqueObj.constraintName}
      </Uniques>
    ),
  );
  const attrsItems = table.attributes.map((attrObj) => (
    <AttrItem
      key={attrObj.id}
      attr={attrObj}
      onItemClicked={onItemClicked}
      table={table}
    />
  ));
  return (
    <li className={open ? Styles.itemPaddingContainer : null}>
      <span
        className={Styles.itemContainer}
        tabIndex='0'
        onKeyPress={keyboradEnterHandler}
        onClick={toggleHandle}>
        {table.tableName}
      </span>
      <AttrAndConstraintList show={open}>
        <AttributeItemContainer table={table}>
          {attrsItems}
        </AttributeItemContainer>
        <ConstraintItemContainer table={table}>
          <PrimaryKey
            table={table}
            onAddConstraintIconClicked={onAddConstraintIconClicked}
            onItemClicked={onItemClicked}
            item={table.tableLevelConstraint?.PRIMARYKEY}>
            {table.tableLevelConstraint?.PRIMARYKEY?.constraintName}
          </PrimaryKey>
          <ForeignKeyContainer
            table={table}
            onAddConstraintIconClicked={onAddConstraintIconClicked}>
            {foreigns}
          </ForeignKeyContainer>
          <UniqueConstraint
            table={table}
            onAddConstraintIconClicked={onAddConstraintIconClicked}>
            {uniques}
          </UniqueConstraint>
          <CheckConstraint
            table={table}
            onAddConstraintIconClicked={onAddConstraintIconClicked}>
            {checks}
          </CheckConstraint>
        </ConstraintItemContainer>
      </AttrAndConstraintList>
    </li>
  );
}

export default TableItem;
