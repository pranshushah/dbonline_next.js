export const defaultRightSidebarState = {
  selectedTable: {},
  showCheckConstraint: false,
  selectedCheckConstraintName: '',
  showUniqueConstraint: false,
  selectedUniqueConstraintName: '',
  showPrimaryConstraint: false,
  selectedPrimaryConstraintName: '',
  showForeignConstraint: false,
  selectedForeignConstraintName: '',
  showAttribute: false,
  selectedAttributeName: '',
};

export function rightSidebarReducer(state, action) {
  switch (action.type) {
    case 'CLOSE_PREVIOUS_BLOCK': {
      return {
        ...state,
        showCheckConstraint: false,
        showForeignConstraint: false,
        showPrimaryConstraint: false,
        showUniqueConstraint: false,
        showAttribute: false,
      };
    }
    case 'CHECKCONSTRAINT_CONTAINER_SHOW': {
      return {
        ...state,
        selectedTable: action.payload.table,
        showCheckConstraint: true,
        selectedCheckConstraintName: action.payload.name,
      };
    }
    case 'UNIQUECONSTRAINT_CONTAINER_SHOW': {
      return {
        ...state,
        selectedTable: action.payload.table,
        showUniqueConstraint: true,
        selectedUniqueConstraintName: action.payload.name,
      };
    }
    case 'PRIMARYCONSTRAINT_CONTAINER_SHOW': {
      return {
        ...state,
        selectedTable: action.payload.table,
        showPrimaryConstraint: true,
        selectedPrimaryConstraintName: action.payload.name,
      };
    }
    case 'FOREIGNCONSTRAINT_CONTAINER_SHOW': {
      return {
        ...state,
        selectedTable: action.payload.table,
        showForeignConstraint: true,
        selectedForeignConstraintName: action.payload.name,
      };
    }
    case 'ATTRIBUTE_SHOW': {
      return {
        ...state,
        selectedTable: action.payload.table,
        showAttribute: true,
        selectedAttributeName: action.payload.name,
      };
    }
    case 'DEFAULT_STATE': {
      return defaultRightSidebarState;
    }
    default: {
      return state;
    }
  }
}
