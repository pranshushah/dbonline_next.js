import databaseSqlObj from '../constant/sqlDatabase';
import databaseObj from '../constant/databaseTypes';
export const sqlDatabaseRadioList = [
  { label: 'ORACLE-SQL', value: databaseSqlObj.ORACLE, checked: true },
  { label: 'MY-SQL', value: databaseSqlObj.MYSQL, disabled: true },
  { label: 'POSTGRE-SQL', value: databaseSqlObj.POSTGRESQL, disabled: true },
];

export const dataTypesRadioList = [
  { label: 'SQL', value: databaseObj.SQL, checked: true },
  { label: 'NO-SQL', value: databaseObj.NOSQL, disabled: true },
];
