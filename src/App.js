import { Outlet } from "react-router-dom";
import Loading from "./components/Loading";
import { useSelector } from "react-redux";

function App() {
  const { isLoading } = useSelector((state) => state.loading);

  return (
    <>
      {isLoading && <Loading />}

      <main className="app__main">
        <Outlet />
      </main>
    </>
  );
}

export default App;
