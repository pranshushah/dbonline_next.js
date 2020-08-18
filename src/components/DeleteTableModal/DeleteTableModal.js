import React, { useState, useEffect } from 'react';
import Input from '../../components/UI/Input/Input';
import Modal from '../../components/UI/Modal/Modal';
import Style from './DeleteModal.module.scss';
import '../../utils/Types';
/**
 * @param {{showModalState:boolean,
 * onModalConfirmed:Function,
 * onModalClosed:Function,
 * tableName:string
 * }} props
 */
function DeleteTableModal({
  onModalClosed,
  onModalConfirmed,
  showModalState,
  tableName,
}) {
  const [deleteTableInputValue, updateCreateTableInputValue] = useState('');
  const [tableError, setTableError] = useState(true);

  function createTableInputValueHandler(e) {
    updateCreateTableInputValue(e.target.value);
  }

  function cancelModalHandler() {
    updateCreateTableInputValue('');
    onModalClosed();
    setTableError(true);
  }

  function confirmModalHandler() {
    onModalConfirmed();
    setTableError(true);
    updateCreateTableInputValue('');
  }

  useEffect(() => {
    if (tableName === deleteTableInputValue) {
      setTableError(false);
    } else {
      setTableError(true);
    }
  }, [deleteTableInputValue, tableName]);

  return (
    <Modal
      size='large'
      danger
      title={`Are sure You want To Delete ${tableName} table`}
      show={showModalState}
      canConfirm
      canCancel
      confirmDisabled={tableError}
      modalConfirmed={confirmModalHandler}
      modalClosed={cancelModalHandler}>
      <div className={Style.container}>
        <h1 className={Style.header}>Please Enter Table Name To Confirm</h1>
        <Input
          label='Table Name'
          autoFocus
          value={deleteTableInputValue}
          onChange={createTableInputValueHandler}
          dimension='medium'
        />
      </div>
    </Modal>
  );
}
export default DeleteTableModal;
