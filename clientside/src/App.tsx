import { Routes, Route } from "react-router-dom";
import "./index.css";
import HomePage from "./pages/HomePage";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Policy from "./pages/Policy";
import NotFound from "./pages/NotFound";
import RegisterPage from "./pages/Auth/RegisterPage";
import LoginPage from "./pages/Auth/LoginPage";
import Dashboard from "./pages/User/Dashboard";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import AdminRoute from "./Routes/AdminRoute";
import Private from "./Routes/Private";
import CreateProduct from "./pages/Admin/CreateProduct";
import Users from "./pages/Admin/Users";
import AdminDetails from "./pages/Admin/AdminDetails";
import Orders from "./pages/User/Orders";
import Profile from "./pages/User/Profile";
import Categories from "./pages/Admin/CreateCategory";
import DisplayProducts from "./pages/Admin/DisplayProducts";
import UpdateProduct from "./pages/Admin/UpdateProduct";
import CartPage from "./pages/CartPage";
import ProductPage from "./pages/ProductPage";
import ThankYou from "./pages/ThankYou";

type Props = {};

const App = (props: Props) => {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<About />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/thankyou/:id" element={<ThankYou />} />
        <Route path="/product/:slug" element={<ProductPage />} />
        <Route path="/dashboard" element={<Private />}>
          <Route path="user" element={<Dashboard />}>
            <Route path="orders" element={<Orders />} />
            <Route path="profile" element={<Profile />} />
          </Route>
        </Route>
        <Route path="/dashboard" element={<AdminRoute />}>
          <Route path="admin" element={<AdminDashboard />}>
            <Route path="" element={<AdminDetails />} />
            <Route path="categories" element={<Categories />} />
            <Route path="create-product" element={<CreateProduct />} />
            <Route path="update-product" element={<UpdateProduct />} />
            <Route path="products" element={<DisplayProducts />} />
            <Route path="product/:slug" element={<UpdateProduct />} />
            <Route path="users" element={<Users />} />
          </Route>
        </Route>
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/policy" element={<Policy />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default App;
