// import React from "react";
import { AiFillHome } from "react-icons/ai";
import { MdLibraryAdd } from "react-icons/md";
import { IoSearch } from "react-icons/io5";
import { IoMdPerson } from "react-icons/io";
import { MdOutlineLogout } from "react-icons/md";
import "./Sidebar.css";
import { Link, NavLink } from "react-router-dom";

const Sidebar = () => {
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
        <Link to="/">
          <MdOutlineLogout size={25} />
          <div>Logout</div>
        </Link>
      </li>
    </ul>
  );
};

export default Sidebar;
