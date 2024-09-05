import React, { ChangeEvent, FormEvent, useRef, useState } from "react";
import Layout from "../../components/Layout/Layout";
import axios, { AxiosError } from "axios";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../../context/auth";
import Spinner from "../../components/Spinner/Spinner";

type Props = {};

const LoginPage = (props: Props) => {
  const navigate: NavigateFunction = useNavigate();

  const formRef = useRef<HTMLFormElement>(null);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState<FormData>(new FormData());
  const [auth, setAuth] = useAuth();
  const [error, setError] = useState<null | string>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>, formData: FormData) => {
    e.preventDefault();
    // console.log(formData);

    axios
      .post(`/api/v1/auth/login`, formData)
      .then((res) => {
        setSuccess(true);
        toast.success("Login successful, redirecting...", { autoClose: 2500 });
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(res.data));
        setTimeout(() => navigate("/"), 3000);
      })
      .catch((err: any) => {
        console.log(err), setError(err.response?.data.message);
      });
  };

  return (
    <Layout>
      {!success ? (
        <div>
          <form
            ref={formRef}
            className="my-10 shadow-lg p-4 md:p-10 rounded-xl max-w-[500px] m-auto"
            onSubmit={(e) => handleSubmit(e, formData)}
          >
            <div className="flex flex-col gap-4 justify-center">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="text"
                className="username border-2 border-gray-800 p-2 rounded-xl"
                onChange={handleChange}
                required
              />

              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                className="password border-2 border-gray-800 p-2 rounded-xl"
                onChange={handleChange}
                required
              />

              <div className="flex flex-col gap-4 justify-center items-center">
                {error && (
                  <span className="text-red-700 text-center">
                    An error has occurred: <br /> {error}
                  </span>
                )}
                <button className="bg-neutral-50 px-4 py-2 rounded-md border-2 border-neutral-400">
                  Login
                </button>
                <button
                  className=""
                  onClick={() => navigate("/forgot-password")}
                >
                  Forgot Password?
                </button>
              </div>
            </div>
          </form>
        </div>
      ) : (
        <Spinner duration={3} />
      )}
    </Layout>
  );
};

export default LoginPage;
