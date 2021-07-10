/* eslint-disable no-empty */
import React, { useState, useEffect, useReducer } from 'react';
import Modal from '../UI/Modal/Modal';
import Input from '../UI/Input/Input';
import Radio from '../UI/Radio/Radio';
import ConstraintCheckBoxContainer from './constraintCheckboxContainer';
import DataTypeDropDown from './DataTypeDropDown';
import TableNameDropDown from './SelectTableDropDown';
import SelectReferencingAttr from './SelectReferencingAttr';
import { v1 as uuid } from 'uuid';
import ConstraintContainer from './ConstriantContainer';
import Styles from './AddAttribute.module.scss';
import '../../utils/Types';
import { useConstraint } from '../../utils/customHooks/useConstraint';
import { useRadio } from '../../utils/customHooks/useRadio';
import MultipleUniqueDropDown from './MultipleUniqueDropDown';
import PrimaryKeyDropDown from './PrimaryDropDown';
import { randomString } from '../../utils/helper-function/randomString';
import { getSizeError } from '../../utils/helper-function/size-pre-error';
import {
  AddObjModal,
  AddAttributeReducer,
} from '../../utils/reducers/AddAttributeReducer';
import { useRouter } from 'next/router';

import {
  foreignConstraintRadioList,
  columnConstraintCheckboxList,
  getTableLevelCheckboxList,
} from '../../utils/checkedItemsForAddAttr';
import {
  oracleBanned,
  postgresql_mysqlBannedWords,
} from '../../utils/helper-function/bannedWords';
import { useCheckExpr } from '../../utils/customHooks/useCheckExpr';
import { useRecoilValue } from 'recoil';
import { databaseState } from '../../atoms/databaseAtom';
const parser = require('js-sql-parser');

/**
 * @param {{
 * showModalState:boolean,
 * onModalConfirmed:Function,
 * onModalClosed:Function,
 * tableName:string,
 * allTableDndDetails:tableDndDetailsObj[],
 * mainTableDetails:mainTableDetailsType[],
 * givenTable:mainTableDetailsType,
 * database:databaseType
 * }} props
 */
