import { Outlet, Navigate } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";

const UsersRoute = () => {
  const { user } = useAuthStore();

  if (!user) {
    return <Navigate to={"/login"} replace />;
  }

  if (user.rol === "admin") {
    return <Navigate to="/admin/dashboard" replace />;
  }

  return <Outlet />;
};

export default UsersRoute;
