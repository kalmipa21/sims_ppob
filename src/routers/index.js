import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

import App from "../App";
import Login from "../pages/Login";
import Error from "../pages/Error";
import Registration from "../pages/Registration";

export default createBrowserRouter(
  createRoutesFromElements(
    <Route element={<App />}>
      <Route path="/" element={<Login />} />
      <Route path="/registration" element={<Registration />} />
      <Route path="*" element={<Error />} />
    </Route>
  )
);
