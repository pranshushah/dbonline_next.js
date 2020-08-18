export const foreignConstraintRadioList = [
  { label: 'CASCADE', value: 'CASCADE' },
  { label: 'SET NULL', value: 'SET-NULL' },
];

export const foreignConstraintCheckboxList = [];
export const columnConstraintCheckboxList = [
  { name: 'NOT-NULL', label: 'NOT NULL' },
  { name: 'UNIQUE', label: 'UNIQUE' },
  { name: 'DEFAULT', label: 'DEFAULT' },
  { name: 'AUTO-INCREMENT', label: 'AUTO INCREMENT' },
];

export function getTableLevelCheckboxList(givenTable) {
  let constraintCheckboxList = [
    { name: 'UNIQUE', label: 'UNIQUE' },
    { name: 'PRIMARY-KEY', label: 'PRIMARY KEY' },
    { name: 'FOREIGN-KEY', label: 'FOREIGN KEY' },
    { name: 'CHECK', label: 'CHECK' },
  ];
  if (givenTable.tableLevelConstraint) {
    if (givenTable.tableLevelConstraint['PRIMARYKEY']) {
      constraintCheckboxList = [
        { name: 'UNIQUE', label: 'UNIQUE' },
        { name: 'FOREIGN-KEY', label: 'FOREIGN KEY' },
        { name: 'CHECK', label: 'CHECK' },
      ];
    }
  }
  return constraintCheckboxList;
}
