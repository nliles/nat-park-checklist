import NavBar from "components/NavBar";
import Footer from "components/Footer";
import { PageWrapperProps } from "./types";
import styles from "./index.module.scss";

const PageWrapper = ({ children, count }: PageWrapperProps) => (
  <div className={styles.wrapper}>
    <NavBar count={count} />
    <main role="main">{children}</main>
    <Footer />
  </div>
);

export default PageWrapper;
