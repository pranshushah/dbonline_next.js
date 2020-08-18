export const stringTypes = [
  { label: 'CHAR', value: 'CHAR' },
  { label: 'VARCHAR2', value: 'VARCHAR2' },
  { label: 'NCHAR', value: 'NCHAR' },
  { label: 'NVARCHAR2', value: 'NVARCHAR2' },
  { label: 'CLOB', value: 'CLOB' },
  { label: 'NCLOB', value: 'NCLOB' },
  { label: 'LONG', value: 'LONG' },
];

export const numericTypes = [{ label: 'NUMBER', value: 'NUMBER' }];

export const dateAndTimeTypes = [{ label: 'DATE', value: 'DATE' }];

export const binaryTypes = [
  { label: 'BLOB', value: 'BLOB' },
  { label: 'BFILE', value: 'BFILE' },
  { label: 'RAW', value: 'RAW' },
  { label: 'LONG RAW', value: 'LONG RAW' },
];

export const dataTypes = [
  {
    label: 'string',
    options: stringTypes,
  },
  {
    label: 'Numeric',
    options: numericTypes,
  },
  {
    label: 'Date',
    options: dateAndTimeTypes,
  },
  {
    label: 'binary datatypes',
    options: binaryTypes,
  },
];
