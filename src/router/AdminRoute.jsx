import { Outlet, Navigate } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";

const AdminRoute = ({ allowedRoles = ["admin"] }) => {
  const { user } = useAuthStore();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(user.rol)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
};

export default AdminRoute;