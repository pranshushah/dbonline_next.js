import { useState, useEffect } from 'react';
import Input from '../../UI/Input/Input';
import Modal from '../../UI/Modal/Modal';
import Select from 'react-select';
import Styles from './style.module.scss';
import { customStyles } from '../../../utils/selectStyle/';
import { useRadio } from '../../../utils/customHooks/useRadio';
import { randomString } from '../../../utils/helper-function/randomString';
import { foreignConstraintRadioList } from '../../../utils/checkedItemsForAddAttr';
import deepClone from 'clone-deep';
import { useConstraint } from '../../../utils/customHooks/useConstraint';
import Radio from '../../UI/Radio/Radio';
/**
 * @param {{
 * mainTableDetails:mainTableDetailsType[],
 * givenTable:mainTableDetailsType,
 * onConfirm:Function,
 * onCancel:Function,
 * showModal:boolean,
 * }} props
 */

function AddUniqueConstraint({
  mainTableDetails,
  givenTable,
  onConfirm,
  onCancel,
  showModal,
}) {
  const [constraintName, setConstraintName, constraintErr] = useConstraint(
    givenTable,
  );
  const [referencedAtt, setReferencedAtt] = useState(null);
  const [referencingAtt, setReferencingAtt] = useState(null);
  const [referencingTable, setReferencingTable] = useState(null);
  const [containerError, setContainerError] = useState(true);
  const [foreignRadio, setForeignRadio] = useRadio(foreignConstraintRadioList);

  // this error decides if modal can be confirmed or not.
  useEffect(() => {
    if (!constraintErr && referencedAtt && referencingAtt && referencingTable) {
      setContainerError(false);
    } else {
      setContainerError(true);
    }
  }, [constraintErr, referencedAtt, referencingAtt, referencingTable]);

  // all the options
  const referencedAttOptions = [];
  const referencingTableOptions = [];
  const referencingAttOptions = [];

  givenTable.attributes.forEach((attrObj) => {
    referencedAttOptions.push({ label: attrObj.name, value: attrObj.id });
  });

  mainTableDetails.forEach((table) => {
    referencingTableOptions.push({ label: table.tableName, value: table.id });
  });

  if (referencingTable) {
    const tableIndex = mainTableDetails.findIndex(
      (table) => table.id === referencingTable.value,
    );
    // foreign keys can reference only unique and not null or primary key.
    mainTableDetails[tableIndex].attributes.forEach((attrObj) => {
      if ((attrObj.isNOTNULL && attrObj.isUNIQUE) || attrObj.isPRIMARYKEY) {
        referencingAttOptions.push({ label: attrObj.name, value: attrObj.id });
      }
    });
  }

  function ModalconfirmHandler() {
    let finalCname = constraintName ? constraintName : randomString();

    const newMainTableDetails = deepClone(mainTableDetails);
    const referencedIndex = newMainTableDetails.findIndex(
      (table) => table.id === givenTable.id,
    );
    // finding these indexes because we want to have same datatype for referncing and referenced attribute.
    const referencingTableIndex = newMainTableDetails.findIndex(
      (table) => table.id === referencingTable.value,
    );
    const referencingAttIndex = newMainTableDetails[
      referencingTableIndex
    ].attributes.findIndex((attrObj) => attrObj.id === referencingAtt.value);
    //adding cascade
    newMainTableDetails[referencedIndex].tableLevelConstraint.FOREIGNKEY.push({
      constraintName: finalCname,
      referencedAtt: referencedAtt.value,
      ReferencingAtt: referencingAtt.value,
      ReferencingTable: referencingTable.value,
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
    });
    // using array.some because it will end after true.
    newMainTableDetails[referencedIndex].attributes.some((attrObj) => {
      let ret = false;
      if (attrObj.id === referencedAtt.value) {
        attrObj['isFOREIGNKEY'] = true;
        attrObj.dataType =
          newMainTableDetails[referencingTableIndex].attributes[
            referencingAttIndex
          ].dataType;
        attrObj.size =
          newMainTableDetails[referencingTableIndex].attributes[
            referencingAttIndex
          ].size;
        attrObj.precision =
          newMainTableDetails[referencingTableIndex].attributes[
            referencingAttIndex
          ].precision;
        ret = true;
      }
      return ret;
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
      title={`Add foreign key to ${givenTable.tableName}`}
      modalConfirmed={ModalconfirmHandler}
      modalClosed={onCancel}>
      <div className={Styles.container}>
        <div className={Styles.inputContainer}>
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
        </div>
        <div className={Styles.selectContainer}>
          <Select
            className={Styles.selectContainer}
            styles={customStyles}
            options={referencedAttOptions}
            value={referencedAtt}
            onChange={setReferencedAtt}
            placeholder={'select attribute you want to reference '}
          />
        </div>
        <div className={Styles.selectContainer}>
          <Select
            className={Styles.selectContainer}
            styles={customStyles}
            options={referencingTableOptions}
            value={referencingTable}
            onChange={setReferencingTable}
            placeholder={'select referencing table'}
          />
        </div>
        {referencingTable && (
          <div className={Styles.selectContainer}>
            <Select
              className={Styles.selectContainer}
              styles={customStyles}
              options={referencingAttOptions}
              value={referencingAtt}
              onChange={setReferencingAtt}
              placeholder={'select referencing attribute'}
              noOptionsMessage={() => 'no candidate key found'}
            />
          </div>
        )}
        <div className={Styles.foreignCheckBoxContainer}>
          <h2 className={Styles.header} style={{ marginTop: '0' }}>
            On Delete:
          </h2>
          <div className={Styles.foreignCheckBox}>
            <Radio
              valueObjectArray={foreignRadio}
              nameForRadioContainer={'add-foreign'}
              onChange={setForeignRadio}
            />
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default AddUniqueConstraint;
