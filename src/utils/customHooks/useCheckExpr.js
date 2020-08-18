import { useState, useEffect } from 'react';
const parser = require('js-sql-parser');
/**
 *
 * @param {("attribute"|"check")} usingFor
 */
export function useCheckExpr(usingFor = 'check') {
  const [checkExpr, setCheckExpr] = useState('');
  const [checkExprDirty, setCheckExprDirty] = useState(false);
  const [showExprError, setShowExprError] = useState(false);
  const [checkExprErrorMessage, setCheckExprErrorMessage] = useState('');
  const [checkExprError, setCheckExprError] = useState(
    usingFor === 'check' ? true : false,
  );

  function checkExpressionHandler(e) {
    setCheckExpr(e.target.value);
  }
  function checkExpressionFocusHandler() {
    setCheckExprDirty(true);
  }

  function checkExpressionShowErrorHandler() {
    if (checkExprDirty) {
      setShowExprError(true);
    } else {
      setShowExprError(false);
    }
  }

  function blurHandler() {
    setShowExprError(true);
  }
  useEffect(() => {
    if (checkExprDirty) {
      try {
        parser.parse(`select * from boom WHERE (${checkExpr})`);
        setCheckExprError(false);
      } catch {
        if (showExprError) {
          if (checkExpr.length === 0) {
            setCheckExprError(true);
            setCheckExprErrorMessage("expression can't be empty");
          } else {
            setCheckExprError(true);
            setCheckExprErrorMessage('invalid expression');
          }
        } else {
          setCheckExprError(true);
        }
      }
    }
  }, [showExprError, checkExpr, checkExprDirty]);
  return [
    checkExpr,
    checkExprError,
    checkExprErrorMessage,
    showExprError,
    checkExpressionHandler,
    checkExpressionFocusHandler,
    checkExpressionShowErrorHandler,
    blurHandler,
    setCheckExprError,
  ];
}
