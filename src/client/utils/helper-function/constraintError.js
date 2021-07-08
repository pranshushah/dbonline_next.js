import '../Types';
/**
 *
 * @param {string} str
 * @param {mainTableDetailsType} givenTable
 */
export function constraintError(str, givenTable) {
  if (str === givenTable.tableLevelConstraint?.PRIMARYKEY?.constraintName) {
    return true;
  }
  const foreignIndex = givenTable.tableLevelConstraint?.FOREIGNKEY?.findIndex(
    (foreignObj) => foreignObj.constraintName === str,
  );
  if (foreignIndex !== -1) {
    return true;
  }
  const uniqueIndex = givenTable.tableLevelConstraint?.UNIQUETABLELEVEL?.findIndex(
    (uniqueObj) => uniqueObj.constraintName === str,
  );
  if (uniqueIndex !== -1) {
    return true;
  }
  const checkIndex = givenTable.tableLevelConstraint?.CHECK.findIndex(
    (checkObj) => checkObj.constraintName === str,
  );
  if (checkIndex !== -1) {
    return true;
  }
  return false;
}
