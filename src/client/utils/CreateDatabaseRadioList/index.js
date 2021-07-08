import databaseSqlObj from '../constant/sqlDatabase';
export const sqlDatabaseRadioList = [
  { label: 'ORACLE-SQL', value: databaseSqlObj.ORACLE, checked: true },
  { label: 'MY-SQL', value: databaseSqlObj.MYSQL },
  { label: 'POSTGRE-SQL', value: databaseSqlObj.POSTGRESQL },
];
