import Layout from "../components/Layout/Layout";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="w-full min-h-[30vh] gap-4 flex flex-col justify-center items-center">
        <h1 className="font-extrabold text-8xl">404</h1>
        <span className="text-2xl">Oops! Page Not Found</span>
        <button
          className="border p-2 rounded-xl hover:bg-neutral-800 hover:text-white hover:translate-y-[-2px] transition-all"
          onClick={() => navigate(-1)}
        >
          Go Back
        </button>
      </div>
    </Layout>
  );
};

export default NotFound;
