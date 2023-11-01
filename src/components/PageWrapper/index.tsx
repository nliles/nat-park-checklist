import { ReactNode } from "react";
import NavBar from "components/NavBar";
import Footer from "components/Footer";
import styles from "./PageWrapper.module.scss";

type PageWrapperProps = {
  children: ReactNode;
  count?: number;
};

const PageWrapper = ({ children, count }: PageWrapperProps) => (
  <div className={styles.wrapper}>
    <NavBar count={count} />
    <main role="main">{children}</main>
    <Footer />
  </div>
);

export default PageWrapper;
