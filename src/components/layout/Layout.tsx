import { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => (
  <div className="flex min-h-screen flex-col">
    <Header />
    <main id="main-content" className="flex-1" tabIndex={-1}>
      {children}
    </main>
    <Footer />
  </div>
);

export default Layout;
