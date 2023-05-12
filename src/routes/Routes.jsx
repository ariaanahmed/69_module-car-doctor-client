import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Home from "../pages/home/Home";
import Login from "../pages/login/Login";
import SignUp from "../pages/signup/SignUp";
import Checkout from "../pages/checkout/Checkout";

const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout/>,
      children: [
        {
            path: "/",
            element: <Home/>
        },
        {
          path: "/login",
          element: <Login/>
        },
        {
          path: "/signup",
          element: <SignUp/>
        },
        {
          path: "/checkout/:id",
          element: <Checkout/>,
          loader: ({params}) => fetch(`http://localhost:5000/services/${params.id}`)
        }
      ]
    },
  ]);

export default router