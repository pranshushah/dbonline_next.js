import databaseSqlObj from '../constant/sqlDatabase';
export const sqlDatabaseRadioList = [
  { label: 'ORACLE-SQL', value: databaseSqlObj.ORACLE, checked: true },
  { label: 'MY-SQL', value: databaseSqlObj.MYSQL, disabled: true },
  { label: 'POSTGRE-SQL', value: databaseSqlObj.POSTGRESQL, disabled: true },
];
