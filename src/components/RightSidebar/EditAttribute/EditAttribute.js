import React, { useState, useEffect } from 'react';
import Button from '../../UI/Button/Button';
import Input from '../../UI/Input/Input';
import Styles from './EditAttribute.module.scss';
import { oracleBanned } from '../../../utils/helper-function/OracleBannedWords';
import { dataTypes } from '../../../utils/attributeDataTypes';
import { columnConstraintCheckboxList } from '../../../utils/checkedItemsForAddAttr';
import ConstraintCheckBoxContainer from '../../AddAttributeModal/constraintCheckboxContainer';
import DeleteAttrModal from '../../DeleteAttrModal/DeleteAttrModal';
import { customStyles } from '../../../utils/selectStyle';
import produce from 'immer';
import {
  oracleSizeError,
  oracleHasPre,
  oracleHasSize,
} from '../../../utils/helper-function/size-pre-error';
import Select from 'react-select';

/**
 * @param {{
 * table:mainTableDetailsType,
 * attributeName:string,
 * onAttributeChange:Function,
 * sizeInput:string,
 * preInput:string,
 * onSizeInputChange:Function,
 * onPreInputChange:Function,
 * initialAttriuteName,
 * onCancel:Function,
 * dataType:object,
 * onDataTypeChange:Function,
 * columnLevelConstraint:Object,
 * onColumnLevelConstraintChange:Function,
 * defaultValue:string,
 * onDefaultValueChange:Function,
 * onRightSideBarAfterConfirmOrDelete:Function,
 * mainTableDetails:mainTableDetailsType[],
 * }} props
 */

