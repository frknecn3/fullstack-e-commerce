import { FormEvent, useState } from "react";
import Layout from "../../components/Layout/Layout";
import axios, { AxiosError, AxiosResponse } from "axios";
import Spinner from "../../components/Spinner/Spinner";

type Props = {};

const ForgotPassword = (props: Props) => {
  const [email, setEmail] = useState("");
  const [answer, setAnswer] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState<null | string>(null);
  const [ok, setOk] = useState<boolean>(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log(email, answer, newPassword);

    axios
      .post("/api/v1/auth/forgot-password", { email, answer, newPassword })
      .then((res: AxiosResponse) => setOk(true))
      .catch((err: any) => {
        setError(err.response?.data.message);
      });
  };

  return ok ? (
    <Layout>
      <Spinner
        duration={3}
        to="/login"
        message="Password changed successfully."
      />
    </Layout>
  ) : (
    <Layout>
      <form
        className="my-10 shadow-lg p-4 md:p-10 rounded-xl max-w-[500px] m-auto"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col gap-4 justify-center">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="text"
            className="username border-2 border-gray-800 p-2 rounded-xl"
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label htmlFor="answer">What is the name of your best friend?</label>
          <input
            id="answer"
            type="answer"
            placeholder="Your answer here..."
            className="password border-2 border-gray-800 p-2 rounded-xl"
            onChange={(e) => setAnswer(e.target.value)}
            required
          />

          <label htmlFor="newPassword">New Password</label>
          <input
            id="newPassword"
            type="password"
            placeholder="Enter new password..."
            className="password border-2 border-gray-800 p-2 rounded-xl"
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />

          <button>Change Password</button>

          {error && (
            <span className="text-red-700 text-center">
              An error has occurred: <br /> {error}
            </span>
          )}
        </div>
      </form>
    </Layout>
  );
};

export default ForgotPassword;
