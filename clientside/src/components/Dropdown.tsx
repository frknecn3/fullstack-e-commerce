import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth";
import { toast } from "react-toastify";
import "./Dropdown.css";

type Props = {
  user?: any;
  isOpen: boolean;
};

const Dropdown = ({ user, isOpen }: Props) => {
  const navigate = useNavigate();
  const [auth, setAuth] = useAuth();

  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("Successfully logged out.", {
      autoClose: 1500,
      pauseOnHover: false,
    });
    navigate("/");
    return;
  };

  return (
    <div
      className={`dropdown ${
        isOpen ? "dropdown-active" : "dropdown-hidden"
      } absolute top-[30px] left-1/2 -translate-x-1/2 w-[12rem] text-md px-4 py-2 rounded-md border-2 border-neutral-400 bg-white text-black`}
    >
      <ul className={`list-inside list-disc`}>
        <li className="hover:font-bold transition-all">
          <button
            onClick={() =>
              navigate(`/dashboard/${auth.user.role === 1 ? "admin" : "user"}`)
            }
          >
            DASHBOARD
          </button>
        </li>
        <hr />
        <li className="hover:font-bold transition-all">
          <button onClick={handleLogout}>LOG OUT</button>
        </li>
      </ul>
    </div>
  );
};

export default Dropdown;
