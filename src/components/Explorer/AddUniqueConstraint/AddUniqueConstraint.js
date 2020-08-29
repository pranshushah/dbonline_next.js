import React, { useState, useEffect } from 'react';
import Input from '../../UI/Input/Input';
import Modal from '../../UI/Modal/Modal';
import Select from 'react-select';
import Styles from './style.module.scss';
import { useConstraint } from '../../../utils/customHooks/useConstraint';
import { customStyles } from '../../../utils/selectStyle/';
import { randomString } from '../../../utils/helper-function/randomString';
import deepClone from 'clone-deep';

/**
 * @param {{
 * mainTableDetails:mainTableDetailsType[],
 * givenTable:mainTableDetailsType,
 * onConfirm:Function,
 * onCancel:Function,
 * showModal:boolean,
 * usingFor:("primary"|"unique")
 * }} props
 */

function AddUniqueConstraint({
  mainTableDetails,
  givenTable,
  onConfirm,
  onCancel,
  showModal,
  usingFor = 'unique',
}) {
  const [constraintName, setConstraintName, constraintErr] = useConstraint(
    givenTable,
  );
  const [multiSelect, setMultiSelect] = useState(null);
  const [containerError, setContainerError] = useState(true);

  useEffect(() => {
    if (!constraintErr && multiSelect) {
      setContainerError(false);
    } else {
      setContainerError(true);
    }
  }, [constraintErr, multiSelect]);

  function multiSelectHandler(value) {
    setMultiSelect(value);
  }

  const options = [];

  givenTable.attributes.forEach((attrObj) => {
    options.push({ label: attrObj.name, value: attrObj.id });
  });

  function modalUniqueConfirmHandler() {
    const finalArr = multiSelect.map((select) => select.value);
    let finalCname;
    if (constraintName) {
      finalCname = constraintName;
    } else {
      finalCname = randomString();
    }
    const newMainTableDetails = deepClone(mainTableDetails);
    const tableIndex = newMainTableDetails.findIndex(
      (table) => table.id === givenTable.id,
    );
    newMainTableDetails[tableIndex].tableLevelConstraint.UNIQUETABLELEVEL.push({
      constraintName: finalCname,
      attributes: finalArr,
    });
    finalArr.forEach((id) => {
      newMainTableDetails[tableIndex].attributes.some((attr) => {
        let ret = false;
        if (attr.id === id) {
          attr.inTableLevelUniquConstraint.push(finalCname);
          ret = true;
        }
        return ret;
      });
    });
    onConfirm(newMainTableDetails);
  }

  function modalPrimaryConfirmHandler() {
    const finalArr = multiSelect.map((select) => select.value);
    let finalCname;
    if (constraintName) {
      finalCname = constraintName;
    } else {
      finalCname = randomString();
    }
    const newMainTableDetails = deepClone(mainTableDetails);
    const tableIndex = newMainTableDetails.findIndex(
      (table) => table.id === givenTable.id,
    );
    newMainTableDetails[tableIndex].tableLevelConstraint.PRIMARYKEY = {
      constraintName: finalCname,
      attributes: finalArr,
    };
    finalArr.forEach((id) => {
      newMainTableDetails[tableIndex].attributes.some((attr) => {
        let ret = false;
        if (attr.id === id) {
          attr.isPRIMARYKEY = true;
          ret = true;
        }
        return ret;
      });
    });
    onConfirm(newMainTableDetails);
  }

  // cancel on esc, not doing submit on enter because it will not work with react select
  useEffect(() => {
    function doneOnEnterModalHandler(e) {
      if (e.key === 'Escape') {
        onCancel();
      }
    }
    document.addEventListener('keyup', doneOnEnterModalHandler);
    return function cleanup() {
      document.removeEventListener('keyup', doneOnEnterModalHandler);
    };
  }, []);

  return (
    <Modal
      canCancel
      canConfirm
      size='medium'
      show={showModal}
      topAligned
      primary
      confirmDisabled={containerError}
      title={
        usingFor === 'unique'
          ? `Add unique constraint to ${givenTable.tableName}`
          : `Add primary key to ${givenTable.tableName}`
      }
      modalConfirmed={
        usingFor === 'unique'
          ? modalUniqueConfirmHandler
          : modalPrimaryConfirmHandler
      }
      modalClosed={onCancel}>
      <div className={Styles.container}>
        <Input
          value={constraintName}
          onChange={setConstraintName}
          error={constraintErr}
          label='constraint name'
          type='text'
          autoFocus
          dimension='large'
          errorMessage={'constraint name already exist in table'}
        />
        <div>
          <Select
            className={Styles.selectContainer}
            styles={customStyles}
            options={options}
            value={multiSelect}
            isMulti
            onChange={multiSelectHandler}
            placeholder={
              usingFor === 'unique'
                ? 'Select Composite Unique Key'
                : 'select primary or composite primary key'
            }
          />
        </div>
      </div>
    </Modal>
  );
}

export default AddUniqueConstraint;
