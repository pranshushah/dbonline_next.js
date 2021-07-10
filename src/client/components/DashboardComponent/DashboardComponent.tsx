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
    keys().then((keys) => {
      keys.forEach((key) => {
        get(key).then((val: databaseType) => {
          setDataBaseArray((databaseArr) =>
            produce(databaseArr, (draft) => {
              draft.push(val);
            }),
          );
        });
      });
    });
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
