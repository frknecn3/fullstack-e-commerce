import React from "react";
import { useAuth } from "../../context/auth";

type Props = {};

const Profile = (props: Props) => {
  const [auth] = useAuth();

  return (
    <div className="w-3/4 border rounded-xl p-4 mx-2">
      <div className="user-details">
        User Details:
        <h1 className="text-2xl">Name: {auth?.user?.name}</h1>
        <h1 className="text-2xl">Email: {auth?.user?.email}</h1>
        <h1 className="text-2xl">Phone: {auth?.user?.phone}</h1>
        <h1 className="text-2xl">Address: {auth?.user?.address}</h1>
      </div>
    </div>
  );
};

export default Profile;
