import { createBrowserRouter } from "react-router-dom";
import Layout from "../pages/Layout/Layout";
import Home from "../pages/Home/Home";
import Error404 from "../pages/Error/404/Error404";
import Login from "../pages/Login/Login";
import Signup from "../pages/SignUp/Signup";
import Product from "../pages/Product/Product";
import Result from "../pages/Result/Result";
import Cart from "../pages/Cart/Cart";
import Checkout from "../pages/Checkout/Checkout";
import MyAccount from "../pages/MyAccount/MyAccount";
import loginLoader from "./DataWriters/loaders/loginLoader";
import signUpLoader from "./DataWriters/loaders/signUpLoader";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <Error404 />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
        loader: loginLoader,
      },
      {
        path: "/sign-up",
        element: <Signup />,
        loader: signUpLoader,
      },
      {
        path: "/product/:productId",
        element: <Product />,
        // loader: loginLoader,
      },
      {
        path: "/result/:id",
        element: <Result />,
        // loader: loginLoader,
      },
      {
        path: "/search",
        element: <Result />,
        // loader: loginLoader,
      },
      {
        path: "/cart",
        element: <Cart />,
        // loader: loginLoader,
      },
      {
        path: "/checkout",
        element: <Checkout />,
        // loader: loginLoader,
      },
      {
        path: "/my-account",
        element: <MyAccount />,
        // loader: loginLoader,
      },
    ],
  },
]);
