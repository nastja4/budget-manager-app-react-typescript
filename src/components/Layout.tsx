import React, { FC } from "react";
import Sidebar from "./Sidebar/Sidebar";

interface LayoutProps {
  children: React.ReactNode;
  isLoggedIn: boolean;
}

const Layout: FC<LayoutProps> = ({ children, isLoggedIn }) => {
  return (
    <div className="main">
      {isLoggedIn && (
        <div className="left">
          <Sidebar />
        </div>
      )}
      <div className="right">{children}</div>
    </div>
  );
};

export default Layout;
