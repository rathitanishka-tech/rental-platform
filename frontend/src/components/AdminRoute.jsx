import { Navigate } from "react-router-dom";
import { isAdmin } from "../utils/auth";

export default function AdminRoute({ children }) {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/" />;
  }

  if (!isAdmin()) {
    return <Navigate to="/listings" />;
  }

  return children;
}