import React, { FC } from "react";
import Sidebar from "./Sidebar/Sidebar";

interface LayoutProps {
  children: React.ReactNode;
  isLoggedIn: boolean;
  setIsLoggedIn: (data: boolean) => void;
}

const Layout: FC<LayoutProps> = ({ children, isLoggedIn, setIsLoggedIn }) => {
  return (
    <div className="main">
      {isLoggedIn && (
        <div className="left">
          <Sidebar setIsLoggedIn={setIsLoggedIn} />
        </div>
      )}
      <div className="right">{children}</div>
    </div>
  );
};

export default Layout;
