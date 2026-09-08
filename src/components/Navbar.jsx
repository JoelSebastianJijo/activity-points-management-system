import { NavLink, useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";

export default function Navbar() {
  const { student, logout } = useApp();
  const navigate = useNavigate();

  if (!student) {
    return null;
  }

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="navbar">
      <div className="navbar-brand">
        <span className="navbar-mark">AP</span>
        <span>Activity Points</span>
      </div>

      <nav className="navbar-links">
        <NavLink to="/dashboard" className={({ isActive }) => (isActive ? "active" : "")}>
          Dashboard
        </NavLink>
        <NavLink to="/activities" className={({ isActive }) => (isActive ? "active" : "")}>
          Activities
        </NavLink>
        <NavLink to="/add-activity" className={({ isActive }) => (isActive ? "active" : "")}>
          Add Activity
        </NavLink>
        <NavLink to="/profile" className={({ isActive }) => (isActive ? "active" : "")}>
          Profile
        </NavLink>
      </nav>

      <button className="navbar-logout" onClick={handleLogout}>
        Log out
      </button>
    </header>
  );
}
