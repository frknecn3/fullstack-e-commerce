import Layout from "../../components/Layout/Layout";
import { useAuth } from "../../context/auth";
import { Outlet } from "react-router-dom";
import UserMenu from "../../components/UserMenu";

type Props = {};

const Dashboard = (props: Props) => {
  const [auth] = useAuth();

  return (
    <Layout>
      <div className="flex">
        <div className="w-1/4">
          <UserMenu />
        </div>
        <Outlet />
      </div>
    </Layout>
  );
};

export default Dashboard;
