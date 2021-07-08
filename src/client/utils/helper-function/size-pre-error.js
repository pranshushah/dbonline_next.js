import '../Types';
function oracleSizeError(str) {
  if (str === 'VARCHAR2' || str === 'NVARCHAR2' || str === 'RAW') {
    return true;
  } else {
    return false;
  }
}

function oracleHasSize(str) {
  if (
    str === 'CHAR' ||
    str === 'NCHAR' ||
    str === 'NUMBER' ||
    str === 'VARCHAR2' ||
    str === 'NVARCHAR2' ||
    str === 'RAW'
  ) {
    return true;
  } else {
    return false;
  }
}

function oracleHasPre(str) {
  if (str === 'NUMBER') {
    return true;
  } else {
    return false;
  }
}

function mysqlSize(str) {
  if (
    str === 'CHAR' ||
    str === 'VARCHAR' ||
    str === 'BINARY' ||
    str === 'VARBINARY' ||
    str === 'FLOAT' ||
    str === 'DOUBLE' ||
    str === 'DECIMAL'
  ) {
    return true;
  } else {
    return false;
  }
}

function mysqlHasPre(str) {
  if (str === 'FLOAT' || str === 'DOUBLE' || str === 'DECIMAL') {
    return true;
  } else {
    return false;
  }
}

function mySqlSizeError(str) {
  if (
    str === 'CHAR' ||
    str === 'VARCHAR' ||
    str === 'BINARY' ||
    str === 'VARBINARY' ||
    str === 'DECIMAL'
  ) {
    return true;
  } else {
    return false;
  }
}

function postgresSizeError(str) {
  if (str === 'CHAR' || str === 'VARCHAR') {
    return true;
  } else {
    return false;
  }
}

function postgresHasSize(str) {
  if (
    str === 'CHAR' ||
    str === 'VARCHAR' ||
    str === 'NUMERIC' ||
    str === 'BIT' ||
    str === 'BIT VARYING'
  ) {
    return true;
  } else {
    return false;
  }
}

function postgresHasPre(str) {
  if (str === 'NUMERIC') {
    return true;
  } else {
    return false;
  }
}
/**
 * @param {databaseType} database
 * @param {string} str
 */
export function getHasSize(database, str) {
  if (database.databaseType === 'oracle') {
    return oracleHasSize(str);
  } else if (database.databaseType === 'mysql') {
    return mysqlSize(str);
  } else {
    return postgresHasSize(str);
  }
}
/**
 * @param {databaseType} database
 * @param {string} str
 */
export function getSizeError(database, str) {
  if (database.databaseType === 'oracle') {
    return oracleSizeError(str);
  } else if (database.databaseType === 'mysql') {
    return mySqlSizeError(str);
  } else {
    return postgresSizeError(str);
  }
}

/**
 * @param {databaseType} database
 * @param {string} str
 */
export function getHasPre(database, str) {
  if (database.databaseType === 'oracle') {
    return oracleHasPre(str);
  } else if (database.databaseType === 'mysql') {
    return mysqlHasPre(str);
  } else {
    return postgresHasPre(str);
  }
}
