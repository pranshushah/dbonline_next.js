import React from 'react';
import Styles from './Radio.module.scss';
/**
 * @typedef { import('react').HTMLProps<HTMLInputElement>} inputProps */

/**
 * @typedef {Object} radioObj
 * @property {string} value value tag of input
 * @property {string} label label that you want to set for radio button
 * @property {boolean} [disabled] disabled property for radio
 * @property {boolean} [checked] checked  property for radio
 */

/**
 * @param {{
 * valueObjectArray:radioObj[],
 * nameForRadioContainer:string,
 * inLine:boolean,
 * onChange:Function,
 * } & inputProps} props
 */

function Radio({
  valueObjectArray,
  nameForRadioContainer,
  inLine = true,
  onChange,
  ...props
}) {
  const radioArray = valueObjectArray.map((radioObj, index) => {
    return (
      <label
        title={radioObj.disabled ? 'coming soon' : radioObj.label}
        key={index}
        className={
          inLine
            ? radioObj.disabled
              ? [Styles.inLine, Styles.disabledInput].join(' ')
              : Styles.inLine
            : Styles.Block
        }>
        <input
          type='radio'
          className={Styles.inputRadio}
          name={nameForRadioContainer}
          value={radioObj.value}
          onChange={onChange}
          checked={radioObj.checked ? radioObj.checked : false}
          disabled={radioObj.disabled ? radioObj.disabled : false}
          {...props}
        />
        {radioObj.label}
        <span className={Styles.circle}></span>
      </label>
    );
  });
  return radioArray;
}

export default Radio;
