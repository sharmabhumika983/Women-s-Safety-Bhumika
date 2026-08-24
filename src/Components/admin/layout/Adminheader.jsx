import { Link, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import AuthService from "../../../services/AuthService";
import { toast } from "react-hot-toast";

export default function Adminheader() {
  const navigate = useNavigate();
  const location = useLocation();
  const [adminName, setAdminName] = useState("Admin");

  useEffect(() => {
    const name = AuthService.getName();
    if (name) {
      setAdminName(name);
    }
  }, []);

  async function handleLogout() {
    await AuthService.logout();
    toast.success("Admin logged out successfully");
    navigate("/login");
  }

  const isActive = (path) => location.pathname === path ? "active" : "";

  return (
    <>
      {/* Topbar start */}
      <div
        className="container-fluid border-bottom bg-dark text-white wow fadeIn py-2"
        data-wow-delay="0.1s"
      >
        <div className="container">
          <div className="d-flex justify-content-between align-items-center">
            <div className="top-info">
              <span className="badge bg-danger me-2">ADMIN PORTAL</span>
              <small className="text-white-50">Women's Safety Administration System</small>
            </div>
            <div className="top-link d-flex align-items-center">
              <span className="text-white me-3 small">
                <i className="fas fa-user-shield me-1 text-warning"></i> Logged in as: <strong>{adminName}</strong>
              </span>
              <Link to="/" className="btn btn-outline-light btn-sm me-2">
                <i className="fas fa-globe me-1"></i> Public Site
              </Link>
              <button
                onClick={handleLogout}
                className="btn btn-danger btn-sm"
              >
                <i className="fas fa-sign-out-alt me-1"></i> Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navbar Start */}
      <div className="container-fluid border-bottom bg-light">
        <div className="container px-0">
          <nav className="navbar navbar-light navbar-expand-xl py-3">
            <Link to="/admin" className="navbar-brand">
              <h1 className="text-primary display-6 mb-0">
                Safety<span className="text-secondary">Admin</span>
              </h1>
            </Link>
            <button
              className="navbar-toggler py-2 px-3"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#adminNavbarCollapse"
            >
              <span className="fa fa-bars text-primary" />
            </button>

            <div className="collapse navbar-collapse" id="adminNavbarCollapse">
              <div className="navbar-nav ms-auto align-items-center">
                <Link to="/admin" className={`nav-item nav-link ${isActive("/admin")}`}>
                  <i className="fas fa-tachometer-alt me-1"></i> Dashboard
                </Link>
                <Link to="/admin/incident" className={`nav-item nav-link ${isActive("/admin/incident")}`}>
                  <i className="fas fa-exclamation-triangle me-1"></i> Manage Incidents
                </Link>
                <Link to="/admin/category" className={`nav-item nav-link ${isActive("/admin/category")}`}>
                  <i className="fas fa-tags me-1"></i> Manage Categories
                </Link>
                <Link to="/admin/category/add" className={`nav-item nav-link ${isActive("/admin/category/add")}`}>
                  <i className="fas fa-plus-circle me-1"></i> Add Category
                </Link>
              </div>
            </div>
          </nav>
        </div>
      </div>
      {/* Navbar End */}
    </>
  );
}