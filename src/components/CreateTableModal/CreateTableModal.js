import React, { useState, useEffect } from 'react';
import uuid from 'uuid/v1';
import Input from '../UI/Input/Input';
import TableColorPickerList from '../TableColorPickerList/TableColorPickerList';
import Modal from '../UI/Modal/Modal';
import '../../utils/Types';
import Styles from './CreateTableModal.module.scss';
import { oracleBanned } from '../../utils/helper-function/OracleBannedWords';
/**
 * @param {{showModalState:boolean,
 * onModalConfirmed:Function,
 * onModalClosed:Function,
 * allMainTableDetails:mainTableDetailsType[]
 * }} props
 */
function CreateTableModal({
  onModalClosed,
  onModalConfirmed,
  showModalState,
  allMainTableDetails,
}) {
  const [createTableInputValue, setCreateTableInputValue] = useState('');
  const [tableColor, updateTableColor] = useState('rgb(105,105,105)');
  const [tableError, setTableError] = useState(true);
  const [createTableInputDirty, setCreateTableDirty] = useState(false);
  const [creteTableErrorMessage, setCreteTableMessage] = useState('');

  function createTableInputValueHandler(e) {
    setCreateTableInputValue(e.target.value);
    setCreateTableDirty(true);
  }

  useEffect(() => {
    if (createTableInputValue !== '') {
      const index = allMainTableDetails.findIndex(
        (table) => table.tableName === createTableInputValue.trim(),
      );
      if (index === -1) {
        const bool = oracleBanned.includes(
          createTableInputValue.toUpperCase().trim(),
        );
        if (bool) {
          setTableError(true);
          setCreteTableMessage('this is reserved word by oracle');
        } else {
          setTableError(false);
        }
      } else {
        setTableError(true);
        if (createTableInputDirty) {
          setCreteTableMessage('tablename already exist');
        }
      }
    } else {
      setTableError(true);
      if (createTableInputDirty) {
        setCreteTableMessage("tablename can't be empty");
      }
    }
  }, [createTableInputValue, allMainTableDetails, createTableInputDirty]);

  function cancelModalHandler() {
    setCreateTableInputValue('');
    onModalClosed();
    setTableError(true);
    setCreateTableDirty(false);
    updateTableColor('rgb(105,105,105)');
  }

  function confirmModalHandler() {
    if (!tableError) {
      const id = uuid();
      const newTableDndDetails = {
        left: 20,
        top: 20,
        tableName: createTableInputValue,
        id: id,
        color: tableColor,
      };
      /**
       * @type {mainTableDetailsType}
       */
      const mainTableDetails = {
        id: id,
        tableName: createTableInputValue,
        attributes: [],
        tableLevelConstraint: {
          FOREIGNKEY: [],
          PRIMARYKEY: null,
          UNIQUETABLELEVEL: [],
          CHECK: [],
        },
      };
      updateTableColor('rgb(105,105,105)');
      setCreateTableInputValue('');
      setTableError(true);
      onModalConfirmed(newTableDndDetails, mainTableDetails);
      setCreateTableDirty(false);
    }
  }

  useEffect(() => {
    function doneOnEnterModalHandler(e) {
      if (!tableError && createTableInputValue) {
        if (e.key === 'Enter') {
          confirmModalHandler();
        }
      }
    }
    document.addEventListener('keypress', doneOnEnterModalHandler);
    return function cleanup() {
      document.removeEventListener('keypress', doneOnEnterModalHandler);
    };
  }, [createTableInputValue, tableError]);

  return (
    <Modal
      primary
      size='large'
      title='Create Table'
      show={showModalState}
      canConfirm
      canCancel
      modalConfirmed={confirmModalHandler}
      confirmDisabled={tableError}
      modalClosed={cancelModalHandler}>
      <div className={[Styles.container, 'keypresss'].join(' ')}>
        <Input
          label='Table Name'
          autoFocus
          error={createTableInputDirty && tableError}
          value={createTableInputValue}
          onChange={createTableInputValueHandler}
          dimension='medium'
          errorMessage={creteTableErrorMessage}
        />
        <TableColorPickerList
          onTableColorSelected={updateTableColor}
          selectedColor={tableColor}
        />
      </div>
    </Modal>
  );
}
export default CreateTableModal;
