export interface tableDndDetails {
  top: number;
  left: number;
  id: string;
  color: string;
}

export interface attributeObj {
  id: string;
  name: string;
  dataType: string;
  size?: number;
  precision?: number;
  isNOTNULL?: boolean;
  isUNIQUE?: boolean;
  isPRIMARYKEY?: boolean;
  isFOREIGNKEY?: boolean;
  isAUTOINCREMENT?: boolean;
  DEFAULT?: string;
  inTableLevelUniquConstraint: string[];
}

export interface foreignKeyObj {
  referencedAtt: string;
  ReferencingTable: string;
  ReferencingAtt: string;
  constraintName?: string;
  cascade?: boolean;
  setNull?: boolean;
}

export interface primaryKeyObj {
  attributes: string[];
  constraintName?: string;
}

export interface UNIQUETABLELEVELObj {
  attributes: string[];
  constraintName?: string;
}

export interface CHECKObj {
  AST: object;
  constraintName?: string;
}

export interface tableLevelConstraintObj {
  PRIMARYKEY?: primaryKeyObj;
  FOREIGNKEY?: foreignKeyObj[];
  UNIQUETABLELEVEL?: UNIQUETABLELEVELObj[];
  CHECK?: CHECKObj[];
}

export interface mainTableDetails {
  id: string;
  tableName: string;
  attributes: attributeObj[];
  tableLevelConstraint: tableLevelConstraintObj;
}

export interface database {
  id: string;
  databaseName: string;
  mainTableDetails: mainTableDetails[];
  tableDndDetails: tableDndDetails[];
  createdAt: Date;
  modifiedAt: Date;
  databaseType: 'oracle' | 'postgresql' | 'mysql';
}
