import { createBrowserRouter } from "react-router-dom";

import PhoneLogin from "../Components/Authentication/PhoneLogin";
import Signup from "../Components/Authentication/Signup";
import UserPanel from "../Components/UserPanel/UserPanel";
import AdminDashboard from "../Components/AdminDashboard/AdminDashboard";
import AllUser from "../Components/AdminDashboard/UserHere/AllUser";
import AdminLogin from "../Components/AdminDashboard/AdminLogin";
import AdminRoute from "./AdminRoute";
import ErrorPage from "../Components/Shared/ErrorPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <PhoneLogin />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/signup",
    element: <Signup />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/userPanel",
    element: <UserPanel />,
  },
  {
    path: "/admin/login/secure",
    element: <AdminLogin />,
  },
  {
    path: "/error",
    element: <ErrorPage />,
  },
  {
    path: "/admin/dashboard",
    element: (
      <AdminRoute>
        <AdminDashboard />
      </AdminRoute>
    ),
    errorElement: <ErrorPage />,
    // errorElement: <ErrorPage />,
    children: [
      {
        path: "/admin/dashboard/all-user",
        element: (
          <AdminRoute>
            <AllUser />
          </AdminRoute>
        ),
      },
    ],
  },
]);
