import "./index.css";
import { FaShoppingBag } from "react-icons/fa";
import { CiShoppingCart } from "react-icons/ci";
import Navbar from "../Navbar";
import { useAuth } from "../../context/auth";
import { useEffect, useState } from "react";
import { getAllCategories } from "../../utils/helpers";
import { categoryType } from "../../utils/types";
import { useLocation } from "react-router-dom";
import SearchInput from "../SearchInput";

const Header = () => {
  const [auth, setAuth] = useAuth();

  const [headerCategories, setHeaderCategories] = useState([]);
  const route = useLocation();

  useEffect(() => {
    getAllCategories(setHeaderCategories);
  }, []);

  return (
    <header className="">
      <div className="header-contents min-h-[10vh] flex justify-between items-center p-4 bg-neutral-800 text-white">
        <div className="w-full">
          <a
            className="text-white text-2xl p-2 flex items-center gap-4"
            href="/"
          >
            <CiShoppingCart />{" "}
            <span className="text-nowrap md:block hidden">E-COMMERCE APP</span>
          </a>
        </div>

        <div className="w-full flex flex-row gap-4 uppercase h-min justify-center items-center">
          <SearchInput />
          <button className="flex items-center gap-2">
            <a className="text-2xl" href="/cart">
              <FaShoppingBag />
            </a>
          </button>
        </div>

        <Navbar />

        <button className="menu-button md:hidden block">M</button>
      </div>

      {route.pathname == "/" ? (
        <div className="categories shadow-md p-4 md:px-[20vw] flex justify-between overflow-x-auto">
          {headerCategories?.slice(0, 10).map((category: categoryType) => (
            <a
              key={category._id}
              href={`/categories/${category.slug}`}
              className="border-r border-l text-sm w-full px-4 text-center"
            >
              {category.name}
            </a>
          ))}
        </div>
      ) : (
        ""
      )}
    </header>
  );
};

export default Header;
