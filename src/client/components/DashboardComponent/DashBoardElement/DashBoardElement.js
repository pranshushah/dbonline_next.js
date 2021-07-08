import Styles from './DashBoardElement.module.scss';
import { format } from 'timeago.js';
import { useRouter } from 'next/router';
/** @param {{
 * databaseObj:databaseType,
 * }} props
 */
export default function DashBoardElement({ databaseObj }) {
  const router = useRouter();
  function DatabaseClickHandler() {
    router.push(`database/${databaseObj.id}`);
  }
  return (
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
  );
}
