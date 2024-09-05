import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import axios from "axios";
import Layout from "../components/Layout/Layout";
import Spinner from "../components/Spinner/Spinner";
import { useAuth } from "../context/auth";

type Props = {};

const Private = (props: Props) => {
  const [ok, setOk] = useState(false);
  const [auth, setAuth] = useAuth();

  useEffect(() => {
    const authCheck = () => {
      axios
        .get("/api/v1/auth/user-auth")
        .then((res) => {
          console.log(res.data);
          res.data.ok ? setOk(true) : setOk(false);
        })
        .catch((err) => {
          console.log(err);
          setOk(false);
        });
    };

    if (auth?.token) authCheck();
  }, [auth?.token]);
  return ok ? (
    <Outlet />
  ) : (
    <Layout>
      <Spinner duration={5} to="/" />
    </Layout>
  );
};

export default Private;
