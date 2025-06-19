import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";

import Home from "../pages/Home/Home";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Marathons from "../pages/marathons/Marathons";
import DashboardHome from "../pages/Dashboard/DashboardHome";
import MarathonDetails from "../pages/marathons/MarathonDetails";
import MarathonRegister from "../pages/marathons/MarathonRegister";
import PrivateRoute from "./PrivateRoute";
import AddMarathons from "../pages/marathons/AddMarathons";
import MyMarathonList from "../pages/Dashboard/MyMarathonList";
import MyApplyList from "../pages/Dashboard/MyApplyList";
import DashboardLayout from "../layouts/DashBoardLayout";
import NotFound from "../pages/error/NotFound";

const router = createBrowserRouter([
  // Main layout routes
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <NotFound></NotFound>,
    children: [
      { index: true, element: <Home /> },
      {
        path: "marathons",
        element: (
          <PrivateRoute>
            <Marathons />
          </PrivateRoute>
        ),
      },
      {
        path: "marathons/:id",
        element: (
          <PrivateRoute>
            <MarathonDetails />
          </PrivateRoute>
        ),
      },
      {
        path: "register/:id",
        element: (
          <PrivateRoute>
            <MarathonRegister />
          </PrivateRoute>
        ),
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },

  // Dashboard layout routes
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      { index: true, element: <DashboardHome /> },
      { path: "add-marathon", element: <AddMarathons /> },
      { path: "my-marathons", element: <MyMarathonList /> },
      { path: "my-applies", element: <MyApplyList /> },
    ],
  },
]);

export default router;
