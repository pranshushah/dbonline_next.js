import Styles from './DatabaseName.module.scss';
import { useRef, useEffect, useState } from 'react';
export default function DatabaseName({ name, onInputValueChange }) {
  const inputRef = useRef(null);
  const reg = /^[a-zA-Z_$][0-9a-zA-Z_$]*$/; // regex for proper variable name
  const [initialDatabseName, setInitalDataBaseName] = useState(''); // using this for if user leave this blanck it store the intial database name
  function databaseNameChangeHandler(e) {
    if (e.target.value === '') {
      onInputValueChange(e.target.value);
    } else {
      if (reg.test(e.target.value)) onInputValueChange(e.target.value);
    }
  }
  // done editting on enter
  function inputKeyPressHandler(e) {
    if (e.which === 13 && !e.altKey && !e.shiftKey && !e.ctrlKey) {
      if (name === '') {
        onInputValueChange(initialDatabseName);
      } else {
        setInitalDataBaseName(name);
      }
      inputRef.current.blur();
    }
  }
  // storing intialdatabase on blur so it will helpful if user tries to database name again
  function inputBlurHandler() {
    if (name === '') {
      onInputValueChange(initialDatabseName);
    } else {
      setInitalDataBaseName(name);
    }
  }

  useEffect(() => {
    setInitalDataBaseName(name);
  }, []);
  return (
    <input
      onBlur={inputBlurHandler}
      ref={inputRef}
      onKeyUp={inputKeyPressHandler}
      className={Styles.database}
      value={name}
      onChange={databaseNameChangeHandler}
    />
  );
}
