import { useState, useEffect } from 'react';
import { set, get } from 'idb-keyval';
export function useLocalStorage(defaultValue, key) {
  const [state, setState] = useState(() => {
    const stickyValue = window.localStorage.getItem(key);
    return stickyValue !== null ? JSON.parse(stickyValue) : defaultValue;
  });
  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);
  return [state, setState];
}

export function useIdb(defaultValue, key) {
  const [state, setState] = useState([]);
  useEffect(() => {
    get(key).then((val) => {
      if (val) {
        setState(val);
      } else {
        setState(defaultValue);
      }
    });
  }, []);
  function setter(data) {
    setState(data);
    console.log(data);
    console.log(key);
    set(key, data);
  }
  return [state, setter];
}
