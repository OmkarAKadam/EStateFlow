import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const ProtectedRoute = ({ children, requiredRole }) => {
  const { isAuthenticated, role } = useContext(AuthContext);

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (requiredRole && role !== requiredRole) {
    if (requiredRole && role !== requiredRole) {
      return (
        <div className="p-10 text-center text-red-500">Unauthorized Access</div>
      );
    }
  }

  return children;
};

export default ProtectedRoute;
