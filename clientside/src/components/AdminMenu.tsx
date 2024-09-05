import React from "react";
import { NavLink } from "react-router-dom";
import "./index.css";

type Props = {};

const AdminMenu = (props: Props) => {
  return (
    <div className="admin-menu flex flex-col text-center gap-[1rem]">
      <h1 className="text-2xl font-bold">Admin Panel</h1>
      <ul className="flex flex-col border rounded-xl">
        <li className="py-2 w-full">
          <NavLink to="/dashboard/admin/categories">Categories</NavLink>
        </li>
        <hr />
        <li className="py-2 w-full">
          <NavLink to="/dashboard/admin/create-product">Create Product</NavLink>
        </li>
        <hr />
        <li className="py-2 w-full">
          <NavLink to="/dashboard/admin/products">Products</NavLink>
        </li>
        <hr />
        <li className="py-2 w-full">
          <NavLink to="/dashboard/admin/users">Users</NavLink>
        </li>
      </ul>
    </div>
  );
};

export default AdminMenu;
