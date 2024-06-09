import { AiFillHome } from "react-icons/ai";
import { MdLibraryAdd } from "react-icons/md";
import { IoSearch } from "react-icons/io5";
import { IoMdPerson } from "react-icons/io";
import { MdOutlineLogout } from "react-icons/md";
import "./Sidebar.css";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FC } from "react";

interface SidebarProps {
  setIsLoggedIn: (data: boolean) => void;
}

const Sidebar: FC<SidebarProps> = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <ul className="list">
      <li className="list-item">
        <NavLink to="/">
          <AiFillHome size={25} />
          <div>Dashboard</div>
        </NavLink>
      </li>
      <li className="list-item">
        <NavLink to="/add">
          <MdLibraryAdd size={25} />
          <div>Add Expense</div>
        </NavLink>
      </li>
      <li className="list-item">
        <NavLink to="/search">
          <IoSearch size={25} />
          <div>Search Expense</div>
        </NavLink>
      </li>
      <li className="list-item">
        <NavLink to="/profile">
          <IoMdPerson size={25} />
          <div>Profile</div>
        </NavLink>
      </li>
      <li className="list-item">
        <Link to="/" onClick={handleLogout}>
          <MdOutlineLogout size={25} />
          <div>Logout</div>
        </Link>
      </li>
    </ul>
  );
};

export default Sidebar;
