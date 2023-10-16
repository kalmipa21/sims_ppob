import { Outlet } from "react-router-dom";
function App() {
  return (
    <>
      <main className="app__main">
        <Outlet />
      </main>
    </>
  );
}

export default App;
