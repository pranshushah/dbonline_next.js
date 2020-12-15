import { oracleDataTypes } from '../attributeDataTypes';
/**
 * @param {databaseType} database
 */
export function getDataTypeList(database) {
  if (database.databaseType === 'oracle') {
    return oracleDataTypes;
  }
}
