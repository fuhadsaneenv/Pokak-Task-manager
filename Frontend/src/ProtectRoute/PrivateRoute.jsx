import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

export function PrivateRoute({ children }) {
  const { user } = useSelector((state) => state.auth);

  if (!user || !user.token) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
