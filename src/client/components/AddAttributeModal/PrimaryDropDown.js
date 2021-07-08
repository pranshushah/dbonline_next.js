import React from 'react';
import Select from 'react-select';
import '../../utils/Types';
import { customStyles } from '../../utils/selectStyle';
/**
 * @param {{primaryKeyValues:Array,currentTable:mainTableDetailsType,allTables:mainTableDetailsType[],onAttrSelected:Function}} props
 */

function primaryKeyDropDown({
  allTables,
  onAttrSelected,
  currentTable,
  currentValue,
  primaryKeyValues,
}) {
  const index = allTables.findIndex(
    (mainTableDetail) => mainTableDetail.id === currentTable.id,
  );

  const options = [];
  for (let i = 0; i < allTables[index].attributes.length; i++) {
    options.push({
      label: allTables[index].attributes[i].name,
      value: allTables[index].attributes[i].id,
    });
  }
  // adding current value;
  if (currentValue) {
    options.push({ label: currentValue, value: null });
  }
  function uniqueSelectHandler(value) {
    onAttrSelected(value);
  }

  return (
    <Select
      options={options}
      value={primaryKeyValues}
      isMulti
      styles={customStyles}
      onChange={uniqueSelectHandler}
      placeholder='Select primary key'
    />
  );
}

export default primaryKeyDropDown;
