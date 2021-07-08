import React from 'react';
import Select from 'react-select';
import '../../utils/Types';
import { customStyles } from '../../utils/selectStyle';
/**
 * @param {{selectedTable:string,mainTableDetails:mainTableDetailsType[],onAttrSelected:Function}} props
 */
function SelectReferencingAttr({
  selectedTable,
  mainTableDetails,
  onAttrSelected,
  value,
}) {
  const index = mainTableDetails.findIndex(
    (mainTableDetail) => mainTableDetail.id === selectedTable,
  );

  let options = [];
  for (let i = 0; i < mainTableDetails[index].attributes.length; i++) {
    if (
      (mainTableDetails[index].attributes[i].isNOTNULL &&
        mainTableDetails[index].attributes[i].isUNIQUE) ||
      mainTableDetails[index].attributes[i].isPRIMARYKEY
    )
      options.push({
        label: mainTableDetails[index].attributes[i].name,
        value: mainTableDetails[index].attributes[i].id,
      });
  }

  function attrSelectHandler(value) {
    onAttrSelected(value.value);
  }

  return (
    <Select
      styles={customStyles}
      options={options}
      onChange={attrSelectHandler}
      placeholder='Select Referencing Attribute'
      noOptionsMessage={() => 'Candidate key not found.'}
    />
  );
}

export default SelectReferencingAttr;
