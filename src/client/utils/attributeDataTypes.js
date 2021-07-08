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

const postgreSqlBooleanType = [{ label: 'BOOLEAN', value: 'BOOLEAN' }];

const postgreSqlStringType = [
  { label: 'CHAR', value: 'CHAR' },
  { label: 'VARCHAR', value: 'VARCHAR' },
  { label: 'TEXT', value: 'TEXT' },
];

const postgresSqlNumericType = [
  { label: 'SMALLINT', value: 'SMALLINT' },
  { label: 'INTEGER', value: 'INTEGER' },
  { label: 'BIGINT', value: 'BIGINT' },
  { label: 'NUMERIC', value: 'NUMERIC' },
  { label: 'REAL', value: 'REAL' },
  { label: 'DOUBLE PRECISION', value: 'DOUBLE PRECISION' },
  { label: 'SERIAL', value: 'SERIAL' },
  { label: 'BIGSERIAL', value: 'BIGSERIAL' },
];

const postgreDateAndTimeTyps = [
  { label: 'DATE', value: 'DATE' },
  { label: 'TIME', value: 'TIME' },
  { label: 'TIMESTAMP', value: 'TIMESTAMP' },
  { label: 'TIMESTAMPTZ', value: 'TIMESTAMPTZ' },
  { label: 'INTERVAL', value: 'INTERVAL' },
];

const postgresGeoTypes = [
  { label: 'POINT', value: 'POINT' },
  { label: 'LINE', value: 'LINE' },
  { label: 'LSEG', value: 'LSEG' },
  { label: 'BOX', value: 'BOX' },
  { label: 'PATH', value: 'PATH' },
  { label: 'CIRCLE', value: 'CIRCLE' },
  { label: 'POLYGON', value: 'POLYGON' },
];

const postgresUUID = [{ label: 'UUID', value: 'UUID' }];
const postgresMoney = [{ label: 'MONEY', value: 'MONEY' }];

const postgresRangeTypes = [
  { label: 'INT4RANGE', value: 'INT4RANGE' },
  { label: 'INT8RANGE', value: 'INT8RANGE' },
  { label: 'NUMRANGE', value: 'NUMRANGE' },
  { label: 'TSRANGE', value: 'TSRANGE' },
  { label: 'TSTZRANGE', value: 'TSTZRANGE' },
  { label: 'DATERANGE', value: 'DATERANGE' },
];

const postgresNetworkTypes = [
  { label: 'CIDR', value: 'CIDR' },
  { label: 'INET', value: 'INET' },
  { label: 'MACADDR', value: 'MACADDR' },
  { label: 'MACADDR8', value: 'MACADDR8' },
];

const postgresBitStringTypes = [
  { label: 'BIT', value: 'BIT' },
  { label: 'BIT VARYING', value: 'BIT VARYING' },
];

const postgresBinaryTypes = [{ label: 'BYTEA', value: 'BYTEA' }];

export const postgresTypes = [
  {
    label: 'string',
    options: postgreSqlStringType,
  },
  {
    label: 'Numeric',
    options: postgresSqlNumericType,
  },
  {
    label: 'Date and Time',
    options: postgreDateAndTimeTyps,
  },
  {
    label: 'Boolean',
    options: postgreSqlBooleanType,
  },
  {
    label: 'Geo',
    options: postgresGeoTypes,
  },
  {
    label: 'Ranges',
    options: postgresRangeTypes,
  },
  {
    label: 'Network',
    options: postgresNetworkTypes,
  },
  {
    label: 'Bit string',
    options: postgresBitStringTypes,
  },
  {
    label: 'UUID',
    options: postgresUUID,
  },
  {
    label: 'Money',
    options: postgresMoney,
  },
  {
    label: 'Binary',
    options: postgresBinaryTypes,
  },
];
