import React, { useState, useEffect } from 'react';
import Input from '../../components/UI/Input/Input';
import Modal from '../../components/UI/Modal/Modal';
import TableColorPickerList from '../TableColorPickerList/TableColorPickerList';
import Styles from './EditTableModal.module.scss';
import { oracleBanned } from '../../utils/helper-function/bannedWords';
import '../../utils/Types';
/**
 * @param {{showModalState:boolean,
 * onModalConfirmed:Function,
 * onModalClosed:Function,
 * tableColor:string,
 * tableName:string,
 * onTableColorChange:Function,
 * onTableNameChange:Function,
 * mainTableDetails:mainTableDetailsType[],
 * selectedTable:mainTableDetailsType
 * }} props
 */
function EditTableModal({
  onModalClosed,
  onModalConfirmed,
  showModalState,
  tableColor,
  tableName,
  onTableColorChange,
  onTableNameChange,
  mainTableDetails,
  selectedTable,
}) {
  const [tableError, setTableError] = useState(false);
  const [createTableInputDirty, setCreateTableDirty] = useState(false);
  const [creteTableErrorMessage, setCreteTableMessage] = useState('');

  function tableInputValueHandler(e) {
    onTableNameChange(e.target.value);
    setCreateTableDirty(true);
  }

  useEffect(() => {
    if (tableName !== '') {
      if (tableName === selectedTable.tableName) {
        setTableError(false);
      } else {
        const index = mainTableDetails.findIndex(
          (table) => table.tableName === tableName.trim(),
        );
        if (index === -1) {
          const bool = oracleBanned.includes(tableName.toUpperCase().trim());
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
      }
    } else {
      setTableError(true);
      if (createTableInputDirty) {
        setCreteTableMessage("tablename can't be emty");
      }
    }
  }, [tableName, mainTableDetails, selectedTable, createTableInputDirty]);

  function cancelModalHandler() {
    onTableNameChange('');
    onModalClosed();
    setTableError(false);
    onTableColorChange('');
  }

  function confirmModalHandler() {
    if (!tableError) {
      onTableColorChange('');
      onTableNameChange('');
      onModalConfirmed(tableColor, tableName);
      setTableError(false);
    }
  }

  useEffect(() => {
    function doneOnEnterModalHandler(e) {
      if (!tableError && tableName) {
        if (e.key === 'Enter') {
          confirmModalHandler();
        }
      } else {
        if (e.key === 'Escape') {
          cancelModalHandler();
        }
      }
    }
    document.addEventListener('keydown', doneOnEnterModalHandler);
    return function cleanup() {
      document.removeEventListener('keydown', doneOnEnterModalHandler);
    };
  }, [tableName, tableError, tableColor]);

  return (
    <Modal
      primary
      size='large'
      title='Edit Table'
      show={showModalState}
      canConfirm
      canCancel
      confirmDisabled={tableError}
      modalConfirmed={confirmModalHandler}
      modalClosed={cancelModalHandler}
    >
      <div className={Styles.container}>
        <Input
          label='Table Name'
          autoFocus
          value={tableName}
          error={createTableInputDirty && tableError}
          onChange={tableInputValueHandler}
          dimension='large'
          errorMessage={creteTableErrorMessage}
          primary
        />
        <TableColorPickerList
          onTableColorSelected={onTableColorChange}
          selectedColor={tableColor}
        />
      </div>
    </Modal>
  );
}
export default React.memo(EditTableModal);
