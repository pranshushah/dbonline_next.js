import Styles from './DashBoardElement.module.scss';
import { format } from 'timeago.js';
import { useRouter } from 'next/router';
import { ContextMenuTrigger, ContextMenu, MenuItem } from 'react-contextmenu';
/** @param {{
 * databaseObj:databaseType,
 * onDatabaseDelete:Function,
 * }} props
 */
export default function DashBoardElement({ databaseObj, onDatabaseDelete }) {
  const router = useRouter();
  function DatabaseClickHandler() {
    router.push(`database/${databaseObj.id}`);
  }
  return (
    <ContextMenuTrigger id={databaseObj.id}>
      <button
        tabIndex='0'
        role='button'
        className={Styles.container}
        onClick={DatabaseClickHandler}
      >
        <span className={Styles.databaseName}>{databaseObj.databaseName}</span>
        <span className={Styles.created}>{`Created ${format(
          databaseObj.createdAt,
        )}`}</span>
        <span className={Styles.modified}>{`Modified ${format(
          databaseObj.modifiedAt,
        )}`}</span>
        <span className={Styles.type}>{databaseObj.databaseType}</span>
      </button>
      <ContextMenu id={databaseObj.id} className='menu_dashboard'>
        <MenuItem
          className='menuItem menuItem_dashboard'
          onClick={() => {
            onDatabaseDelete(databaseObj.id);
          }}
        >
          Delete Database
        </MenuItem>
      </ContextMenu>
    </ContextMenuTrigger>
  );
}
