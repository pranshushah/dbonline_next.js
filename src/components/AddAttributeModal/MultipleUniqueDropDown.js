import React from 'react';
import Select from 'react-select';
import '../../utils/Types';
import { customStyles } from '../../utils/selectStyle';

/**
 * @param {{currentTable:mainTableDetailsType,
 * allTables:mainTableDetailsType[],
 * onAttrSelected:Function,
 * uniques:Array
 * }} props
 */

function MultipleUniqueDropDown({
  allTables,
  onAttrSelected,
  currentTable,
  currentValue,
  uniques,
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
      styles={customStyles}
      options={options}
      value={uniques}
      isMulti
      onChange={uniqueSelectHandler}
      placeholder='Select Composite Unique Key'
    />
  );
}

export default MultipleUniqueDropDown;
