import { ReactNode } from "react";
import NavBar from "components/NavBar";

type PageWrapperProps = {
  children: ReactNode;
  count: number;
};

const PageWrapper = ({ children, count }: PageWrapperProps) => (
  <div>
    <NavBar count={count} />
    <main role="main">{children}</main>
  </div>
);

export default PageWrapper;
