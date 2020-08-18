import React, { useEffect, useState } from 'react';
import Input from '../../UI/Input/Input';
import Button from '../../UI/Button/Button';
import Modal from '../../UI/Modal/Modal';
import Styles from './EditForeignConstraint.module.scss';
import { constraintError } from '../../../utils/helper-function/constraintError';
import Select from 'react-select';
import Radio from '../../UI/Radio/Radio';
import { customStyles } from '../../../utils/selectStyle';
import cloneDeep from 'clone-deep';

/**
 * @param {{
 * mainTableDetails:mainTableDetailsType[],
 * table:mainTableDetailsType,
 * foreignConstraintName:string,
 * onForeignConstraintNameChange:Function,
 * onCancel:Function,
 * referencedAtt:object,
 * referencingTable:object,
 * referencingAtt:object,
 * onReferencedAttChange:Function,
 * onReferencingAttChange:Function,
 * onReferencingTableChange:Function,
 * initialForeignConstraintName:string,
 * onForeignCheckedItem:Function,
 * foreignCheckedItem:object,
 * onRightSideBarAfterConfirmOrDelete:Function,
 * onForeignRadioChange:Function,
 * foreignRadio:Array,
 * }} props
 */

function EditUniqueConstraint({
  mainTableDetails,
  table,
  foreignConstraintName,
  onForeignConstraintNameChange,
  onCancel,
  referencedAtt,
  referencingTable,
  referencingAtt,
  onReferencedAttChange,
  onReferencingAttChange,
  onReferencingTableChange,
  initialForeignConstraintName,
  onRightSideBarAfterConfirmOrDelete,
  onForeignRadioChange,
  foreignRadio,
}) {
  const [foreignConstraintNameError, setForeignConstraintNameError] = useState(
    false,
  );
  const [
    foreignConstraintNameErrorMessage,
    setForeignConstraintNameErrorMessage,
  ] = useState('');

  const [selectError, setSelectError] = useState(false);
  const [containerError, setContainerError] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  function uniqueConstraintNameChangeHandler(e) {
    onForeignConstraintNameChange(e.target.value.trim());
  }
  useEffect(() => {
    if (initialForeignConstraintName === foreignConstraintName) {
      setForeignConstraintNameError(false);
    } else {
      if (constraintError(foreignConstraintName, table)) {
        setForeignConstraintNameError(true);
        setForeignConstraintNameErrorMessage('constraint name already exist');
      } else {
        setForeignConstraintNameError(false);
      }
    }
  }, [foreignConstraintName, table, initialForeignConstraintName]);

  useEffect(() => {
    if (referencedAtt && referencingAtt && referencingTable) {
      setSelectError(false);
    } else {
      setSelectError(true);
    }
  }, [referencedAtt, referencingAtt, referencingTable]);

  useEffect(() => {
    if (!selectError && !foreignConstraintNameError) {
      setContainerError(false);
    } else {
      setContainerError(true);
    }
  }, [selectError, foreignConstraintNameError]);

  function confirmModalHandler() {
    setShowDeleteModal(false);
    deleteForeignConstraintClickHandler();
  }
  function cancelModalHandler() {
    setShowDeleteModal(false);
  }
  function showModalHandler() {
    setShowDeleteModal(true);
  }

  const referencedAttOptions = [];
  table.attributes.forEach((attrObj) => {
    referencedAttOptions.push({ label: attrObj.name, value: attrObj.id });
  });

  const referencingTableOptions = [];
  mainTableDetails.forEach((table) => {
    referencingTableOptions.push({ label: table.tableName, value: table.id });
  });

  const referencingAttOptions = [];
  const index = mainTableDetails.findIndex(
    (table) => table.id === referencingTable.value,
  );
  mainTableDetails[index].attributes.forEach((attrObj) => {
    if ((attrObj.isNOTNULL && attrObj.isUNIQUE) || attrObj.isPRIMARYKEY) {
      referencingAttOptions.push({ label: attrObj.name, value: attrObj.id });
    }
  });

  function referencingTableChangeHandler(obj) {
    onReferencingTableChange(obj);
    onReferencingAttChange(null);
  }

  function deleteForeignConstraintClickHandler() {
    const newMainTableDetails = cloneDeep(mainTableDetails);
    const referencedTableIndex = newMainTableDetails.findIndex(
      (givenTable) => givenTable.id === table.id,
    );

    const foreignConstraintIndex = newMainTableDetails[
      referencedTableIndex
    ].tableLevelConstraint.FOREIGNKEY.findIndex(
      (foreignObj) => foreignObj.constraintName === foreignConstraintName,
    );

    const referencedAttIndex = newMainTableDetails[
      referencedTableIndex
    ].attributes.findIndex(
      (attrObj) =>
        attrObj.id ===
        newMainTableDetails[referencedTableIndex].tableLevelConstraint
          .FOREIGNKEY[foreignConstraintIndex].referencedAtt,
    );

    newMainTableDetails[
      referencedTableIndex
    ].tableLevelConstraint.FOREIGNKEY.splice(foreignConstraintIndex, 1);

    delete newMainTableDetails[referencedTableIndex].attributes[
      referencedAttIndex
    ].isFOREIGNKEY;

    // add new stuff
    onRightSideBarAfterConfirmOrDelete(newMainTableDetails);
  }

  function confirmForeignConstraintClickHandler() {
    let finalConstraintName;
    if (foreignConstraintName.length === 0) {
      finalConstraintName = initialForeignConstraintName;
    } else {
      finalConstraintName = foreignConstraintName;
    }
    const newMainTableDetails = cloneDeep(mainTableDetails);
    const referencedTableIndex = newMainTableDetails.findIndex(
      (givenTable) => givenTable.id === table.id,
    );

    const referencedAttIndex = newMainTableDetails[
      referencedTableIndex
    ].attributes.findIndex((attrObj) => attrObj.id === referencedAtt.value);

    const referencingTableIndex = newMainTableDetails.findIndex(
      (table) => table.id === referencingTable.value,
    );

    const referencingAttIndex = newMainTableDetails[
      referencingTableIndex
    ].attributes.findIndex((attrObj) => attrObj.id === referencingAtt.value);

    //delete old stuff

    const foreignConstraintIndex = newMainTableDetails[
      referencedTableIndex
    ].tableLevelConstraint.FOREIGNKEY.findIndex(
      (foreignObj) =>
        foreignObj.constraintName === initialForeignConstraintName,
    );

    const oldReferencedAttIndex = newMainTableDetails[
      referencedTableIndex
    ].attributes.findIndex(
      (attrObj) =>
        attrObj.id ===
        newMainTableDetails[referencedTableIndex].tableLevelConstraint
          .FOREIGNKEY[foreignConstraintIndex].referencedAtt,
    );

    delete newMainTableDetails[referencedTableIndex].attributes[
      oldReferencedAttIndex
    ].isFOREIGNKEY;

    // add new stuff

    newMainTableDetails[referencedTableIndex].attributes[
      referencedAttIndex
    ].dataType =
      newMainTableDetails[referencingTableIndex].attributes[
        referencingAttIndex
      ].dataType;

    newMainTableDetails[referencedTableIndex].attributes[referencedAttIndex][
      'size'
    ] =
      newMainTableDetails[referencingTableIndex].attributes[
        referencingAttIndex
      ]?.size;

    newMainTableDetails[referencedTableIndex].attributes[referencedAttIndex][
      'precision'
    ] =
      newMainTableDetails[referencingTableIndex].attributes[
        referencingAttIndex
      ]?.precision;

    newMainTableDetails[referencedTableIndex].attributes[
      referencedAttIndex
    ].isFOREIGNKEY = true;

    newMainTableDetails[referencedTableIndex].tableLevelConstraint.FOREIGNKEY[
      foreignConstraintIndex
    ] = {
      referencedAtt: referencedAtt.value,
      ReferencingAtt: referencingAtt.value,
      ReferencingTable: referencingTable.value,
      constraintName: finalConstraintName,
      cascade:
        foreignRadio.findIndex(
          (foreignObj) => foreignObj.label === 'CASCADE' && foreignObj.checked,
        ) !== -1
          ? true
          : false,
      setNull:
        foreignRadio.findIndex(
          (foreignObj) => foreignObj.label === 'SET NULL' && foreignObj.checked,
        ) !== -1,
    };

    onRightSideBarAfterConfirmOrDelete(newMainTableDetails);
  }

  return (
    <div>
      <Modal
        size='large'
        show={showDeleteModal}
        canConfirm
        canCancel
        modalConfirmed={confirmModalHandler}
        modalClosed={cancelModalHandler}
        title={`Are sure you want to delete ${initialForeignConstraintName} foreign constraint`}
      />
      <div className={Styles.inputContainer}>
        <Input
          dimension='huge'
          error={foreignConstraintNameError}
          errorMessage={foreignConstraintNameErrorMessage}
          usingFor='sidebar'
          label='constraint name'
          value={foreignConstraintName}
          onChange={uniqueConstraintNameChangeHandler}
        />
      </div>
      <h3 className={Styles.header}>referenced attribute:</h3>
      <div className={Styles.select}>
        <Select
          styles={customStyles}
          options={referencedAttOptions}
          value={referencedAtt}
          onChange={onReferencedAttChange}
          placeholder='Select referenced attribute'
        />
      </div>
      <h3 className={Styles.header}>referencing table:</h3>
      <div className={Styles.select}>
        <Select
          styles={customStyles}
          options={referencingTableOptions}
          value={referencingTable}
          onChange={referencingTableChangeHandler}
          placeholder='Select referencing table'
        />
      </div>
      <h3 className={Styles.header}>referencing attribute:</h3>
      <div className={Styles.select}>
        <Select
          styles={customStyles}
          options={referencingAttOptions}
          value={referencingAtt}
          onChange={onReferencingAttChange}
          placeholder='Select referencing Attribute'
          noOptionsMessage={() => 'no candiddate key available'}
        />
      </div>
      <div className={Styles.foreignCheckBoxContainer}>
        <h2 className={Styles.header} style={{ marginTop: '0' }}>
          On Delete:
        </h2>
        <div className={Styles.foreignCheckBox}>
          <Radio
            valueObjectArray={foreignRadio}
            nameForRadioContainer={'edit-foreign'}
            onChange={onForeignRadioChange}
          />
        </div>
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
            onClick={confirmForeignConstraintClickHandler}
            disabled={containerError}>
            Confirm
          </Button>
        </div>
      </div>
    </div>
  );
}
export default EditUniqueConstraint;
