import React, { useEffect, useState } from "react";
import "./index.css";
import { useNavigate } from "react-router-dom";

type Props = {
  duration: number;
  to?: string;
  message?: string;
};

const Spinner = ({ duration, to = "/login", message }: Props) => {
  const navigate = useNavigate();

  const [count, setCount] = useState(duration);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prevValue) => --prevValue);
    }, 1000);

    count === 0 ? navigate(to) : "";

    return () => clearInterval(interval);
  }, [count, navigate]);

  return (
    <div className="flex flex-col justify-center h-[60vh] items-center gap-4">
      <h1 className="text-xl">{message}</h1>
      <h1 className="text-xl">Redirecting you in {count} seconds.</h1>
      <div className="wrapper">
        <div className="circle"></div>
        <div className="circle"></div>
        <div className="circle"></div>
      </div>
    </div>
  );
};

export default Spinner;
