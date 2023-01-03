import { HeaderProps } from './types';
import styles from "./index.module.scss";

const Header = ({ title }: HeaderProps) => {
  return (
    <div className={styles.titleSection}>
      <h2 className={styles.header}>{title}</h2>
    </div>
  );
};

export default Header;
