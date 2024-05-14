import React, { FC } from "react";
import Sidebar from "./Sidebar/Sidebar";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <div className="main">
      <div className="left">
        <Sidebar />
      </div>
      <div className="right">{children}</div>
    </div>
  );
};

export default Layout;
