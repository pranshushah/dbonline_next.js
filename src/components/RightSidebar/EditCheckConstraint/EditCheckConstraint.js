import React, { useState, useEffect } from 'react';
import Button from '../../UI/Button/Button';
import Input from '../../UI/Input/Input';
import { constraintError } from '../../../utils/helper-function/constraintError';
import Styles from './EditCheckConstraint.module.scss';
import cloneDeep from 'clone-deep';
const parser = require('js-sql-parser');
import DeleteConstraintModal from '../DeleteConstraintModal/DeleteConstraintModal';
/**
 * @param {{
 * onRightSideBarAfterConfirmOrDelete:Function,
 * mainTableDetails:mainTableDetailsType[],
 * table:mainTableDetailsType,
 * checkConstraintName:string,
 * checkExpr:string,
 * initialCheckConstraintName:string,
 * onCheckConstraintNameChange:Function,
 * onCheckExprChange:Function,
 * onCancel:Function,
 * }} props
 */

function EditCheckConstraint({
  table,
  checkConstraintName,
  initialCheckConstraintName,
  checkExpr,
  onCancel,
  onCheckConstraintNameChange,
  onCheckExprChange,
  onRightSideBarAfterConfirmOrDelete,
  mainTableDetails,
}) {
  const [checkConstraintNameError, setCheckConstraintNameError] = useState(
    false,
  );
  const [
    checkConstraintNameErrorMessage,
    setCheckConstraintNameErrorMessage,
  ] = useState('');
  const [checkExprError, setCheckExprError] = useState(false);
  const [checkExprDirty, setCheckExprDirty] = useState(false);
  const [checkExprErrorMessage, setCheckExprErrorMessage] = useState('');
  const [containerError, setContainerError] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showExprError, setShowExprError] = useState(false);

  useEffect(() => {
    try {
      parser.parse(`select * from boom WHERE (${checkExpr})`);
      setCheckExprError(false);
    } catch {
      if (showExprError) {
        if (checkExpr.length === 0) {
          setCheckExprError(true);
          setCheckExprErrorMessage("expression can't be empty");
        } else {
          setCheckExprError(true);
          setCheckExprErrorMessage('invalid expression');
        }
      } else {
        setCheckExprError(true);
      }
    }
  }, [checkExpr, showExprError]);

  useEffect(() => {
    if (initialCheckConstraintName === checkConstraintName) {
      setCheckConstraintNameError(false);
    } else {
      if (constraintError(checkConstraintName, table)) {
        setCheckConstraintNameError(true);
        setCheckConstraintNameErrorMessage('constraint name already exist');
      } else {
        setCheckConstraintNameError(false);
      }
    }
  }, [checkConstraintName, table, initialCheckConstraintName]);

  useEffect(() => {
    if (!checkConstraintNameError && !checkExprError) {
      setContainerError(false);
    } else {
      setContainerError(true);
    }
  }, [checkConstraintNameError, checkExprError]);

  function constraintChangeHandler(e) {
    onCheckConstraintNameChange(e.target.value.trim());
  }
  function checkExpressionHandler(e) {
    onCheckExprChange(e.target.value);
  }
  function checkExpressionDirtyHandler() {
    setCheckExprDirty(true);
  }

  function checkExpressionShowErrorHandler() {
    if (checkExprDirty) {
      setShowExprError(true);
    } else {
      setShowExprError(false);
    }
  }

  function confirmModalHandler() {
    setShowDeleteModal(false);
    deleteCheckConstraintClickHandler();
  }

  function cancelModalHandler() {
    setShowDeleteModal(false);
  }

  function showModalHandler() {
    setShowDeleteModal(true);
  }

  function blurHandler() {
    setShowExprError(true);
  }

  function confirmCheckConstraintClickHandler() {
    let finalConstraintName;
    if (checkConstraintName.length === 0) {
      finalConstraintName = initialCheckConstraintName;
    } else {
      finalConstraintName = checkConstraintName;
    }
    const newMainTableDetails = cloneDeep(mainTableDetails);
    const tableIndex = newMainTableDetails.findIndex(
      (givenTable) => givenTable.id === table.id,
    );
    const constraintIndex = newMainTableDetails[
      tableIndex
    ].tableLevelConstraint?.CHECK.findIndex((checkObj) => {
      return checkObj.constraintName === initialCheckConstraintName;
    });
    newMainTableDetails[tableIndex].tableLevelConstraint.CHECK[
      constraintIndex
    ] = {
      constraintName: finalConstraintName,
      AST: parser.parse(`select * from boom WHERE (${checkExpr})`),
    };
    onRightSideBarAfterConfirmOrDelete(newMainTableDetails);
  }
  function deleteCheckConstraintClickHandler() {
    const newMainTableDetails = cloneDeep(mainTableDetails);
    const tableIndex = newMainTableDetails.findIndex(
      (givenTable) => givenTable.id === table.id,
    );
    const constraintIndex = newMainTableDetails[
      tableIndex
    ].tableLevelConstraint?.CHECK.findIndex((checkObj) => {
      return checkObj.constraintName === checkConstraintName;
    });
    newMainTableDetails[tableIndex].tableLevelConstraint.CHECK.splice(
      constraintIndex,
      1,
    );
    onRightSideBarAfterConfirmOrDelete(newMainTableDetails);
  }
  return (
    <div>
      {showDeleteModal && (
        <DeleteConstraintModal
          show={showDeleteModal}
          onModalConfirmed={confirmModalHandler}
          onModalCanceled={cancelModalHandler}
          title={`Are sure you want to delete ${initialCheckConstraintName} check constraint`}
        />
      )}
      <div className={Styles.inputContainer}>
        <Input
          usingFor={'sidebar'}
          value={checkConstraintName}
          onChange={constraintChangeHandler}
          dimension='huge'
          error={checkConstraintNameError}
          label='constraint name'
          errorMessage={checkConstraintNameErrorMessage}
        />
      </div>
      <div className={Styles.inputContainer}>
        <Input
          usingFor={'sidebar'}
          value={checkExpr}
          label='expression'
          required
          onBlur={blurHandler}
          onFocus={checkExpressionDirtyHandler}
          error={checkExprError && showExprError}
          errorMessage={checkExprErrorMessage}
          onChange={checkExpressionHandler}
          onMouseLeave={checkExpressionShowErrorHandler}
          dimension='huge'
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
            onClick={confirmCheckConstraintClickHandler}
            dimension='small'
            darkPrimary
            className={Styles.button}
            disabled={containerError}>
            Confirm
          </Button>
        </div>
      </div>
    </div>
  );
}

export default EditCheckConstraint;
