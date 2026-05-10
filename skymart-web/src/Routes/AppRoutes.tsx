import { createBrowserRouter, RouterProvider } from "react-router";
import App from "../App.js";
import { About, Home, Login, Shop } from "../Pages/index.js";
import ProtectedRoute from "./ProtectedRoute.js";
import PublicRoutes from "./PublicRoutes.js";
import Cart from "../Pages/Cart.js";

const AppRoutes = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <ProtectedRoute />,
      children: [
        {
          path: "/",
          element: <App />,
          children: [
            {
              path: "",
              element: <Home />,
            },
            {
              path: "about",
              element: <About />,
            },
            {
              path: "shop",
              element: <Shop />,
            },
            {
              path: "cart",
              element: <Cart />,
            },
          ],
        },
      ],
    },
    {
      path: "/login",
      element: <PublicRoutes />,
      children: [{ path: "", element: <Login /> }],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default AppRoutes;
