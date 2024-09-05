import React from "react";
import { useAuth } from "../../context/auth";

type Props = {};

const AdminDetails = (props: Props) => {
  const [auth] = useAuth();

  return (
    <div className="w-3/4 border rounded-xl p-4 mx-2">
      <div className="admin-details text-wrap flex flex-col">
        Admin Details:
        <span className="text-2xl">Name: {auth?.user?.name}</span>
        <span className="text-2xl text-wrap break-words">
          Email: <span>{auth?.user?.email}</span>
        </span>
        <span className="text-2xl text-wrap break-words">
          Phone: {auth?.user?.phone}
        </span>
      </div>
    </div>
  );
};

export default AdminDetails;
