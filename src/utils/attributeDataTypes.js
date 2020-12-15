const oracleStringTypes = [
  { label: 'CHAR', value: 'CHAR' },
  { label: 'VARCHAR2', value: 'VARCHAR2' },
  { label: 'NCHAR', value: 'NCHAR' },
  { label: 'NVARCHAR2', value: 'NVARCHAR2' },
  { label: 'CLOB', value: 'CLOB' },
  { label: 'NCLOB', value: 'NCLOB' },
  { label: 'LONG', value: 'LONG' },
];

const oracleNumericTypes = [{ label: 'NUMBER', value: 'NUMBER' }];

const oracleDateAndTimeTypes = [{ label: 'DATE', value: 'DATE' }];

const oracleBinaryTypes = [
  { label: 'BLOB', value: 'BLOB' },
  { label: 'BFILE', value: 'BFILE' },
  { label: 'RAW', value: 'RAW' },
  { label: 'LONG RAW', value: 'LONG RAW' },
];

export const oracleDataTypes = [
  {
    label: 'string',
    options: oracleStringTypes,
  },
  {
    label: 'Numeric',
    options: oracleNumericTypes,
  },
  {
    label: 'Date and Time',
    options: oracleDateAndTimeTypes,
  },
  {
    label: 'binary datatypes',
    options: oracleBinaryTypes,
  },
];

const mySqlNumericTypes = [
  { label: 'TINYINT', value: 'TINYINT' },
  { label: 'SMALLINT', value: 'SMALLINT' },
  { label: 'MEDIUMINT', value: 'MEDIUMINT' },
  { label: 'INT', value: 'INT' },
  { label: 'BIGINT', value: 'BIGINT' },
  { label: 'DECIMAL', value: 'DECIMAL' },
  { label: 'FLOAT', value: 'FLOAT' },
  { label: 'DOUBLE', value: 'DOUBLE' },
  { label: 'BIT', value: 'BIT' },
];

const mySqlStringTypes = [
  { label: 'CHAR', value: 'CHAR' },
  { label: 'VARCHAR', value: 'VARCHAR' },
  { label: 'BINARY', value: 'BINARY' },
  { label: 'VARBINARY', value: 'VARBINARY' },
  { label: 'TINYBLOB', value: 'TINYBLOB' },
  { label: 'MEDIUMBLOB', value: 'MEDIUMBLOB' },
  { label: 'LONGBLOB', value: 'LONGBLOB' },
  { label: 'BLOB', value: 'BLOB' },
  { label: 'TINYTEXT', value: 'TINYTEXT' },
  { label: 'MEDIUMTEXT', value: 'MEDIUMTEXT' },
  { label: 'LONGTEXT', value: 'LONGTEXT' },
  { label: 'TEXT', value: 'TEXT' },
  { label: 'SET', value: 'SET' },
  { label: 'ENUM', value: 'ENUM' },
];

const mySqlDateTimeDataType = [
  { label: 'DATE', value: 'DATE' },
  { label: 'YEAR', value: 'YEAR' },
  { label: 'DATETIME', value: 'DATETIME' },
  { label: 'TIME', value: 'TIME' },
  { label: 'TIMESTAMP', value: 'TIMESTAMP' },
];

const mysqlSpatialDataType = [
  { label: 'POLYGON', value: 'POLYGON' },
  { label: 'LINESTRING', value: 'LINESTRING' },
  { label: 'POINT', value: 'POINT' },
  { label: 'GEOMETRY', value: 'GEOMETRY' },
  { label: 'GEOMETRYCOLLECTION', value: 'GEOMETRYCOLLECTION' },
  { label: 'MULTILINESTRING', value: 'MULTILINESTRING' },
  { label: 'MULTIPOINT', value: 'MULTIPOINT' },
  { label: 'MULTIPOLYGON', value: 'MULTIPOLYGON' },
];

export const mysqlDataTypes = [
  {
    label: 'string',
    options: mySqlStringTypes,
  },
  {
    label: 'Numeric',
    options: mySqlNumericTypes,
  },
  {
    label: 'Date and Time',
    options: mySqlDateTimeDataType,
  },
  {
    label: 'Spatial',
    options: mysqlSpatialDataType,
  },
];
