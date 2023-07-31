import { createBrowserRouter } from "react-router-dom";
import Main from "../layouts/Main";
import Signup from "../Components/Authentication/Signup";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Signup />,
  },
]);
