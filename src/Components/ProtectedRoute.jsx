import { Navigate, Outlet } from "react-router-dom";
import AuthService from "../services/AuthService";
import { toast } from "react-hot-toast";

export default function ProtectedRoute({ allowedRoles }) {
  if (!AuthService.isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  const userType = String(AuthService.getUserType());

  if (allowedRoles && !allowedRoles.includes(userType)) {
    toast.error("You do not have permission to access this page");
    // Redirect based on userType
    if (userType === "1") {
      return <Navigate to="/admin" replace />;
    } else {
      return <Navigate to="/" replace />;
    }
  }

  return <Outlet />;
}
