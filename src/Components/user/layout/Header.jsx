import { Link, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import AuthService from "../../../services/AuthService";
import { toast } from "react-hot-toast";

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const isAuth = AuthService.isAuthenticated();
    if (isAuth) {
      setUser({
        name: AuthService.getName(),
        email: AuthService.getEmail(),
        userType: AuthService.getUserType()
      });
      setIsAdmin(AuthService.isAdmin());
    } else {
      setUser(null);
      setIsAdmin(false);
    }
  }, [location]);

  async function handleLogout() {
    await AuthService.logout();
    setUser(null);
    setIsAdmin(false);
    toast.success("Logged out successfully");
    navigate("/login");
  }

  const isActive = (path) => location.pathname === path ? "active" : "";

  return (
    <>
      {/* Topbar start */}
      <div
        className="container-fluid border-bottom bg-light wow fadeIn"
        data-wow-delay="0.1s"
      >
        <div
          className="container topbar bg-primary d-none d-lg-block py-2"
          style={{ borderRadius: "0 40px" }}
        >
          <div className="d-flex justify-content-between">
            <div className="top-info ps-2">
              <small className="me-3">
                <i className="fas fa-shield-alt me-2 text-secondary" />
                <span className="text-white">Women's Safety & Emergency Network</span>
              </small>
              <small className="me-3">
                <i className="fas fa-envelope me-2 text-secondary" />
                <a href="mailto:support@womensafety.org" className="text-white">
                  support@womensafety.org
                </a>
              </small>
              <small className="me-3">
                <i className="fas fa-phone-alt me-2 text-secondary" />
                <span className="text-white">Emergency Helpline: 1091 / 112</span>
              </small>
            </div>
            <div className="top-link pe-2 d-flex align-items-center">
              {user && (
                <span className="text-white me-3 small">
                  <i className="fas fa-user-circle me-1 text-secondary"></i> Welcome, {user.name || user.email || "User"}
                </span>
              )}
              <a href="#" className="btn btn-light btn-sm-square rounded-circle me-1">
                <i className="fab fa-facebook-f text-secondary" />
              </a>
              <a href="#" className="btn btn-light btn-sm-square rounded-circle me-1">
                <i className="fab fa-twitter text-secondary" />
              </a>
              <a href="#" className="btn btn-light btn-sm-square rounded-circle me-0">
                <i className="fab fa-instagram text-secondary" />
              </a>
            </div>
          </div>
        </div>

        {/* Navbar Start */}
        <div className="container px-0">
          <nav className="navbar navbar-light navbar-expand-xl py-3">
            <Link to="/" className="navbar-brand">
              <h1 className="text-primary display-6 mb-0">
                Women's <span className="text-secondary">Safety</span>
              </h1>
            </Link>
            <button
              className="navbar-toggler py-2 px-3"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarCollapse"
            >
              <span className="fa fa-bars text-primary" />
            </button>

            <div className="collapse navbar-collapse" id="navbarCollapse">
              <div className="navbar-nav mx-auto">
                <Link to="/" className={`nav-item nav-link ${isActive("/")}`}>
                  Home
                </Link>
                {user && user.userType == "2" && (
                  <>
                    <Link to="/incident" className={`nav-item nav-link ${isActive("/incident")}`}>
                      Incidents
                    </Link>
                    <Link to="/incident/add" className={`nav-item nav-link ${isActive("/incident/add")}`}>
                      Report Incident
                    </Link>
                  </>
                )}
                <Link to="/about" className={`nav-item nav-link ${isActive("/about")}`}>
                  About
                </Link>
                <Link to="/service" className={`nav-item nav-link ${isActive("/service")}`}>
                  Services
                </Link>
                <Link to="/contact" className={`nav-item nav-link ${isActive("/contact")}`}>
                  Contact
                </Link>
                
                {(!user || user.userType == "2") && (
                  <Link to="/tips" className={`nav-item nav-link ${isActive("/tips")}`}>
                    Safety Tips
                  </Link>
                )}

                {isAdmin && (
                  <Link to="/admin" className="nav-item nav-link text-danger fw-bold">
                    <i className="fas fa-user-shield me-1"></i> Admin Panel
                  </Link>
                )}
              </div>

              <div className="d-flex align-items-center">
                {user && user.userType == "2" && (
                  <button 
                    className="btn btn-danger btn-sm px-3 py-2 rounded-pill fw-bold me-3 shadow heartbeat-btn"
                    onClick={() => toast.error("SOS ALERT SENT TO EMERGENCY CONTACTS!", { duration: 4000, icon: '🚨' })}
                  >
                    <i className="fas fa-exclamation-triangle me-1"></i> SOS
                  </button>
                )}

                {(!user || user.userType == "2") && (
                  <Link to="/emergency" className="btn btn-outline-danger btn-sm px-3 py-2 rounded-pill fw-bold me-3 d-none d-lg-block">
                    <i className="fas fa-phone-alt me-1"></i> 1091
                  </Link>
                )}

                {user ? (
                  <div className="nav-item dropdown">
                    <a href="#" className="nav-link dropdown-toggle btn btn-primary text-white rounded-pill px-3 py-2" data-bs-toggle="dropdown">
                      <i className="fas fa-user me-1"></i> {user.name || "User"}
                    </a>
                    <div className="dropdown-menu dropdown-menu-end m-0 shadow">
                      {user.userType == "2" ? (
                        <>
                          <Link to="/profile" className="dropdown-item"><i className="fas fa-user-edit me-2"></i>My Profile</Link>
                          <Link to="/my-reports" className="dropdown-item"><i className="fas fa-file-alt me-2"></i>My Reports</Link>
                        </>
                      ) : (
                        <Link to="/admin" className="dropdown-item"><i className="fas fa-tachometer-alt me-2"></i>Dashboard</Link>
                      )}
                      <hr className="dropdown-divider" />
                      <button onClick={handleLogout} className="dropdown-item text-danger"><i className="fas fa-sign-out-alt me-2"></i>Logout</button>
                    </div>
                  </div>
                ) : (
                  <div className="d-flex align-items-center gap-2">
                    <Link
                      to="/login"
                      className="btn btn-outline-primary btn-sm px-3 py-2 rounded-pill fw-bold me-2"
                    >
                      <i className="fas fa-sign-in-alt me-1"></i> Login
                    </Link>
                    <Link
                      to="/register"
                      className="btn btn-primary btn-sm px-3 py-2 rounded-pill text-white fw-bold"
                    >
                      <i className="fas fa-user-plus me-1"></i> Register
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </nav>
        </div>
      </div>
      {/* Navbar End */}
    </>
  );
}