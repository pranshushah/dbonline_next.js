import React, { useState } from 'react';
import { Resizable } from 're-resizable';
import Styles from './RightSidebar.module.scss';
import EditCheckConstraint from './EditCheckConstraint/EditCheckConstraint';
import EditUniqueConstraint from './EditUniqueConstraint/EditUniqueConstraint';
import EditForeignConstraint from './EditForeignConstraint/EditForeignConstraint';
import EditAttribute from './EditAttribute/EditAttribute';
/**
 * @param {{
 * mainTableDetails:mainTableDetailsType[],
 * table:mainTableDetailsType,
 * showCheckConstraint:boolean,
 * constraintName:string,
 * checkExpr:string,
 * onConstraintNameChange:Function,
 * onCheckExprChange:Function,
 * initialCheckConstraintName:string,
 * onCancel:Function,
 * showUniqueConstraint:boolean,
 * initialUniqueConstraintName:string,
 * selectedMultipleSelect:Array,
 * onMultipleSelectChange:Function,
 * onDeleteUniqueConstraint:Function,
 * onConfirmUniqueConstraintClick:Function,
 * showPrimaryConstraint:boolean,
 * initialPrimaryConstraintName:string,
 * onDeletePrimaryConstraint:Function,
 * onConfirmPrimaryConstraintClick:Function,
 * referencedAtt:object,
 * referencingTable:object,
 * referencingAtt:object,
 * initialForeignConstraintName:string,
 * showForeignConstraint:boolean,
 * onSingleSelectChange:Function,
 * onReferencingAttChange:Function,
 * onReferencingTableChange:Function,
 * checkedItem:Object,
 * onCheckedItemChange:Function,
 * showAttribute:boolean,
 * initialAttributeName:string,
 * sizeInput:string,
 * preInput:string,
 * onSizeInputChange:Function,
 * onPreInputChange:Function,
 * defaultValue:string,
 * onDefaultValueChange:Function,
 * onRightSideBarAfterConfirmOrDelete:Function,
 * onForeignRadioChange:Function,
 * foreignRadio:Array
 * }} props
 */

function SideBar({
  mainTableDetails,
  table,
  showCheckConstraint,
  constraintName,
  checkExpr,
  onConstraintNameChange,
  onCheckExprChange,
  initialCheckConstraintName,
  onCancel,
  showUniqueConstraint,
  initialUniqueConstraintName,
  selectedMultipleSelect,
  onMultipleSelectChange,
  onDeleteUniqueConstraint,
  onConfirmUniqueConstraintClick,
  showPrimaryConstraint,
  initialPrimaryConstraintName,
  onDeletePrimaryConstraint,
  onConfirmPrimaryConstraintClick,
  singleSelect,
  referencingTable,
  referencingAtt,
  initialForeignConstraintName,
  showForeignConstraint,
  onSingleSelectChange,
  onReferencingAttChange,
  onReferencingTableChange,
  checkedItem,
  onCheckedItemChange,
  showAttribute,
  sizeInput,
  preInput,
  onSizeInputChange,
  onPreInputChange,
  initialAttributeName,
  defaultValue,
  onDefaultValueChange,
  onRightSideBarAfterConfirmOrDelete,
  onForeignRadioChange,
  foreignRadio,
}) {
  const [width, setWidth] = useState(300);

  function WidthHandler(e, direction, ref, d) {
    setWidth((width) => width + d.width);
  }
  return (
    <Resizable
      className={Styles.resize}
      minWidth='270'
      maxWidth='310'
      size={{ width: width, height: '170vh' }}
      onResizeStop={WidthHandler}
      enable={{
        top: false,
        right: false,
        bottom: false,
        left: true,
        topRight: false,
        bottomRight: false,
        bottomLeft: false,
        topLeft: false,
      }}>
      <div className={Styles.container}>
        <div className={Styles.close} onClick={onCancel} />
        <div className={Styles.contentContainer}>
          {showCheckConstraint && (
            <EditCheckConstraint
              table={table}
              checkConstraintName={constraintName}
              checkExpr={checkExpr}
              onCheckConstraintNameChange={onConstraintNameChange}
              onCheckExprChange={onCheckExprChange}
              onCancel={onCancel}
              initialCheckConstraintName={initialCheckConstraintName}
              onRightSideBarAfterConfirmOrDelete={
                onRightSideBarAfterConfirmOrDelete
              }
              mainTableDetails={mainTableDetails}
            />
          )}
          {showUniqueConstraint && (
            <EditUniqueConstraint
              table={table}
              uniqueConstraintName={constraintName}
              initialUniqueConstraintName={initialUniqueConstraintName}
              onUniqueConstraintNameChange={onConstraintNameChange}
              selectedTableUnique={selectedMultipleSelect}
              onTableLevelUniqueChange={onMultipleSelectChange}
              onCancel={onCancel}
              onDeleteUniqueConstraint={onDeleteUniqueConstraint}
              onConfirmUniqueConstraintClick={onConfirmUniqueConstraintClick}
            />
          )}
          {showPrimaryConstraint && (
            <EditUniqueConstraint
              table={table}
              uniqueConstraintName={constraintName}
              initialUniqueConstraintName={initialPrimaryConstraintName}
              onUniqueConstraintNameChange={onConstraintNameChange}
              selectedTableUnique={selectedMultipleSelect}
              onTableLevelUniqueChange={onMultipleSelectChange}
              onCancel={onCancel}
              onDeleteUniqueConstraint={onDeletePrimaryConstraint}
              onConfirmUniqueConstraintClick={onConfirmPrimaryConstraintClick}
            />
          )}
          {showForeignConstraint && (
            <EditForeignConstraint
              mainTableDetails={mainTableDetails}
              table={table}
              onForeignRadioChange={onForeignRadioChange}
              foreignRadio={foreignRadio}
              foreignConstraintName={constraintName}
              onForeignConstraintNameChange={onConstraintNameChange}
              onCancel={onCancel}
              referencedAtt={singleSelect}
              referencingTable={referencingTable}
              referencingAtt={referencingAtt}
              onReferencedAttChange={onSingleSelectChange}
              onReferencingAttChange={onReferencingAttChange}
              onReferencingTableChange={onReferencingTableChange}
              initialForeignConstraintName={initialForeignConstraintName}
              onForeignCheckedItem={onCheckedItemChange}
              foreignCheckedItem={checkedItem}
              onRightSideBarAfterConfirmOrDelete={
                onRightSideBarAfterConfirmOrDelete
              }
            />
          )}
          {showAttribute && (
            <EditAttribute
              table={table}
              attributeName={constraintName}
              onAttributeChange={onConstraintNameChange}
              showAttribute={showAttribute}
              sizeInput={sizeInput}
              preInput={preInput}
              onSizeInputChange={onSizeInputChange}
              onPreInputChange={onPreInputChange}
              initialAttriuteName={initialAttributeName}
              onCancel={onCancel}
              dataType={singleSelect}
              onDataTypeChange={onSingleSelectChange}
              columnLevelConstraint={checkedItem}
              onColumnLevelConstraintChange={onCheckedItemChange}
              defaultValue={defaultValue}
              onDefaultValueChange={onDefaultValueChange}
              onRightSideBarAfterConfirmOrDelete={
                onRightSideBarAfterConfirmOrDelete
              }
              mainTableDetails={mainTableDetails}
            />
          )}
        </div>
      </div>
    </Resizable>
  );
}

export default SideBar;
