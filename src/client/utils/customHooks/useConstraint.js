import { useState, useEffect } from 'react';
import { constraintError } from '../helper-function/constraintError';

export function useConstraint(givenTable) {
  const [constraintName, setConstraintName] = useState('');
  const [constraintErr, setConstraintErr] = useState(false);
  function constraintNameChangeHandler(e) {
    setConstraintName(e.target.value.trim());
  }
  useEffect(() => {
    if (constraintError(constraintName, givenTable)) {
      setConstraintErr(true);
    } else {
      setConstraintErr(false);
    }
  }, [givenTable, constraintName]);
  return [constraintName, constraintNameChangeHandler, constraintErr];
}
