import React from 'react';

function ConstraintContainer({ children }) {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: '100%',
      }}>
      {children}
    </div>
  );
}

export default ConstraintContainer;
