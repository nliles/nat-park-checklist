import { ReactNode } from "react";
import NavBar from "components/NavBar";
import Footer from "components/Footer";
import styles from "./PageWrapper.module.scss";

type PageWrapperProps = {
  children: ReactNode;
  count?: number;
  total?: number;
};

const PageWrapper = ({ children, count, total }: PageWrapperProps) => (
  <div className={styles.wrapper}>
    <NavBar count={count} total={total} />
    <main role="main">{children}</main>
    <Footer />
  </div>
);

export default PageWrapper;
