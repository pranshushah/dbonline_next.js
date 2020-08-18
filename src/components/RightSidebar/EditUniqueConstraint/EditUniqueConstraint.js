import React, { useEffect, useState } from 'react';
import Input from '../../UI/Input/Input';
import Button from '../../UI/Button/Button';
import Modal from '../../UI/Modal/Modal';
import Styles from './EditUniqueConstraint.module.scss';
import { constraintError } from '../../../utils/helper-function/constraintError';
import Select from 'react-select';
import { customStyles } from '../../../utils/selectStyle';

/**
 * @param {{
 * table:mainTableDetailsType,
 * uniqueConstraintName:string,
 * initialUniqueConstraintName:string,
 * onUniqeuConstraintNameChange:Function,
 * selectedTableUnique:[],
 * onCancel:Function,
 * onConfirmUniqueConstraintClick:Function,
 * onDeleteUniqueConstraint:Function
 * }} props
 */

function EditUniqueConstraint({
  table,
  uniqueConstraintName,
  initialUniqueConstraintName,
  onUniqueConstraintNameChange,
  onCancel,
  selectedTableUnique,
  onTableLevelUniqueChange,
  onDeleteUniqueConstraint,
  onConfirmUniqueConstraintClick,
}) {
  const [uniqueConstraintNameError, setUniqueConstraintNameError] = useState(
    false,
  );
  const [
    uniqueConstraintNameErrorMessage,
    setUniqueConstraintNameErrorMessage,
  ] = useState('');

  const [uniqueValueError, setUniqueValueError] = useState(false);
  const [containerError, setContainerError] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  function uniqueConstraintNameChangeHandler(e) {
    onUniqueConstraintNameChange(e.target.value.trim());
  }
  useEffect(() => {
    if (initialUniqueConstraintName === uniqueConstraintName) {
      setUniqueConstraintNameError(false);
    } else {
      if (constraintError(uniqueConstraintName, table)) {
        setUniqueConstraintNameError(true);
        setUniqueConstraintNameErrorMessage('constraint name already exist');
      } else {
        setUniqueConstraintNameError(false);
      }
    }
  }, [uniqueConstraintName, table, initialUniqueConstraintName]);

  useEffect(() => {
    if (selectedTableUnique) {
      setUniqueValueError(false);
    } else {
      setUniqueValueError(true);
    }
  }, [selectedTableUnique]);

  useEffect(() => {
    if (!uniqueValueError && !uniqueConstraintNameError) {
      setContainerError(false);
    } else {
      setContainerError(true);
    }
  }, [uniqueValueError, uniqueConstraintNameError]);

  function confirmModalHandler() {
    setShowDeleteModal(false);
    onDeleteUniqueConstraint();
  }
  function cancelModalHandler() {
    setShowDeleteModal(false);
  }
  function showModalHandler() {
    setShowDeleteModal(true);
  }
  const options = [];
  table.attributes.forEach((attrObj) => {
    options.push({ label: attrObj.name, value: attrObj.id });
  });
  return (
    <div>
      <Modal
        size='large'
        show={showDeleteModal}
        canConfirm
        canCancel
        modalConfirmed={confirmModalHandler}
        modalClosed={cancelModalHandler}
        title={`Are sure you want to delete ${initialUniqueConstraintName} unique constraint`}
      />
      <div className={Styles.inputContainer}>
        <Input
          dimension='huge'
          error={uniqueConstraintNameError}
          errorMessage={uniqueConstraintNameErrorMessage}
          usingFor='sidebar'
          label='constraint name'
          value={uniqueConstraintName}
          onChange={uniqueConstraintNameChangeHandler}
        />
      </div>
      <div className={Styles.select}>
        <Select
          styles={customStyles}
          options={options}
          value={selectedTableUnique}
          isMulti
          onChange={onTableLevelUniqueChange}
          placeholder='Select Composite Unique Key'
        />
      </div>
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
            darkPrimary
            className={Styles.button}
            onClick={onConfirmUniqueConstraintClick}
            disabled={containerError}>
            Confirm
          </Button>
        </div>
      </div>
    </div>
  );
}
export default EditUniqueConstraint;
