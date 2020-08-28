import Styles from './DatabaseName.module.scss';

export default function DatabaseName({ name }) {
  return <p className={Styles.database}>{name}</p>;
}
