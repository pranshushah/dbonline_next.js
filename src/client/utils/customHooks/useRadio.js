import { useState } from 'react';
import deepclode from 'clone-deep';

export function useRadio(intialState = []) {
  const [radioArray, setRadioArray] = useState(intialState);
  function radioChangeHandler(e) {
    e.persist();
    setRadioArray((radioArray) => {
      const newRadioArray = deepclode(radioArray);
      newRadioArray.forEach((radioObj) => {
        if (radioObj.value === e.target.value) {
          radioObj.checked = true;
        } else {
          radioObj.checked = false;
        }
      });
      return newRadioArray;
    });
  }
  function radioReset() {
    setRadioArray(intialState);
  }
  function directChangeHandler(arr) {
    setRadioArray(arr);
  }
  return [radioArray, radioChangeHandler, radioReset, directChangeHandler];
}
