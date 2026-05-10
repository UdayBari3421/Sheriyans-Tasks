import { Navigate, Outlet } from "react-router";
import { useSelectorHook } from "../Hooks/useSelectorHook";

const ProtectedRoute = () => {
  const isLoggedIn = useSelectorHook("isLoggedIn", "auth");
  if (!isLoggedIn) return <Navigate to="/login" />;

  return <Outlet />;
};

export default ProtectedRoute;
