import React from 'react';
import Select from 'react-select';
import { customStyles } from '../../utils/selectStyle';

/**
 * @param {{currentTable:string,otherTables:mainTableDetailsType[],onTableSelected:Function}} props
 */

function TableNameDropDown({ otherTables, onTableSelected }) {
  const options = [];
  for (let i = 0; i < otherTables.length; i++) {
    options.push({
      label: `${otherTables[i].tableName}`,
      value: `${otherTables[i].id}`,
    });
  }
  function tableSelectedHandler(value) {
    onTableSelected(value.value);
  }
  return (
    <Select
      styles={customStyles}
      options={options}
      onChange={tableSelectedHandler}
      placeholder='Select Referencing Table'
    />
  );
}

export default TableNameDropDown;
