import '../Types';
const parser = require('js-sql-parser');

/**
 * @param {attributeObj[]} attr
 */
function getPrimaryStrings(attr) {
  const arr = [];
  attr.forEach((at) => {
    if (at.isPRIMARYKEY) {
      arr.push(at.name);
    }
  });
  return arr.join(',');
}

/**
 * @param {attributeObj[]} attr
 * @param {string} constraint
 */
function getUniqueStrings(attr, constraint) {
  const arr = [];
  attr.forEach((at) => {
    if (at.inTableLevelUniquConstraint.length > 0) {
      if (at.inTableLevelUniquConstraint.includes(constraint)) {
        arr.push(at.name);
      }
    }
  });
  const str = arr.join(',');
  return str;
}

/**
 * @param {attributeObj[]} attr
 * @param {string} id
 */
function referencedAttString(attr, id) {
  const index = attr.findIndex((at) => at.id === id);
  return attr[index].name;
}

function ReferencingTableString(tableId, attrId, mainTableDetails) {
  const index = mainTableDetails.findIndex((table) => table.id === tableId);
  const atIndex = mainTableDetails[index].attributes.findIndex(
    (atObj) => attrId === atObj.id,
  );
  return ` ${mainTableDetails[index].tableName} (${mainTableDetails[index].attributes[atIndex].name})`;
}

/**
 * @param {mainTableDetailsType[]} mainTableDetails
 */
export function code(mainTableDetails) {
  const tablesArr = [];
  mainTableDetails.forEach((table) => {
    const tableArr = [];
    table.attributes.forEach((attrObj) => {
      tableArr.push(
        `\n${attrObj.name} ${attrObj.dataType}${
          attrObj.size
            ? attrObj.precision
              ? `(${attrObj.size},${attrObj.precision}) `
              : `(${attrObj.size}) `
            : ''
        }${attrObj.isNOTNULL ? 'NOT NULL ' : ''}${
          attrObj.isUNIQUE ? 'UNIQUE ' : ''
        }${attrObj.isAUTOINCREMENT ? 'AUTO_INCREMENT ' : ''}${
          attrObj.DEFAULT ? ` DEFAULT ${attrObj.DEFAULT}` : ''
        },`,
      );
    });
    if (table.tableLevelConstraint.PRIMARYKEY) {
      tableArr.push(
        `\n CONSTRAINT ${
          table.tableLevelConstraint.PRIMARYKEY.constraintName
        } PRIMARY KEY (${getPrimaryStrings(table.attributes)}),`,
      );
    }
    if (table.tableLevelConstraint.UNIQUETABLELEVEL.length > 0) {
      table.tableLevelConstraint.UNIQUETABLELEVEL.forEach((uniqueObj) => {
        tableArr.push(
          `\n CONSTRAINT ${uniqueObj.constraintName} UNIQUE (${getUniqueStrings(
            table.attributes,
            uniqueObj.constraintName,
          )}) ,`,
        );
      });
    }
    if (table.tableLevelConstraint.FOREIGNKEY.length > 0) {
      table.tableLevelConstraint.FOREIGNKEY.forEach((foreignObj) => {
        tableArr.push(
          `\nCONSTRAINT ${
            foreignObj.constraintName
          } FOREIGN KEY (${referencedAttString(
            table.attributes,
            foreignObj.referencedAtt,
          )}) REFERENCES ${ReferencingTableString(
            foreignObj.ReferencingTable,
            foreignObj.ReferencingAtt,
            mainTableDetails,
          )} ,`,
        );
      });
    }
    if (table.tableLevelConstraint.CHECK.length > 0) {
      table.tableLevelConstraint.CHECK.forEach((checkObj) => {
        tableArr.push(
          `\nCONSTRAINT ${checkObj.constraintName} CHECK ${
            parser.stringify(checkObj.AST).split('WHERE')[1]
          }`,
        );
      });
    }
    tablesArr.push(
      `CREATE TABLE ${table.tableName} ( ${tableArr.join('')} \n )`,
    );
  });
  const answerCode = tablesArr.join('\n\n');
  const element = document.createElement('a');
  const file = new Blob([answerCode], {
    type: 'application/sql',
  });
  element.href = URL.createObjectURL(file);
  element.download = 'myFile.sql';
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
}
