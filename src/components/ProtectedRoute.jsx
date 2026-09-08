import { Navigate } from "react-router-dom";
import { useApp } from "../context/AppContext";

export default function ProtectedRoute({ children }) {
  const { student, loading } = useApp();

  if (loading) {
    return null;
  }

  if (!student) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
