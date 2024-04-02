import { ReactNode } from "react";
import NavBar from "components/NavBar";
import Footer from "components/Footer";
import styles from "./PageWrapper.module.scss";

type PageWrapperProps = {
  children: ReactNode;
};

const PageWrapper = ({ children }: PageWrapperProps) => (
  <div className={styles.wrapper}>
    <NavBar />
    <main role="main">{children}</main>
    <Footer />
  </div>
);

export default PageWrapper;
