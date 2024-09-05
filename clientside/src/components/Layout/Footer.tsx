import { Link } from "react-router-dom";

type Props = {};

const Footer = (props: Props) => {
  return (
    <footer className="bg-neutral-800 flex justify-center items-center text-white p-3 text-md">
      <div className="flex flex-col justify-center items-center">
        <h1>All Rights Reserved</h1>
        <ul className="flex flex-row">
          <li className="border-r pr-2">
            <Link to={"/about"}>About</Link>
          </li>
          <li className="border-r px-2">
            <Link to={"/contact"}>Contact</Link>
          </li>
          <li className="pl-2">
            <Link to={"/policy"}>Policy</Link>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
