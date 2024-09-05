import { NavLink } from "react-router-dom";
import { useAuth } from "../context/auth";
import { FaUser } from "react-icons/fa";
import { useState } from "react";
import Dropdown from "./Dropdown";

type Props = {};

const Navbar = (props: Props) => {
  const [auth, setAuth] = useAuth();
  const [dropdown, setDropdown] = useState<boolean>(false);

  return (
    <nav className="w-full text-white flex flex-wrap flex-row justify-end uppercase">
      <ul className="navbar flex-row hidden md:flex justify-center items-center text-xl">
        <li className="border-r pr-2">
          <NavLink
            to={"/"}
            className="border-b-2 border-transparent hover:border-white transition-all"
          >
            Home
          </NavLink>
        </li>
        {/* <li className="border-r px-2">
          <NavLink
            to={"/categories"}
            className="border-b-2 border-transparent hover:border-white transition-all"
          >
            CATEGORY
          </NavLink>
        </li> */}
        {!auth.user ? (
          <>
            <li className="border-r px-2">
              <NavLink
                to={"/login"}
                className="border-b-2 border-transparent hover:border-white transition-all"
              >
                Login
              </NavLink>
            </li>
            <li className="pl-2">
              <NavLink
                to={"/register"}
                className="border-b-2 border-transparent hover:border-white transition-all"
              >
                Register
              </NavLink>
            </li>
          </>
        ) : (
          <>
            <li className="px-4 flex flex-row relative">
              <button onClick={() => setDropdown(!dropdown)}>
                <span className="flex items-center gap-2">
                  <FaUser />
                  {auth.user.role === 1 ? "ADMIN" : auth.user.name}
                </span>
              </button>
              <Dropdown isOpen={dropdown} user={auth.user} />
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
