import { Navigate, Outlet } from "react-router";
import { useSelectorHook } from "../Hooks/useSelectorHook";

const PublicRoutes = () => {
  const isLoggedIn = useSelectorHook("isLoggedIn", "auth");

  if (isLoggedIn) return <Navigate to="/" />;

  return <Outlet />;
};

export default PublicRoutes;
