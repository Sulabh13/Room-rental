import { Navigate } from "react-router-dom";

const OwnerRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  // Not Logged In
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Logged In But Not Owner
  if (role !== "owner") {
    return <Navigate to="/wishlist" replace />;
  }

  // Logged In Owner
  return children;
};

export default OwnerRoute;
