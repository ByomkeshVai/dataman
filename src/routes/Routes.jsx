import { createBrowserRouter } from "react-router-dom";

import PhoneLogin from "../Components/Authentication/PhoneLogin";
import Signup from "../Components/Authentication/Signup";
import UserPanel from "../Components/UserPanel/UserPanel";
import AdminDashboard from "../Components/AdminDashboard/AdminDashboard";
import AllUser from "../Components/AdminDashboard/UserHere/AllUser";
import AdminLogin from "../Components/AdminDashboard/AdminLogin";
import AdminRoute from "./AdminRoute";
import ErrorPage from "../Components/Shared/ErrorPage";
import AddPackage from "../Components/AdminDashboard/AddPackage/AddPackage";
import AddCategory from "../Components/AdminDashboard/AddCategory/AddCategory";
import AllCategory from "../Components/AdminDashboard/AddCategory/AllCategory";
import AllPackage from "../Components/AdminDashboard/AddPackage/AllPackage";

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
      {
        path: "/admin/dashboard/add-package",
        element: (
          <AdminRoute>
            <AddPackage />
          </AdminRoute>
        ),
      },
      {
        path: "/admin/dashboard/add-package",
        element: (
          <AdminRoute>
            <AllPackage />
          </AdminRoute>
        ),
      },
      {
        path: "/admin/dashboard/add-category",
        element: (
          <AdminRoute>
            <AddCategory />
          </AdminRoute>
        ),
      },
      {
        path: "/admin/dashboard/all-category",
        element: (
          <AdminRoute>
            <AllCategory />
          </AdminRoute>
        ),
      },
    ],
  },
]);
