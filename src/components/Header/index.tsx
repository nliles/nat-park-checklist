import styles from "./index.module.scss";

type HeaderProps = {
  title: string;
};

const Header = ({ title }: HeaderProps) => {
  return (
    <div className={styles.titleSection}>
      <h2 className={styles.header}>{title}</h2>
    </div>
  );
};

export default Header;