function EditCheckConstraint({
  table,
  attributeName,
  onAttributeChange,
  sizeInput,
  preInput,
  onSizeInputChange,
  onPreInputChange,
  initialAttriuteName,
  onCancel,
  dataType,
  onDataTypeChange,
  columnLevelConstraint,
  onColumnLevelConstraintChange,
  defaultValue,
  onDefaultValueChange,
  onRightSideBarAfterConfirmOrDelete,
  mainTableDetails,
}) {
  const [attributeError, setAttributeError] = useState(false);
  const [attributeErrorErrorMessage, setAttributeErrorErrorMessage] = useState(
    '',
  );
  const [sizeError, setSizeError] = useState(false);
  const [sizeErrorMessage, setSizeErrorMessage] = useState('');
  const [containerError, setContainerError] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [defaultValueError, setDefaultValueError] = useState(false);
  const [defaultValueDirty, setDefaultValueDirty] = useState(false);
  const [showSize, setShowSize] = useState(false);
  const [showPre, setShowPre] = useState(false);

  useEffect(() => {
    if (attributeName.trim().length > 0) {
      if (attributeName === initialAttriuteName) {
        setAttributeError(false);
      } else {
        const attrIndex = table.attributes.findIndex(
          (attr) => attr.name === attributeName,
        );
        if (attrIndex > -1) {
          setAttributeError(true);
          setAttributeErrorErrorMessage('attribute name already exist');
        } else {
          const bool = oracleBanned.includes(
            attributeName.toUpperCase().trim(),
          );
          if (bool) {
            setAttributeError(true);
            setAttributeErrorErrorMessage('attribute reserved by oracle');
          } else {
            setAttributeError(false);
          }
        }
      }
    } else {
      setAttributeError(true);
      setAttributeErrorErrorMessage("attribute name can't be null");
    }
  }, [attributeName, table, initialAttriuteName]);

  useEffect(() => {
    if (oracleHasPre(dataType.value)) {
      setShowPre(true);
    } else {
      setShowPre(false);
    }
    if (oracleHasSize(dataType.value)) {
      setShowSize(true);
    } else {
      setShowSize(false);
    }
  }, [dataType]);

  // size and precisionAfterDecimal related

  function sizeInputValueChangeHandler(e) {
    const val = e.target.value;
    if (val >= 0) {
      if (val === '' && oracleSizeError(dataType.value)) {
        onSizeInputChange(val);
        setSizeError(true);
        setSizeErrorMessage("size can't be empty");
      } else {
        onSizeInputChange(val);
        setSizeError(false);
      }
    }
  }

  function precisionAfterDecimalInputValueChangeHandler(e) {
    let val = e.target.value;
    if (!(val === '' || val === '-')) {
      const tempVal = parseInt(val);
      if (tempVal) {
        val = tempVal;
      } else {
        val = '';
      }
    }
    onPreInputChange(val);
  }

  function defaultValueChangeHandler(e) {
    onDefaultValueChange(e.target.value);
    setDefaultValueDirty(true);
  }

  useEffect(() => {
    if (defaultValue.length === 0 && columnLevelConstraint['DEFAULT']) {
      setDefaultValueError(true);
    } else {
      setDefaultValueError(false);
    }
  }, [defaultValue, columnLevelConstraint]);

  function attributeInputHandler(e) {
    onAttributeChange(e.target.value);
  }

  function confirmModalHandler() {
    setShowDeleteModal(false);
    deleteAttributeHandler();
  }
  function cancelModalHandler() {
    setShowDeleteModal(false);
  }
  function showModalHandler() {
    setShowDeleteModal(true);
  }

  function checkBoxHandler(e) {
    e.persist();
    const newCheckedItems = {
      ...columnLevelConstraint,
      [e.target.name]: e.target.checked,
    };
    onColumnLevelConstraintChange(newCheckedItems);
  }
  useEffect(() => {
    if (defaultValueError || sizeError || attributeError) {
      setContainerError(true);
    } else {
      setContainerError(false);
    }
  }, [defaultValueError, sizeError, attributeError]);

  function deleteAttributeHandler() {
    const newMainTableDetails = produce(mainTableDetails, (draft) => {
      const index = draft.findIndex(
        (givenTable) => givenTable.tableName === table.tableName,
      );

      const selectedAttributeIndexForDeleteAttribute = draft[
        index
      ].attributes.findIndex((attrObj) => attrObj.name === initialAttriuteName);

      draft[index].attributes.splice(
        selectedAttributeIndexForDeleteAttribute,
        1,
      );
      //unique-key
      if (
        table.attributes[selectedAttributeIndexForDeleteAttribute]
          ?.inTableLevelUniquConstraint.length !== 0
      ) {
        table.attributes[
          selectedAttributeIndexForDeleteAttribute
        ].inTableLevelUniquConstraint.forEach((cName) => {
          draft[index].attributes.forEach((attr) => {
            attr.inTableLevelUniquConstraint = attr?.inTableLevelUniquConstraint.filter(
              (entity) => entity !== cName,
            );
          });
        });
        draft[index].tableLevelConstraint.UNIQUETABLELEVEL = draft[
          index
        ].tableLevelConstraint.UNIQUETABLELEVEL.filter((obj) => {
          return !table.attributes[
            selectedAttributeIndexForDeleteAttribute
          ].inTableLevelUniquConstraint.includes(obj.constraintName);
        });
      }
      // foreign-key
      if (
        table.attributes[selectedAttributeIndexForDeleteAttribute]?.isFOREIGNKEY
      ) {
        draft[index].tableLevelConstraint.FOREIGNKEY = draft[
          index
        ].tableLevelConstraint.FOREIGNKEY.filter(
          (obj) =>
            !obj.referencedAtt ===
            table.attributes[selectedAttributeIndexForDeleteAttribute].id,
        );
      }
      //primary-key
      if (
        table.attributes[selectedAttributeIndexForDeleteAttribute].isPRIMARYKEY
      ) {
        draft[index].attributes.forEach((attr) => {
          if (attr.isPRIMARYKEY) {
            delete attr.isPRIMARYKEY;
          }
        });
        draft[index].tableLevelConstraint.PRIMARYKEY = null;
      }
    });

    onRightSideBarAfterConfirmOrDelete(newMainTableDetails);
  }

  function confirmAttributeClickHandler() {
    let finalAttributeName;
    if (attributeName.length === 0) {
      finalAttributeName = initialAttriuteName;
    } else {
      finalAttributeName = attributeName;
    }
    const newMainTableDetails = produce(mainTableDetails, (draft) => {
      const tableIndex = draft.findIndex(
        (givenTable) => givenTable.tableName === table.tableName,
      );
      const attrIndex = draft[tableIndex].attributes.findIndex(
        (attrObj) => attrObj.name === initialAttriuteName,
      );
      draft[tableIndex].attributes[attrIndex] = {
        ...draft[tableIndex].attributes[attrIndex],
        name: finalAttributeName,
        dataType: dataType.value,
        size: sizeInput ? sizeInput : undefined,
        precision: preInput ? preInput : undefined,
        isNOTNULL: columnLevelConstraint['NOT-NULL'] ? true : false,
        isUNIQUE: columnLevelConstraint['UNIQUE'] ? true : false,
        isAUTOINCREMENT: columnLevelConstraint['AUTO-INCREMENT'] ? true : false,
        DEFAULT: columnLevelConstraint['DEFAULT'] ? defaultValue : undefined,
      };
    });
    onRightSideBarAfterConfirmOrDelete(newMainTableDetails);
  }

  return (
    <div>
      <DeleteAttrModal
        onModalClosed={cancelModalHandler}
        onModalConfirmed={confirmModalHandler}
        showModalState={showDeleteModal}
        tableName={table.tableName}
        attrName={initialAttriuteName}
        givenTable={table}
      />
      <div className={Styles.inputContainer}>
        <Input
          usingFor={'sidebar'}
          value={attributeName}
          onChange={attributeInputHandler}
          dimension='huge'
          error={attributeError}
          label='attribute name'
          errorMessage={attributeErrorErrorMessage}
        />
      </div>
      <h3 className={Styles.header}>Select data type :</h3>
      <div className={Styles.select}>
        <Select
          value={dataType}
          styles={customStyles}
          options={dataTypes}
          placeholder='Select DataType'
          onChange={onDataTypeChange}
        />
      </div>
      {showSize && (
        <div className={Styles.inputContainer}>
          <Input
            usingFor={'sidebar'}
            value={sizeInput}
            onChange={sizeInputValueChangeHandler}
            dimension='huge'
            label='size'
            error={sizeError}
            errorMessage={sizeErrorMessage}
            required={oracleSizeError(dataType.value)}
          />
        </div>
      )}
      {showPre && (
        <div className={Styles.inputContainer} style={{ paddingTop: '1px' }}>
          <Input
            usingFor={'sidebar'}
            value={preInput}
            onChange={precisionAfterDecimalInputValueChangeHandler}
            dimension='huge'
            label='precision'
          />
        </div>
      )}
      <h2 className={Styles.header} style={{ marginTop: '0' }}>
        columnlevel Constraint:
      </h2>
      <div className={Styles.foreignCheckBox}>
        <ConstraintCheckBoxContainer
          dark
          checkedConstraintObj={columnLevelConstraint}
          onConstraintChecked={checkBoxHandler}
          checkBoxList={columnConstraintCheckboxList.slice(0, 2)}
        />
      </div>
      <div className={Styles.foreignCheckBox}>
        <ConstraintCheckBoxContainer
          dark
          checkedConstraintObj={columnLevelConstraint}
          onConstraintChecked={checkBoxHandler}
          checkBoxList={columnConstraintCheckboxList.slice(2)}
        />
      </div>
      {columnLevelConstraint['DEFAULT'] && (
        <div className={Styles.inputContainer}>
          <Input
            usingFor={'sidebar'}
            value={defaultValue}
            onChange={defaultValueChangeHandler}
            dimension='huge'
            error={defaultValueError && defaultValueDirty}
            errorMessage={"this field can't be empty"}
            required
            label='Default value'
          />
        </div>
      )}
      <div className={Styles.buttonContainer}>
        <div className={Styles.button}>
          <Button danger dimension='small' onClick={showModalHandler}>
            delete
          </Button>
        </div>
        <div className={Styles.button}>
          <Button dimension='small' inverted onClick={onCancel}>
            Cancel
          </Button>
        </div>
        <div className={Styles.button}>
          <Button
            dimension='small'
            onClick={confirmAttributeClickHandler}
            className={Styles.button}
            darkPrimary
            disabled={containerError}>
            Confirm
          </Button>
        </div>
      </div>
    </div>
  );
}

export default EditCheckConstraint;
