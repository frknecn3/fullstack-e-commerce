import React from "react";
import { NavLink } from "react-router-dom";
import "./index.css";

type Props = {};

const UserMenu = (props: Props) => {
  return (
    <div className="user-menu flex flex-col text-center gap-[1rem]">
      <h1 className="text-2xl font-bold">User Panel</h1>
      <ul className="flex flex-col border rounded-xl">
        <li className="py-2 w-full">
          <NavLink to="/dashboard/user/profile">My Profile</NavLink>
        </li>
        <hr />
        <li className="py-2 w-full">
          <NavLink to="/dashboard/user/orders">My Orders</NavLink>
        </li>
      </ul>
    </div>
  );
};

export default UserMenu;
