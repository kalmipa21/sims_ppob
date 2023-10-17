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
import LayoutAuth from "../layouts/LayoutAuth";
import stores from "../stores";

const { auth } = stores.getState();

export default createBrowserRouter(
  createRoutesFromElements(
    <Route element={<App />}>
      <Route
        element={
          <LayoutAuth auth={auth}>
            <Route path="/home" element={<Home />} />
          </LayoutAuth>
        }
      ></Route>
      <Route path="/login" element={<Login />} />
      <Route path="/registration" element={<Registration />} />
      <Route path="*" element={<Error />} />
    </Route>
  )
);
