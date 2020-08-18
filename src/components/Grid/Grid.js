import React from 'react';
import Styles from './Grid.module.scss';

function Grid({ showGrid, children }) {
  return (
    <main
      className={
        showGrid
          ? [Styles.grid, Styles.showGrid].join(' ')
          : [Styles.grid, Styles.hideGrid].join(' ')
      }>
      {children}
    </main>
  );
}

export default Grid;
