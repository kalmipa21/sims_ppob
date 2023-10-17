import { Navigate, useLocation } from "react-router-dom";

const LayoutAuth = ({ auth, children }) => {
  const { token } = auth;
  const location = useLocation();

  const isPage = ["/login", "/registration"].includes(location.pathname);

  if (!token) {
    // console.log("Redirecting to root");
    if (isPage) return children;
    return <Navigate to="/login" replace />;
  }

  if (token && isPage) {
    console.log("Redirecting to portal");
    return <Navigate to="/home" replace />;
  }

  return children;
};

export default LayoutAuth;
