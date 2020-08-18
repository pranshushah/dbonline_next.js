import React from 'react';
import { dataTypes } from '../../utils/attributeDataTypes';
import Select from 'react-select';
import './dropdown.scss';
import { customStyles } from '../../utils/selectStyle';
/**
 * @param {{onNewDataSelected:Function,selectedValue:string}} props
 */
function DataTypeDropDown({ onNewDataSelected, selectedValue, ...props }) {
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
        options={dataTypes}
        placeholder='Select DataType'
        onChange={changeHandler}
      />
    </div>
  );
}

export default DataTypeDropDown;
