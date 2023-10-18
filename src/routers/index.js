import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

import App from "../App";
import Login from "../pages/Login";
import Error from "../pages/Error";
import Home from "../pages/Home";
import Registration from "../pages/Registration";
import Akun from "../pages/Akun";
import TopUp from "../pages/TopUp";
import Transaction from "../pages/Transaction";
import Service from "../pages/Service";

import LayoutAuth from "../layouts/LayoutAuth";

import stores from "../stores";

const { auth } = stores.getState();

// console.log("auth", auth);

export default createBrowserRouter(
  createRoutesFromElements(
    <Route
      element={
        <LayoutAuth auth={auth}>
          <App />
        </LayoutAuth>
      }
    >
      <Route path="/home" element={<Home />} />
      <Route path="/home/service" element={<Service />} />
      <Route path="/akun" element={<Akun />} />
      <Route path="/topup" element={<TopUp />} />
      <Route path="/transaction" element={<Transaction />} />

      <Route path="/login" element={<Login />} />
      <Route path="/registration" element={<Registration />} />
      <Route path="*" element={<Error />} />
    </Route>
  )
);
