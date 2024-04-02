import { ReactNode } from "react";
import NavBar from "components/NavBar";
import styles from "./PageWrapper.module.scss";

type PageWrapperProps = {
  children: ReactNode;
};

const PageWrapper = ({ children }: PageWrapperProps) => (
  <div className={styles.wrapper}>
    <NavBar />
    <main role="main">{children}</main>
  </div>
);

export default PageWrapper;
