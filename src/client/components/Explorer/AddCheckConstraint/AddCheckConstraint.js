import React, { useState, useEffect } from 'react';
import Modal from '../../UI/Modal/Modal';
import Input from '../../UI/Input/Input';
import { useCheckExpr } from '../../../utils/customHooks/useCheckExpr';
import Styles from './AddCheckConstraint.module.scss';
import { randomString } from '../../../utils/helper-function/randomString';
import { useConstraint } from '../../../utils/customHooks/useConstraint';
import produce from 'immer';
const parser = require('js-sql-parser');

/**
 * @param {{
 * mainTableDetails:mainTableDetailsType[],
 * givenTable:mainTableDetailsType,
 * onConfirm:Function,
 * onCancel:Function,
 * showModal:boolean,
 * }} props
 */
function AddCheckConstraint({
  mainTableDetails,
  givenTable,
  onCancel,
  onConfirm,
  showModal,
}) {
  const [constraintName, setConstraintName, constraintErr] = useConstraint(
    givenTable,
  );
  const [
    checkExpr,
    checkExprError,
    checkExprErrorMessage,
    showExprError,
    checkExpressionHandler,
    checkExpressionFocusHandler,
    checkExpressionShowErrorHandler,
    blurHandler,
  ] = useCheckExpr();
  const [containerError, setContainerError] = useState(true);

  useEffect(() => {
    if (constraintErr || checkExprError) {
      setContainerError(true);
    } else {
      setContainerError(false);
    }
  }, [constraintErr, checkExprError]);

  // submit on enter and cancel on escape
  useEffect(() => {
    function doneOnEnterModalHandler(e) {
      if (e.key === 'Enter') {
        if (!containerError) {
          modalConfirmHandler();
          document.removeEventListener('keyup', doneOnEnterModalHandler);
        }
      } else {
        if (e.key === 'Escape') {
          onCancel();
          document.removeEventListener('keyup', doneOnEnterModalHandler);
        }
      }
    }

    document.addEventListener('keyup', doneOnEnterModalHandler);
    return function cleanup() {
      document.removeEventListener('keyup', doneOnEnterModalHandler);
    };
  }, [containerError, checkExpr, constraintName]);

  function modalConfirmHandler() {
    let finalCname;
    if (constraintName) {
      finalCname = constraintName;
    } else {
      finalCname = randomString();
    }
    const newMainTableDetails = produce(mainTableDetails, (draft) => {
      const tableIndex = draft.findIndex((table) => table.id === givenTable.id);
      draft[tableIndex].tableLevelConstraint.CHECK.push({
        constraintName: finalCname,
        AST: parser.parse(`select * from boom WHERE (${checkExpr})`),
      });
    });
    onConfirm(newMainTableDetails);
  }
  return (
    <Modal
      canCancel
      canConfirm
      size='medium'
      show={showModal}
      topAligned
      primary
      confirmDisabled={containerError}
      title={`Add check constraint to the ${givenTable.tableName}`}
      modalConfirmed={modalConfirmHandler}
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
        <div className={Styles.inputContainer}>
          <Input
            value={checkExpr}
            onChange={checkExpressionHandler}
            error={checkExprError && showExprError}
            label='check expression'
            type='text'
            onBlur={blurHandler}
            onMouseLeave={checkExpressionShowErrorHandler}
            onFocus={checkExpressionFocusHandler}
            dimension='large'
            errorMessage={checkExprErrorMessage}
          />
        </div>
      </div>
    </Modal>
  );
}

export default AddCheckConstraint;
