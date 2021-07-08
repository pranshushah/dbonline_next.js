import {
  oracleDataTypes,
  mysqlDataTypes,
  postgresTypes,
} from '../attributeDataTypes';
import '../Types';

/**
 * @param {databaseType} database
 */
export function getDataTypeList(database) {
  if (database.databaseType === 'oracle') {
    return oracleDataTypes;
  } else if (database.databaseType === 'mysql') {
    return mysqlDataTypes;
  } else {
    return postgresTypes;
  }
}
