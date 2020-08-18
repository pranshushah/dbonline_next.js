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
