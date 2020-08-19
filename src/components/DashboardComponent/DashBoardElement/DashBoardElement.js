import Styles from './DashBoardElement.module.scss';
import { format } from 'timeago.js';

/** @param {{
 * databaseObj:databaseType,
 * }} props
 */
export default function DashBoardElement({ databaseObj }) {
  return (
    <div className={Styles.container}>
      <span className={Styles.databaseName}>{databaseObj.databaseName}</span>
      <span className={Styles.created}>{`Created ${format(
        Date.now() - databaseObj.createdAt,
      )}`}</span>
      <span className={Styles.modified}>{`Modified ${format(
        Date.now() - databaseObj.createdAt,
      )}`}</span>
      <span className={Styles.sql}>
        {databaseObj.isSqlDatabase ? 'SQL' : 'NO-SQL'}
      </span>
      <span className={Styles.type}>{databaseObj.databaseType}</span>
    </div>
  );
}
