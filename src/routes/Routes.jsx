import { createBrowserRouter } from "react-router-dom";
import Main from "../layouts/Main";
import Signup from "../Components/Authentication/Signup";
import UserPanel from "../Components/UserPanel/UserPanel";
import PrivateRoute from "./PrivateRoute";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <Signup />,
  },
  {
    path: "/home",
    element: (
      <PrivateRoute>
        <UserPanel />
      </PrivateRoute>
    ),
  },
]);
