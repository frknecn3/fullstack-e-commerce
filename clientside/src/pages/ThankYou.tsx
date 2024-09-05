import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/auth";

type Props = {};

const ThankYou = (props: Props) => {
  const params = useParams();
  const [order, setOrder] = useState({ client: "", products: [] });
  const [auth, setAuth] = useAuth();

  useEffect(() => {
    console.log(params);
  }, []);

  return (
    <Layout>
      <div className="text-center flex flex-col tracking-wider gap-4">
        <h1>Thank you for the purchase!</h1>
        <span>Your products will soon be in your hands.</span>
        <span className="font-semibold">YOUR ORDER ID:</span>
        <span>{params.id}</span>
        <div className="flex"></div>
      </div>
    </Layout>
  );
};

export default ThankYou;
