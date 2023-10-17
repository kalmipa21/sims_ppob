import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

import Loading from "./components/Loading";
import NavbarMenu from "./components/NavbarMenu";

function App() {
  const { isLoading } = useSelector((state) => state.loading);

  return (
    <>
      {isLoading && <Loading />}
      <NavbarMenu />

      <Outlet />
    </>
  );
}

export default App;
