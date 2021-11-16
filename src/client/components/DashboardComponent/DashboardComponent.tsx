import '../../utils/Types';
import { get, keys } from 'idb-keyval';
import Styles from './Style.module.scss';
import CreateDataBaseModal from '../CreateDatabaseModal/CreateDatabaseModal';
import { useState, useEffect } from 'react';
import HomeNav from '../HomeNav/HomeNav';
import DashboardElement from './DashBoardElement/DashBoardElement';
import produce from 'immer';

export default function DashboardComponent() {
  const [databaseArray, setDataBaseArray] = useState<databaseType[]>([]);
  const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    async function getDatabases() {
      const databaseKeys = await keys();
      let databases: databaseType[] = [];

      for (let key of databaseKeys) {
        const val = await get<databaseType>(key);
        databases.push(val);
      }
      setDataBaseArray(
        produce(databases, (draft) => {
          draft.sort((a, b) => b.modifiedAt.getTime() - a.modifiedAt.getTime());
        }),
      );
    }
    getDatabases();
  }, []);
  function showCreateDatabaseModalHandler() {
    setShowModal(true);
  }
  function closeCreateDatabaseModalHandler() {
    setShowModal(false);
  }
  if (databaseArray.length === 0) {
    return (
      <>
        <HomeNav />
        <div className={Styles.container}>
          <div className={Styles.headerContainer}>
            <span className={Styles.recent}>Recently Used Database</span>
            <button
              tabIndex={0}
              className={Styles.new}
              onClick={showCreateDatabaseModalHandler}
            >
              + New Database
            </button>
          </div>
          <h1 className={Styles.noDatabaseHeader}>No Database Found</h1>
          {showModal && (
            <CreateDataBaseModal
              show={showModal}
              modalCancel={closeCreateDatabaseModalHandler}
            />
          )}
        </div>
      </>
    );
  } else {
    return (
      <>
        <HomeNav />
        <div className={Styles.container}>
          <div className={Styles.headerContainer}>
            <span className={Styles.recent}>Recently Used Database</span>
            <button
              tabIndex={0}
              className={Styles.new}
              onClick={showCreateDatabaseModalHandler}
            >
              + New Database
            </button>
          </div>
          {databaseArray.map((database, index) => {
            return (
              <div key={index}>
                <DashboardElement databaseObj={database} />
              </div>
            );
          })}
          {showModal && (
            <CreateDataBaseModal
              show={showModal}
              modalCancel={closeCreateDatabaseModalHandler}
            />
          )}
        </div>
      </>
    );
  }
}
