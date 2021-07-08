/**
 * @typedef {string} id
 */

/**
 * @typedef {("oracle" | "postgresql" | "mysql")} sqlType
 */

/**
 * @typedef {object} tableDndDetailsObj
 * @property {number} top
 * @property {number} left
 * @property {string} tableName
 * @property {id} id
 * @property {string} color
 */

/**
 * @typedef {object} attributeObj
 * @property {id} id
 * @property {string} name
 * @property {string} dataType
 * @property {number} [size]
 * @property {number} [precision]
 * @property {boolean} [isNOTNULL]
 * @property {boolean} [isUNIQUE]
 * @property {boolean} [isPRIMARYKEY]
 * @property {boolean} [isFOREIGNKEY]
 * @property {boolean} [isAUTOINCREMENT]
 * @property {string} [DEFAULT]
 * @property {string[]} inTableLevelUniquConstraint
 */

/**
 * @typedef {object} foreignKeyObj
 * @property {id} referencedAtt
 * @property {id} ReferencingTable
 * @property {id} ReferencingAtt
 * @property {string} constraintName
 * @property {boolean} [cascade]
 * @property {boolean} [setNull]
 */

/**
 * @typedef {object} primaryKeyObj
 * @property {id[]} attributes
 * @property {string} constraintName
 */

/**
 * @typedef {object} UNIQUETABLELEVELObj
 * @property {id[]} attributes
 * @property {string} constraintName
 */

/**
 * @typedef {object} CHECKObj
 * @property {object} AST
 * @property {string} constraintName
 */

/**
 * @typedef {object} tableLevelConstraintObj
 * @property {primaryKeyObj} [PRIMARYKEY]
 * @property {foreignKeyObj[]} [FOREIGNKEY]
 * @property {UNIQUETABLELEVELObj[]} [UNIQUETABLELEVEL]
 * @property {CHECKObj[]} [CHECK]
 */

/**
 * @typedef {object} mainTableDetailsType
 * @property {id} id
 * @property {string} tableName
 * @property {attributeObj[]} attributes
 * @property {tableLevelConstraintObj} tableLevelConstraint
 */

/**
 * @typedef {object} databaseType
 * @property {id} id
 * @property {string} databaseName
 * @property {mainTableDetailsType[]} mainTableDetails
 * @property {tableDndDetailsObj[]} tableDndDetails
 * @property {Date} createdAt
 * @property {Date} modifiedAt
 * @property {sqlType} databaseType
 */
