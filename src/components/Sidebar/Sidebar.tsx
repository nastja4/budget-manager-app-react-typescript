import { AiFillHome } from "react-icons/ai";
import { MdLibraryAdd } from "react-icons/md";
import { IoSearch } from "react-icons/io5";
import { IoMdPerson } from "react-icons/io";
import { MdOutlineLogout } from "react-icons/md";
import "./Sidebar.css";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { FC } from "react";
import { Button } from "react-bootstrap";
import { useMode } from "../../custom-hooks/useMode";

interface SidebarProps {
  setIsLoggedIn: (data: boolean) => void;
  toggleMenu: () => void;
}

const Sidebar: FC<SidebarProps> = ({ setIsLoggedIn, toggleMenu }) => {
  const navigate = useNavigate();
  const { state } = useLocation();
  console.log("location_sidebar", state);

  const { selectedMode, toggleMode } = useMode();

  console.log("selectedMode", selectedMode);
  const handleLogout = () => {
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <ul className="list" onClick={toggleMenu}>
      <li className="list-item">
        <NavLink to="/" className={state === "/" ? "active" : ""}>
          <AiFillHome size={25} className="icon" />
          <div>Dashboard</div>
        </NavLink>
      </li>
      <li className="list-item">
        <NavLink to="/add">
          <MdLibraryAdd size={25} className="icon" />
          <div>Add Expense</div>
        </NavLink>
      </li>
      <li className="list-item">
        <NavLink to="/search" className={state === "/search" ? "active" : ""}>
          <IoSearch size={25} className="icon" />
          <div>Search Expense</div>
        </NavLink>
      </li>
      <li className="list-item">
        <NavLink to="/profile">
          <IoMdPerson size={25} className="icon" />
          <div>Profile</div>
        </NavLink>
      </li>
      <li className="list-item">
        <Link to="/" onClick={handleLogout}>
          <MdOutlineLogout size={25} className="icon" />
          <div>Logout</div>
        </Link>
      </li>
      <li className="list-item">
        <Button variant="info" className="mode-toggle" onClick={toggleMode}>
          Toggle Dark / Light Mode
        </Button>
      </li>
    </ul>
  );
};

export default Sidebar;
