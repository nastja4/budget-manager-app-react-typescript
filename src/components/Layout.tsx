import React, { FC } from "react";
import Sidebar from "./Sidebar/Sidebar";
import { useMode } from "../custom-hooks/useMode";

interface LayoutProps {
  children: React.ReactNode;
  isLoggedIn: boolean;
  setIsLoggedIn: (data: boolean) => void;
}

const Layout: FC<LayoutProps> = ({ children, isLoggedIn, setIsLoggedIn }) => {
  const { selectedMode } = useMode();

  return (
    <div className="main">
      {isLoggedIn && (
        <div className={`left ${selectedMode}`}>
          <Sidebar setIsLoggedIn={setIsLoggedIn} />
        </div>
      )}
      <div className={`right ${selectedMode}`}>{children}</div>
    </div>
  );
};

export default Layout;
