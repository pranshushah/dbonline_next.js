import React from 'react';
import Checkbox from '../UI/CheckBox/CheckBox';

/**
 * @param {{checkedConstraintObj:Object,onConstraintChecked:Function,checkBoxList:Array,dark:boolean}} props
 */

function ConstraintCheckBoxContainer({
  checkedConstraintObj,
  onConstraintChecked,
  checkBoxList,
  dark,
}) {
  const style = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
  };

  const checkboxContainer = checkBoxList.map((item) => {
    return (
      <Checkbox
        label={item.label}
        key={item.name}
        name={item.name}
        darkPrimary={dark}
        checked={
          checkedConstraintObj[item.name]
            ? checkedConstraintObj[item.name]
            : false
        }
        onChange={onConstraintChecked}
      />
    );
  });
  return <div style={style}>{checkboxContainer}</div>;
}

export default ConstraintCheckBoxContainer;
