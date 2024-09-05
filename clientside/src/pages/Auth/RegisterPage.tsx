import React, { ChangeEvent, FormEvent, useRef, useState } from "react";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

type Props = {};

const RegisterPage = (props: Props) => {
  const navigate: NavigateFunction = useNavigate();

  const formRef = useRef<HTMLFormElement>(null);

  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState<FormData>(new FormData());

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>, formData: FormData) => {
    e.preventDefault();
    console.log(formData);

    axios
      .post(`/api/v1/auth/register`, formData)
      .then((res) => {
        setSuccess(true);
        toast.success("Login successful, redirecting...", { autoClose: 2500 });
        setTimeout(() => navigate("/login"), 3000);
      })
      .catch((err) => console.log(err));
  };

  return (
    <Layout>
      {success ? (
        <h1 className="text-xl">
          User successfully registered! Redirecting to login page.
        </h1>
      ) : (
        <div>
          <form
            ref={formRef}
            className="my-10 shadow-lg p-4 md:p-10 rounded-xl max-w-[500px] m-auto"
            onSubmit={(e) => handleSubmit(e, formData)}
          >
            <div className="flex flex-col gap-4 justify-center">
              <label htmlFor="name">Name and Surname</label>
              <input
                id="name"
                type="text"
                className="username border-2 border-gray-800 p-2 rounded-xl"
                onChange={handleChange}
                required
              />

              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="text"
                className="username border-2 border-gray-800 p-2 rounded-xl"
                onChange={handleChange}
                required
              />

              <label htmlFor="phone">Phone</label>
              <input
                id="phone"
                type="tel"
                className="username border-2 border-gray-800 p-2 rounded-xl"
                onChange={handleChange}
                required
              />

              <label htmlFor="address">Address</label>
              <textarea
                id="address"
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

              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                id="confirmPassword"
                type="password"
                className="confirm-password border-2 border-gray-800 p-2 rounded-xl"
                onChange={handleChange}
                required
              />

              <label htmlFor="answer">Safety Question</label>
              <input
                id="answer"
                type="text"
                className="confirm-password border-2 border-gray-800 p-2 rounded-xl"
                onChange={handleChange}
                placeholder="What is your best friend's name?"
                required
              />

              <div className="flex flex-row justify-center items-center">
                <button className="bg-neutral-50 px-4 py-2 rounded-md border-2 border-neutral-400">
                  Register
                </button>
              </div>
            </div>
          </form>
        </div>
      )}
    </Layout>
  );
};

export default RegisterPage;
