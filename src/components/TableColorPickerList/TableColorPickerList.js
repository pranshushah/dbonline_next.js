import React, { MouseEvent } from 'react';
import TableColor from '../../utils/tableColors';
import Styles from './TableColorPickerList.module.scss';

function ColorPickerSpan({ color, selectedColor, ClickHandler }) {
  const style =
    selectedColor === color
      ? { border: '2px solid #A9A9A9' }
      : { border: `2px solid ${color}` };
  return (
    <span
      className={Styles.colors}
      style={{
        ...style,
        backgroundColor: color,
      }}
      onClick={ClickHandler}
    />
  );
}

/**
 *
 * @param {{onTableColorSelected:Function,selectedColor:string}} props
 */

function TableColorPickerList({
  onTableColorSelected,
  selectedColor,
  ...props
}) {
  /**
   *
   * @param {MouseEvent<HTMLSpanElement>} e
   */
  function ClickHandler(e) {
    e.preventDefault();
    onTableColorSelected(
      window.getComputedStyle(e.target).getPropertyValue('background-color'),
    );
  }

  const ColorList = Object.values(TableColor);
  const ColorPickerList = ColorList.map((color, id) => {
    return (
      <ColorPickerSpan
        key={id}
        selectedColor={selectedColor}
        ClickHandler={ClickHandler}
        color={color}
      />
    );
  });
  return (
    <>
      <h3 className={Styles.heading}>Select color for table:</h3>
      <div className={Styles.colorContainer}>{ColorPickerList}</div>
    </>
  );
}

export default TableColorPickerList;
