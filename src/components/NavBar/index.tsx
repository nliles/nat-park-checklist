import styles from "./index.module.scss";

const NavBar = () => (
  <nav className={styles.nav}>
    <header className={styles.header}>
      <div className={styles.content}>
        <img src="np.svg" alt="" width={25} className={styles.img}/>
        <h1 className={styles.title}>National Park Unit Checklist</h1>
      </div>
    </header>
  </nav>
);

export default NavBar;
