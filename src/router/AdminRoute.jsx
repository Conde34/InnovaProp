import { Outlet, Navigate } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";

const AdminRoute = () => {
  const { user } = useAuthStore();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user.rol !== "admin") {
    return <Navigate to="/propiedades" replace />;
  }

  return <Outlet />;
};

export default AdminRoute;