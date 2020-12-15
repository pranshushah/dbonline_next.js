export function oracleSizeError(str) {
  if (str === 'VARCHAR2' || str === 'NVARCHAR2' || str === 'RAW') {
    return true;
  } else {
    return false;
  }
}

export function oracleHasSize(str) {
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

export function oracleHasPre(str) {
  if (str === 'NUMBER') {
    return true;
  } else {
    return false;
  }
}

export function mysqlSize(str) {
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

export function mysqlHasPre(str) {
  if (str === 'FLOAT' || str === 'DOUBLE' || str === 'DECIMAL') {
    return true;
  } else {
    return false;
  }
}

export function mySqlSizeError(str) {
  if (
    str === 'CHAR' ||
    str === 'VARCHAR' ||
    str === 'BINARY' ||
    str === 'VARBINARY'
  ) {
    return true;
  } else {
    return false;
  }
}

export function mySqlPreError(str) {
  if (str === 'DECIMAL') {
    return true;
  } else {
    return false;
  }
}
