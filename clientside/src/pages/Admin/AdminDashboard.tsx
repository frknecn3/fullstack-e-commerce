import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/AdminMenu";
import { useAuth } from "../../context/auth";
import { Outlet } from "react-router-dom";

type Props = {};

const AdminDashboard = (props: Props) => {
  const [auth] = useAuth();

  return (
    <Layout>
      <div className="flex">
        <div className="w-1/4">
          <AdminMenu />
        </div>
        <div className="w-3/4">
          <Outlet />
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
