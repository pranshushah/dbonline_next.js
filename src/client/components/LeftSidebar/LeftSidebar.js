import React, { useState } from 'react';
import { Resizable } from 're-resizable';
import '../../utils/Types';
import Button from '../UI/Button/Button';
import TableList from '../Explorer/TableList/TableList';
import Styles from './LeftSidebar.module.scss';
import TableItem from '../Explorer/TableList/TableItem/TableItem';
import DatabaseName from '../Explorer/DatabaseName/DatabaseName';
/**
 * @param {{
 * mainTableDetails:mainTableDetailsType[],
 * toggleSidebar:Function,
 * onItemClicked:Function,
 * onMainTableDetailsChange:Function,
 * onCreateTableButtonClick:Function,
 * givenDatabase:databaseType,
 * onDatabaseNameChange:Function
 * }} props
 */

function LeftSideBar({
  mainTableDetails,
  toggleSidebar,
  onItemClicked,
  givenDatabase,
  onDatabaseNameChange,
  onMainTableDetailsChange,
  onCreateTableButtonClick,
}) {
  const [width, setWidth] = useState(265);
  function WidthHandler(e, direction, ref, d) {
    setWidth((width) => width + d.width);
  }
  const list = mainTableDetails
    ? mainTableDetails.map((table) => (
        <TableItem key={table.id} table={table} onItemClicked={onItemClicked} />
      ))
    : null;
  return mainTableDetails ? (
    <Resizable
      className={Styles.resize}
      minWidth='15%'
      maxWidth='22%'
      size={{ width: width, height: '170vh' }}
      onResizeStop={WidthHandler}
      enable={{
        top: false,
        right: true,
        bottom: false,
        left: false,
        topRight: false,
        bottomRight: false,
        bottomLeft: false,
        topLeft: false,
      }}>
      <div className={Styles.container}>
        <div className={Styles.close} onClick={toggleSidebar} />
        {mainTableDetails.length === 0 ? (
          <>
            <DatabaseName
              name={givenDatabase.databaseName}
              onInputValueChange={onDatabaseNameChange}
            />
            <div className={Styles.buttonContainer}>
              <Button onClick={onCreateTableButtonClick} darkPrimary>
                Create Table
              </Button>
            </div>
          </>
        ) : (
          <>
            <DatabaseName
              name={givenDatabase.databaseName}
              onInputValueChange={onDatabaseNameChange}
            />
            <TableList
              mainTableDetails={mainTableDetails}
              onMainTableDetailsChange={onMainTableDetailsChange}>
              {list}
            </TableList>
          </>
        )}
      </div>
    </Resizable>
  ) : null;
}

export default LeftSideBar;
