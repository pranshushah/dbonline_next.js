import {
  getHasPre,
  getHasSize,
  getSizeError,
} from '../helper-function/size-pre-error';
export const AddObjModal = {
  AddAttributeInputValue: '',
  selectedDataType: '',
  sizeInputValue: '',
  precisionAfterDecimalInputValue: '',
  showSizeInput: false,
  showprecisionAfterDecimalInput: false,
  tableLevelCheckedItem: {},
  columnLevelCheckedItem: {},
  defaultValue: '',
  tableLevelUnique: null,
  selectedReferencingTable: '',
  selectedReferencingAttr: '',
  primaryKey: null,
  checkConstraintNameError: false,
  attributeValueError: true,
  selectDataTypeError: true,
  sizeInputValueError: false,
  selectedReferencingTableError: false,
  defaultValueError: false,
  tableLevelUniqueError: false,
  primaryKeyError: false,
  selectedReferencingAttrError: false,
  primaryKeyConstraintNameError: false,
  foreignkeyConstraintNameError: false,
  tableLevelUniqueConstraintNameError: false,
  AddAttributeInputValueDirty: false,
  sizeInputValueDirty: false,
  defaultValueDirty: false,
  AddAttributeInputValueErrorMessage: '',
  sizeInputValueErrorMessage: '',
  defaultValueErrorMessage: '',
};

