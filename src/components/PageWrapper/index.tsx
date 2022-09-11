import { ReactNode } from "react";
import NavBar from "components/NavBar";
import styles from "./index.module.scss";

type PageWrapperProps = {
  children: ReactNode;
  count: number;
};

const PageWrapper = ({ children, count }: PageWrapperProps) => (
  <div className={styles.wrapper}>
    <NavBar count={count} />
    <main role="main">{children}</main>
  </div>
);

export default PageWrapper;
