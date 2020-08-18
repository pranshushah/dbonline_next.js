import React, { useReducer } from 'react';
import '../../../utils/Types';
import Styles from './TableList.module.scss';
import { EXPLORERCONSTANT } from '../../../utils/constant/explorer';
import AddUniqueConstraint from '../AddUniqueConstraint/AddUniqueConstraint';
import AddCheckConstraint from '../AddCheckConstraint/AddCheckConstraint';
import AddForeignConstraint from '../AddForeignConstraint/AddForeignConstraint';

const defaultState = {
  showingModal: null,
  selectedTable: {},
};
function TableListReducer(state, action) {
  switch (action.type) {
    case 'SHOW_ADD_UNIQUE': {
      return {
        ...state,
        showingModal: EXPLORERCONSTANT.UNIQUE,
        selectedTable: action.payload.table,
      };
    }
    case 'SHOW_ADD_PRIMARY': {
      return {
        ...state,
        showingModal: EXPLORERCONSTANT.PRIMARY,
        selectedTable: action.payload.table,
      };
    }
    case 'SHOW_ADD_CHECK': {
      return {
        ...state,
        showingModal: EXPLORERCONSTANT.CHECK,
        selectedTable: action.payload.table,
      };
    }

    case 'SHOW_ADD_FOREIGN': {
      return {
        ...state,
        showingModal: EXPLORERCONSTANT.FOREIGN,
        selectedTable: action.payload.table,
      };
    }
    case 'DEFAULT_STATE': {
      return defaultState;
    }
    default: {
      return state;
    }
  }
}
/**
 *
 * @param {{
 * children:React.Component[],
 * mainTableDetails:mainTableDetailsType[],
 * onMainTableDetailsChange:Function,
 * }} props
 */

function TableList({ children, mainTableDetails, onMainTableDetailsChange }) {
  const [state, dispatch] = useReducer(TableListReducer, defaultState);
  const { showingModal, selectedTable } = state;
  /**
   * @param {mainTableDetailsType} table
   */
  function addConstraintClickHandler(table, constant) {
    switch (constant) {
      case EXPLORERCONSTANT.UNIQUE: {
        console.log(table);
        dispatch({ type: 'SHOW_ADD_UNIQUE', payload: { table } });
        break;
      }
      case EXPLORERCONSTANT.PRIMARY: {
        dispatch({ type: 'SHOW_ADD_PRIMARY', payload: { table } });
        break;
      }
      case EXPLORERCONSTANT.CHECK: {
        dispatch({ type: 'SHOW_ADD_CHECK', payload: { table } });
        break;
      }

      case EXPLORERCONSTANT.FOREIGN: {
        dispatch({ type: 'SHOW_ADD_FOREIGN', payload: { table } });
        break;
      }
      default: {
        break;
      }
    }
  }
  function cancelModalHandler() {
    dispatch({ type: 'DEFAULT_STATE' });
  }
  function modalConfirmHandler(newDetails) {
    onMainTableDetailsChange(newDetails);
    dispatch({ type: 'DEFAULT_STATE' });
  }
  return (
    <>
      <ul className={Styles.container}>
        {children.map((child, index) =>
          React.cloneElement(child, {
            key: index,
            onAddConstraintIconClicked: addConstraintClickHandler,
          }),
        )}
      </ul>
      {showingModal === EXPLORERCONSTANT.UNIQUE && (
        <AddUniqueConstraint
          showModal
          mainTableDetails={mainTableDetails}
          givenTable={selectedTable}
          onCancel={cancelModalHandler}
          onConfirm={modalConfirmHandler}
        />
      )}
      {showingModal === EXPLORERCONSTANT.PRIMARY && (
        <AddUniqueConstraint
          showModal
          mainTableDetails={mainTableDetails}
          givenTable={selectedTable}
          onCancel={cancelModalHandler}
          onConfirm={modalConfirmHandler}
          usingFor='primary'
        />
      )}
      {showingModal === EXPLORERCONSTANT.CHECK && (
        <AddCheckConstraint
          showModal
          mainTableDetails={mainTableDetails}
          givenTable={selectedTable}
          onCancel={cancelModalHandler}
          onConfirm={modalConfirmHandler}
        />
      )}
      {showingModal === EXPLORERCONSTANT.FOREIGN && (
        <AddForeignConstraint
          showModal
          mainTableDetails={mainTableDetails}
          givenTable={selectedTable}
          onCancel={cancelModalHandler}
          onConfirm={modalConfirmHandler}
        />
      )}
    </>
  );
}

export default TableList;