export function AddAttributeReducer(state, action) {
  switch (action.type) {
    case 'ATTRIBUTENAME_ALREADY_EXIST': {
      return {
        ...state,
        AddAttributeInputValue: action.payload.val,
        attributeValueError: true,
        AddAttributeInputValueDirty: true,
        AddAttributeInputValueErrorMessage: 'attribute name already exist',
      };
    }
    case 'ATTRIBUTENAME_CANNOT_NULL': {
      return {
        ...state,
        AddAttributeInputValue: action.payload.val,
        attributeValueError: true,
        AddAttributeInputValueDirty: true,
        AddAttributeInputValueErrorMessage: "attribute name can't be empty",
      };
    }
    case 'ATTRIBUTENAME_IS_BANNED': {
      return {
        ...state,
        AddAttributeInputValue: action.payload.val,
        attributeValueError: true,
        AddAttributeInputValueDirty: true,
        AddAttributeInputValueErrorMessage: 'this is reserved word',
      };
    }
    case 'ATTRIBUTENAME_ALL_OK': {
      return {
        ...state,
        AddAttributeInputValue: action.payload.val,
        attributeValueError: false,
        AddAttributeInputValueDirty: true,
        AddAttributeInputValueErrorMessage: '',
      };
    }
    case 'DATATYPE_SELECTED': {
      return {
        ...state,
        selectedDataType: action.payload.value,
        selectDataTypeError: false,
        showSizeInput: getHasSize(
          action.payload.database,
          action.payload.value,
        ),
        showprecisionAfterDecimalInput: getHasPre(
          action.payload.database,
          action.payload.value,
        ),
        sizeInputValueError: getSizeError(
          action.payload.database,
          action.payload.value,
        ),
        sizeInputValueDirty: false,
        sizeInputValue: '',
        precisionAfterDecimalInputValue: '',
      };
    }
    case 'EMPTY_SIZE_INPUT': {
      return {
        ...state,
        sizeInputValue: action.payload.val,
        sizeInputValueError: true,
        sizeInputValueDirty: true,
        sizeInputValueErrorMessage: "size can't be null",
      };
    }
    case 'SIZE_INPUT_OK': {
      return {
        ...state,
        sizeInputValue: action.payload.val,
        sizeInputValueError: false,
        sizeInputValueDirty: true,
        sizeInputValueErrorMessage: '',
      };
    }
    case 'PRECISION_INPUT_OK': {
      return {
        ...state,
        precisionAfterDecimalInputValue: action.payload.val,
      };
    }
    case 'TABLEVELCHECKEDITEMS_FOREIGNKEY_REMOVED': {
      return {
        ...state,
        tableLevelCheckedItem: action.payload.newCheckedItems,
        selectedReferencingAttr: '',
        selectedReferencingTable: '',
      };
    }
    case 'TABLEVELCHECKEDITEMS_NORMAL': {
      return {
        ...state,
        tableLevelCheckedItem: action.payload.newCheckedItems,
      };
    }
    case 'TABLEVELCHECKEDITEMS_HAS_FOREIGNKEY_NOERROR': {
      return {
        ...state,
        selectedReferencingAttrError: false,
        selectedReferencingTableError: false,
      };
    }
    case 'TABLEVELCHECKEDITEMS_HASNO_FOREIGNKEY': {
      return {
        ...state,
        selectedReferencingAttrError: false,
        selectedReferencingTableError: false,
        selectedReferencingAttr: null,
        selectedReferencingTable: null,
      };
    }
    case 'TABLEVELCHECKEDITEMS_HAS_FOREIGNKEY_ERROR': {
      return {
        ...state,
        selectedReferencingAttrError: true,
        selectedReferencingTableError: true,
      };
    }
    case 'FOREIGNKEY_REFERENCING_TABLE_SELECTED': {
      return {
        ...state,
        selectedReferencingTable: action.payload.value,
        selectedReferencingAttr: null,
      };
    }
    case 'FOREIGNKEY_REFERENCING_ATTR_SELECTED': {
      return {
        ...state,
        selectedReferencingAttr: action.payload.value,
      };
    }
    case 'NEWDATA_AFTER_FOREIGNKEYSELECTED': {
      return {
        ...state,
        selectedDataType: action.payload.newObj.dataType,
        showSizeInput: action.payload.newObj.sizeInputValue ? true : false,
        showprecisionAfterDecimalInput: action.payload.newObj.preInputValue
          ? true
          : false,
        sizeInputValue: action.payload.newObj.sizeInputValue
          ? action.payload.newObj.sizeInputValue
          : state.sizeInputValue,
        precisionAfterDecimalInputValue: action.payload.newObj.preInputValue
          ? action.payload.newObj.preInputValue
          : state.precisionAfterDecimalInputValue,
        selectDataTypeError: false,
      };
    }
    case 'NEW_TABLELEVEL_UNIQUE': {
      return {
        ...state,
        tableLevelUnique: action.payload.value,
      };
    }
    case 'TABLELEVEL_UNIQUE_ERROR': {
      return {
        ...state,
        tableLevelUniqueError: true,
      };
    }

    case 'TABLELEVEL_UNIQUE_NOERROR': {
      return {
        ...state,
        tableLevelUniqueError: false,
      };
    }
    case 'NEW_PRIMARYKEY': {
      return {
        ...state,
        primaryKey: action.payload.value,
      };
    }
    case 'PRIMARYKEY_ERROR': {
      return {
        ...state,
        primaryKeyError: true,
      };
    }
    case 'PRIMARYKEY_NOERROR': {
      return {
        ...state,
        primaryKeyError: false,
      };
    }
    case 'COLUMNCHECKEDITEMS_DEFAULT_REMOVED': {
      return {
        ...state,
        columnLevelCheckedItem: action.payload.newCheckedItems,
        defaultValue: '',
      };
    }
    case 'COLUMNCHECKEDITEMS_NORMAL': {
      return {
        ...state,
        columnLevelCheckedItem: action.payload.newCheckedItems,
      };
    }
    case 'COLUMN_DEFAULT_ERROR': {
      return {
        ...state,
        defaultValueError: true,
        defaultValueErrorMessage: "default value can't be null",
      };
    }
    case 'COLUMN_DEFAULT_NOERROR': {
      return {
        ...state,
        defaultValueError: false,
        defaultValueErrorMessage: '',
      };
    }
    case 'COLUMN_DEFAULT_CHANGED': {
      return {
        ...state,
        defaultValue: action.payload.value,
        defaultValueDirty: true,
      };
    }
    case 'MODAL_CLEANUP': {
      return { ...AddObjModal };
    }
    default:
      return state;
  }
}