function AddAttributeModal({
  showModalState,
  onModalClosed,
  mainTableDetails,
  onModalConfirmed,
  givenTable,
}) {
  const router = useRouter();
  const { dbId } = router.query;
  const database = useRecoilValue(databaseState(dbId));
  const [state, dispatch] = useReducer(AddAttributeReducer, AddObjModal);
  const [foreignRadioArray, setForeignRadioArray, radioReset] = useRadio(
    foreignConstraintRadioList,
  );
  const [modalError, setModalError] = useState(true);
  const [
    tableLevelUniqueConstraintName,
    setTableLevelUniqueConstraintName,
    tableLevelUniqueConstraintNameError,
  ] = useConstraint(givenTable);
  const [
    primaryKeyConstraintName,
    setPrimaryKeyConstraintName,
    primaryKeyConstraintNameError,
  ] = useConstraint(givenTable);
  const [
    foreignkeyConstraintName,
    setForeignkeyConstraintName,
    foreignkeyConstraintNameError,
  ] = useConstraint(givenTable);
  const [
    checkConstraintName,
    setCheckConstraintName,
    checkConstraintNameError,
  ] = useConstraint(givenTable);
  const [
    checkExpr,
    checkExprError,
    checkExprErrorMessage,
    showCheckExprError,
    checkExpressionHandler,
    checkExpressionFocusHandler,
    checkExpressionShowErrorHandler,
    blurHandler,
    setCheckExprError,
  ] = useCheckExpr('attribute');
  const {
    AddAttributeInputValue,
    selectedDataType,
    sizeInputValue,
    precisionAfterDecimalInputValue,
    showSizeInput,
    showprecisionAfterDecimalInput,
    tableLevelCheckedItem,
    columnLevelCheckedItem,
    defaultValue,
    tableLevelUnique,
    selectedReferencingTable,
    selectedReferencingAttr,
    primaryKey,
    attributeValueError,
    selectDataTypeError,
    sizeInputValueError,
    selectedReferencingTableError,
    defaultValueError,
    tableLevelUniqueError,
    primaryKeyError,
    selectedReferencingAttrError,
    AddAttributeInputValueErrorMessage,
    sizeInputValueErrorMessage,
    defaultValueErrorMessage,
    sizeInputValueDirty,
    defaultValueDirty,
    AddAttributeInputValueDirty,
  } = state;

  function modalCleanUp() {
    dispatch({ type: 'MODAL_CLEANUP' });
    setModalError(true);
  }

  function ModalCloseHandler() {
    modalCleanUp();
    onModalClosed();
  }

  function modalConfirmHandler() {
    if (modalError) {
      modalCleanUp();
    } else {
      let addObj = {
        /**
         * @type {attributeObj}
         */
        attributes: {
          name: AddAttributeInputValue,
          dataType: selectedDataType,
          id: uuid(),
          inTableLevelUniquConstraint: [],
        },
      };
      if (sizeInputValue) {
        addObj['attributes'].size = sizeInputValue;
      }
      if (precisionAfterDecimalInputValue) {
        addObj['attributes'].precision = precisionAfterDecimalInputValue;
      }
      if (columnLevelCheckedItem['NOT-NULL']) {
        addObj['attributes'].isNOTNULL = true;
      }
      if (columnLevelCheckedItem['UNIQUE']) {
        addObj['attributes'].isUNIQUE = true;
      }
      if (columnLevelCheckedItem['DEFAULT']) {
        addObj['attributes'].DEFAULT = defaultValue;
      }
      if (columnLevelCheckedItem['AUTO-INCREMENT']) {
        addObj['attributes'].isAUTOINCREMENT = true;
      }
      if (tableLevelCheckedItem['FOREIGN-KEY']) {
        addObj['attributes'].isFOREIGNKEY = true;
        let constraintName;
        if (foreignkeyConstraintName) {
          constraintName = foreignkeyConstraintName;
        } else {
          constraintName = randomString();
        }
        addObj['FOREIGNKEY'] = {
          referencedAtt: addObj['attributes'].id,
          ReferencingTable: selectedReferencingTable,
          ReferencingAtt: selectedReferencingAttr,
          constraintName,
        };
        if (
          foreignRadioArray.findIndex(
            (foreignObj) =>
              foreignObj.label === 'CASCADE' && foreignObj.checked,
          ) !== -1
        ) {
          addObj['FOREIGNKEY'].cascade = true;
        } else {
          if (
            foreignRadioArray.findIndex(
              (foreignObj) =>
                foreignObj.label === 'SET NULL' && foreignObj.checked,
            ) !== -1
          ) {
            addObj['FOREIGNKEY'].setNull = true;
          }
        }
      }
      if (tableLevelCheckedItem['PRIMARY-KEY']) {
        if (primaryKey) {
          const index = primaryKey.findIndex((item) => {
            return !item.value;
          });
          let finalArr = [...primaryKey];
          if (index !== -1) {
            finalArr.splice(index, 1);
            finalArr.push({
              label: AddAttributeInputValue,
              value: addObj.attributes.id,
            });
          }
          const FinalPrimary = finalArr.map((item) => item.value);
          let constraintName;
          if (primaryKeyConstraintName) {
            constraintName = primaryKeyConstraintName;
          } else {
            constraintName = randomString();
          }
          addObj['PRIMARYKEY'] = {
            attributes: FinalPrimary,
            constraintName,
          };
        }
      }
      if (tableLevelCheckedItem['UNIQUE']) {
        if (tableLevelUnique) {
          const index = tableLevelUnique.findIndex((item) => {
            return !item.value;
          });
          let finalArr = [...tableLevelUnique];
          if (index !== -1) {
            finalArr.splice(index, 1);
            finalArr.push({
              label: AddAttributeInputValue,
              value: addObj.attributes.id,
            });
          }
          const FinalUnique = finalArr.map((item) => item.value);
          let constraintName;
          if (tableLevelUniqueConstraintName) {
            constraintName = tableLevelUniqueConstraintName;
          } else {
            constraintName = randomString();
          }
          addObj['UNIQUETABLE'] = {
            attributes: FinalUnique,
            constraintName,
          };
        }
      }
      if (tableLevelCheckedItem['CHECK']) {
        let constraintName;
        if (checkConstraintName) {
          constraintName = checkConstraintName;
        } else {
          constraintName = randomString();
        }
        addObj['CHECK'] = {
          AST: parser.parse(`select * from boom WHERE (${checkExpr})`),
          constraintName,
        };
      }
      onModalConfirmed(addObj);
      modalCleanUp();
    }
  }

  const addAttributeInputValueHandler = (e) => {
    const val = e.target.value;
    if (val.trim().length > 0) {
      const attrIndex = givenTable.attributes.findIndex(
        (attr) => attr.name === val,
      );
      if (attrIndex > -1) {
        dispatch({ type: 'ATTRIBUTENAME_ALREADY_EXIST', payload: { val } });
      } else {
        let bool;
        if (database.databaseType === 'oracle') {
          bool = oracleBanned.includes(val.toUpperCase().trim());
        } else {
          bool = postgresql_mysqlBannedWords.includes(val.toUpperCase().trim());
        }
        if (bool) {
          dispatch({ type: 'ATTRIBUTENAME_IS_BANNED', payload: { val } });
        } else {
          dispatch({ type: 'ATTRIBUTENAME_ALL_OK', payload: { val } });
        }
      }
    } else {
      dispatch({ type: 'ATTRIBUTENAME_CANNOT_NULL', payload: { val } });
    }
  };

  // input select type related

  function dataTypeSelectedHandler(value) {
    dispatch({
      type: 'DATATYPE_SELECTED',
      payload: { value, database },
    });
  }

  // size and precisionAfterDecimal related

  function sizeInputValueChangeHandler(e) {
    const val = e.target.value;
    if (val >= 0) {
      if (val === '' && getSizeError(database, selectedDataType)) {
        dispatch({ type: 'EMPTY_SIZE_INPUT', payload: { val } });
      } else {
        dispatch({ type: 'SIZE_INPUT_OK', payload: { val } });
      }
    }
  }

  function precisionAfterDecimalInputValueChangeHandler(e) {
    let val = e.target.value;
    if (val === '' || val === '-') {
    } else {
      const tempVal = parseInt(val);
      if (tempVal) {
        val = tempVal;
      } else {
        val = '';
      }
    }
    dispatch({
      type: 'PRECISION_INPUT_OK',
      payload: { val },
    });
  }

  //CONSTRAINT

  function tableLevelCheckBoxChangeHandler(e) {
    e.persist();
    const newCheckedItems = {
      ...tableLevelCheckedItem,
      [e.target.name]: e.target.checked,
    };
    if (newCheckedItems['CHECK']) {
      setCheckExprError(true);
    } else {
      setCheckExprError(false);
    }
    if (!newCheckedItems['FOREIGN-KEY']) {
      radioReset();
    }
    if (!newCheckedItems['FOREIGN-KEY'] && selectedReferencingTable) {
      dispatch({
        type: 'TABLEVELCHECKEDITEMS_FOREIGNKEY_REMOVED',
        payload: { newCheckedItems },
      });
    } else {
      dispatch({
        type: 'TABLEVELCHECKEDITEMS_NORMAL',
        payload: { newCheckedItems },
      });
    }
  }

  //FOREIGNKEY related

  // when FOREIGN-KEY checkbox-changes
  useEffect(() => {
    if (tableLevelCheckedItem['FOREIGN-KEY']) {
      if (selectedReferencingAttr && selectedReferencingTable) {
        dispatch({ type: 'TABLEVELCHECKEDITEMS_HAS_FOREIGNKEY_NOERROR' });
      } else {
        dispatch({ type: 'TABLEVELCHECKEDITEMS_HAS_FOREIGNKEY_ERROR' });
      }
    } else {
      dispatch({ type: 'TABLEVELCHECKEDITEMS_HASNO_FOREIGNKEY' });
    }
  }, [
    tableLevelCheckedItem,
    selectedReferencingAttr,
    selectedReferencingTable,
  ]);

  function referencingTableSelectedHandler(value) {
    dispatch({
      type: 'FOREIGNKEY_REFERENCING_TABLE_SELECTED',
      payload: { value },
    });
  }
  function selectedReferencingAttrHandler(value) {
    dispatch({
      type: 'FOREIGNKEY_REFERENCING_ATTR_SELECTED',
      payload: { value },
    });
  }

  // same data-type as referencing attribute
  useEffect(() => {
    if (selectedReferencingAttr && selectedReferencingTable) {
      const tableIndex = mainTableDetails.findIndex(
        (table) => table.id === selectedReferencingTable,
      );
      const attrIndex = mainTableDetails[tableIndex].attributes.findIndex(
        (attr) => attr.id === selectedReferencingAttr,
      );
      const newObj = {};
      newObj.dataType =
        mainTableDetails[tableIndex].attributes[attrIndex].dataType;
      if (mainTableDetails[tableIndex].attributes[attrIndex].size) {
        newObj.sizeInputValue =
          mainTableDetails[tableIndex].attributes[attrIndex].size;
      }
      if (mainTableDetails[tableIndex].attributes[attrIndex].precision) {
        newObj.preInputValue =
          mainTableDetails[tableIndex].attributes[attrIndex].precision;
      }
      dispatch({
        type: 'NEWDATA_AFTER_FOREIGNKEYSELECTED',
        payload: { newObj },
      });
    }
  }, [selectedReferencingAttr, selectedReferencingTable, mainTableDetails]);

  // table level unique

  function tableLevelUniqueHandler(value) {
    dispatch({ type: 'NEW_TABLELEVEL_UNIQUE', payload: { value } });
  }

  useEffect(() => {
    if (tableLevelCheckedItem['UNIQUE'] && !tableLevelUnique) {
      dispatch({ type: 'TABLELEVEL_UNIQUE_ERROR' });
    } else {
      dispatch({ type: 'TABLELEVEL_UNIQUE_NOERROR' });
    }
  }, [tableLevelCheckedItem, tableLevelUnique]);

  // table level primary key

  function primaryKeyHandler(value) {
    dispatch({ type: 'NEW_PRIMARYKEY', payload: { value } });
  }

  useEffect(() => {
    if (tableLevelCheckedItem['PRIMARY-KEY'] && !primaryKey) {
      dispatch({ type: 'PRIMARYKEY_ERROR' });
    } else {
      dispatch({ type: 'PRIMARYKEY_NOERROR' });
    }
  }, [tableLevelCheckedItem, primaryKey]);

  // when defaultValue check-box changes

  function columnLevelCheckBoxChangeHandler(e) {
    e.persist();
    const newCheckedItems = {
      ...columnLevelCheckedItem,
      [e.target.name]: e.target.checked,
    };
    if (!columnLevelCheckedItem['DEFAULT'] && defaultValue) {
      dispatch({
        type: 'COLUMNCHECKEDITEMS_DEFAULT_REMOVED',
        payload: { newCheckedItems },
      });
    } else {
      dispatch({
        type: 'COLUMNCHECKEDITEMS_NORMAL',
        payload: { newCheckedItems },
      });
    }
  }

  useEffect(() => {
    if (columnLevelCheckedItem['DEFAULT'] && !defaultValue) {
      dispatch({ type: 'COLUMN_DEFAULT_ERROR' });
    } else {
      dispatch({ type: 'COLUMN_DEFAULT_NOERROR' });
    }
  }, [columnLevelCheckedItem, defaultValue]);

  // Default value change-handler
  function defaultChangeHandler(e) {
    dispatch({
      type: 'COLUMN_DEFAULT_CHANGED',
      payload: { value: e.target.value },
    });
  }

  // GETTING DATA FOR CHECKBOX

  // all error

  useEffect(() => {
    if (
      !attributeValueError &&
      !selectDataTypeError &&
      !selectedReferencingTableError &&
      !selectedReferencingAttrError &&
      !defaultValueError &&
      !tableLevelUniqueError &&
      !primaryKeyError &&
      !sizeInputValueError &&
      !primaryKeyConstraintNameError &&
      !foreignkeyConstraintNameError &&
      !tableLevelUniqueConstraintNameError &&
      !checkExprError &&
      !checkConstraintNameError
    ) {
      setModalError(false);
    } else {
      setModalError(true);
    }
  }, [
    attributeValueError,
    selectDataTypeError,
    selectedReferencingTableError,
    selectedReferencingAttrError,
    defaultValueError,
    tableLevelUniqueError,
    primaryKeyError,
    sizeInputValueError,
    checkConstraintNameError,
    primaryKeyConstraintNameError,
    foreignkeyConstraintNameError,
    tableLevelUniqueConstraintNameError,
    checkExprError,
  ]);

  return (
    <Modal
      canCancel
      canConfirm
      size='huge'
      show={showModalState}
      primary
      confirmDisabled={modalError}
      title={`Add Attribute to ${givenTable.tableName}`}
      modalConfirmed={modalConfirmHandler}
      modalClosed={ModalCloseHandler}
    >
      <div className={Styles.container}>
        <Input
          label='Attribute Name'
          dimension='medium'
          autoFocus
          required
          error={AddAttributeInputValueDirty && attributeValueError}
          errorMessage={AddAttributeInputValueErrorMessage}
          value={AddAttributeInputValue}
          onChange={addAttributeInputValueHandler}
        />
        <h2 className={Styles.header}>Select DataType :-</h2>
        <div className={Styles.dataTypeContainer}>
          <div style={{ width: '35%', marginRight: '8px' }}>
            <DataTypeDropDown
              database={database}
              selectedValue={selectedDataType}
              onNewDataSelected={dataTypeSelectedHandler}
            />
          </div>
          {showSizeInput && (
            <div className={Styles.sizeValueContainer}>
              <Input
                value={sizeInputValue}
                onChange={sizeInputValueChangeHandler}
                type='text'
                label='size'
                error={sizeInputValueDirty && sizeInputValueError}
                errorMessage={sizeInputValueErrorMessage}
                dimension='huge'
                required={getSizeError(database, selectedDataType)}
              />
            </div>
          )}
          {showprecisionAfterDecimalInput && (
            <div className={Styles.sizeValueContainer}>
              <Input
                value={precisionAfterDecimalInputValue}
                onChange={precisionAfterDecimalInputValueChangeHandler}
                type='text'
                label='Precision after Decimal'
                dimension='huge'
              />
            </div>
          )}
        </div>
        <ConstraintContainer>
          <div style={{ marginRight: '1rem' }}>
            <h2 className={Styles.header}>Column Levlel constriants :-</h2>
            <ConstraintCheckBoxContainer
              checkedConstraintObj={columnLevelCheckedItem}
              onConstraintChecked={columnLevelCheckBoxChangeHandler}
              checkBoxList={columnConstraintCheckboxList}
            />
          </div>
          <div style={{ marginLeft: '1rem' }}>
            <h2 className={Styles.header}>Table Levlel constriants :-</h2>
            <ConstraintCheckBoxContainer
              checkedConstraintObj={tableLevelCheckedItem}
              onConstraintChecked={tableLevelCheckBoxChangeHandler}
              checkBoxList={getTableLevelCheckboxList(givenTable)}
            />
          </div>
        </ConstraintContainer>
        {columnLevelCheckedItem['DEFAULT'] && (
          <div className={Styles.constraintNameContainer}>
            <Input
              value={defaultValue}
              onChange={defaultChangeHandler}
              type='text'
              required
              error={defaultValueDirty && defaultValueError}
              errorMessage={defaultValueErrorMessage}
              label='Default Value'
              dimension='small'
              autoFocus
            />
          </div>
        )}
        {tableLevelCheckedItem['UNIQUE'] && (
          <div className={Styles.uniqueContainer}>
            {tableLevelCheckedItem['UNIQUE'] && (
              <div className={Styles.uniqueInput}>
                <Input
                  value={tableLevelUniqueConstraintName}
                  onChange={setTableLevelUniqueConstraintName}
                  type='text'
                  error={tableLevelUniqueConstraintNameError}
                  errorMessage={'constraint name already exist'}
                  dimension='huge'
                  label='unique constraint name'
                  color='blue'
                  autoFocus
                />
              </div>
            )}
            {tableLevelCheckedItem['UNIQUE'] && (
              <div className={Styles.uniqueDropDown} style={{ width: '40%' }}>
                <MultipleUniqueDropDown
                  allTables={mainTableDetails}
                  currentTable={givenTable}
                  uniques={tableLevelUnique}
                  onAttrSelected={tableLevelUniqueHandler}
                  currentValue={AddAttributeInputValue}
                />
              </div>
            )}
          </div>
        )}
        {tableLevelCheckedItem['PRIMARY-KEY'] && (
          <div className={Styles.primaryContainer}>
            {tableLevelCheckedItem['PRIMARY-KEY'] && (
              <div className={Styles.primaryInput}>
                <Input
                  value={primaryKeyConstraintName}
                  onChange={setPrimaryKeyConstraintName}
                  type='text'
                  error={primaryKeyConstraintNameError}
                  errorMessage={'constraint name already exist'}
                  label='Primary-key constraint name'
                  dimension='huge'
                  autoFocus
                />
              </div>
            )}
            {tableLevelCheckedItem['PRIMARY-KEY'] && (
              <div className={Styles.uniqueDropDown} style={{ width: '40%' }}>
                <PrimaryKeyDropDown
                  allTables={mainTableDetails}
                  currentTable={givenTable}
                  primaryKeyValues={primaryKey}
                  onAttrSelected={primaryKeyHandler}
                  currentValue={AddAttributeInputValue}
                />
              </div>
            )}
          </div>
        )}
        {tableLevelCheckedItem['FOREIGN-KEY'] && (
          <div className={Styles.foreignContainer}>
            {tableLevelCheckedItem['FOREIGN-KEY'] && (
              <div className={Styles.foreignInput}>
                <Input
                  value={foreignkeyConstraintName}
                  onChange={setForeignkeyConstraintName}
                  type='text'
                  error={foreignkeyConstraintNameError}
                  errorMessage={'constraint name already exist'}
                  label='Foreign constraint name'
                  dimension='huge'
                />
              </div>
            )}
            {tableLevelCheckedItem['FOREIGN-KEY'] && (
              <div className={Styles.foreignDropDown}>
                <TableNameDropDown
                  otherTables={mainTableDetails}
                  onTableSelected={referencingTableSelectedHandler}
                />
              </div>
            )}
            {tableLevelCheckedItem['FOREIGN-KEY'] && selectedReferencingTable && (
              <div className={Styles.foreignDropDown}>
                <SelectReferencingAttr
                  selectedTable={selectedReferencingTable}
                  mainTableDetails={mainTableDetails}
                  onAttrSelected={selectedReferencingAttrHandler}
                />
              </div>
            )}
          </div>
        )}
        {tableLevelCheckedItem['FOREIGN-KEY'] && (
          <div className={Styles.foreignCheckBoxContainer}>
            <h2 className={Styles.header} style={{ marginTop: '0' }}>
              On Delete:
            </h2>
            <div className={Styles.foreignCheckBox}>
              <Radio
                valueObjectArray={foreignRadioArray}
                nameForRadioContainer={'foreign'}
                onChange={setForeignRadioArray}
              />
            </div>
          </div>
        )}
        {tableLevelCheckedItem['CHECK'] && (
          <div className={Styles.checkContainer}>
            {tableLevelCheckedItem['CHECK'] && (
              <div className={Styles.checkInput}>
                <Input
                  value={checkConstraintName}
                  onChange={setCheckConstraintName}
                  type='text'
                  error={checkConstraintNameError}
                  errorMessage={'constraint name already exist'}
                  label='check constraint name'
                  dimension='huge'
                />
              </div>
            )}
            {tableLevelCheckedItem['CHECK'] && (
              <div className={Styles.checkInputExpr}>
                <Input
                  value={checkExpr}
                  onChange={checkExpressionHandler}
                  error={checkExprError && showCheckExprError}
                  onBlur={blurHandler}
                  onMouseLeave={checkExpressionShowErrorHandler}
                  onFocus={checkExpressionFocusHandler}
                  required
                  errorMessage={checkExprErrorMessage}
                  type='text'
                  label='check expression'
                  dimension='huge'
                />
              </div>
            )}
          </div>
        )}
      </div>
    </Modal>
  );
}

export default AddAttributeModal;
