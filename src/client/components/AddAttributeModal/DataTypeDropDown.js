import React from 'react';
import Select from 'react-select';
import { getDataTypeList } from '../../utils/helper-function/getDataType';
import { customStyles } from '../../utils/selectStyle';
/**
 * @param {{onNewDataSelected:Function,selectedValue:string,database:databaseType}} props
 */
function DataTypeDropDown({ onNewDataSelected, selectedValue, database }) {
  function changeHandler(value) {
    onNewDataSelected(value.value);
  }
  return (
    <div style={{ marginTop: '18px' }}>
      <Select
        value={
          selectedValue ? { label: selectedValue, value: selectedValue } : null
        }
        styles={customStyles}
        options={getDataTypeList(database)}
        placeholder='Select DataType'
        onChange={changeHandler}
      />
    </div>
  );
}

export default DataTypeDropDown;
