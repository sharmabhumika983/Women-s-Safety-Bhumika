import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import IncidentService from "../../../services/IncidentService";
import CategoryService from "../../../services/CategoryService";
import UserService from "../../../services/UserService";
import AuthService from "../../../services/AuthService";

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalIncidents: 0,
    pendingIncidents: 0,
    resolvedIncidents: 0,
    totalCategories: 0,
    totalUsers: 0,
  });
  const [recentIncidents, setRecentIncidents] = useState([]);
  const [loading, setLoading] = useState(true);

  const adminName = AuthService.getName() || "Admin";

  useEffect(() => {
    loadDashboardData();
  }, []);

  async function loadDashboardData() {
    setLoading(true);
    try {
      const [incidents, categories, users] = await Promise.all([
        IncidentService.all().catch(() => []),
        CategoryService.all().catch(() => []),
        UserService.all().catch(() => []),
      ]);

      const pending = incidents.filter((i) => i.status === "Pending" || !i.status).length;
      const resolved = incidents.filter((i) => i.status === "Resolved").length;

      setStats({
        totalIncidents: incidents.length,
        pendingIncidents: pending,
        resolvedIncidents: resolved,
        totalCategories: categories.length,
        totalUsers: users.length,
      });

      setRecentIncidents(incidents.slice(0, 5));
    } catch (err) {
      console.error("Dashboard data fetch error:", err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* Header */}
      <div className="container-fluid page-header py-5">
        <h1 className="text-center text-white display-6">Admin Control Panel</h1>
        <ol className="breadcrumb justify-content-center mb-0">
          <li className="breadcrumb-item">
            <Link to="/admin">Home</Link>
          </li>
          <li className="breadcrumb-item active text-white">Dashboard</li>
        </ol>
      </div>

      <div className="container-fluid py-5">
        <div className="container py-3">
          {/* Welcome Banner */}
          <div className="bg-primary text-white rounded p-4 mb-5 shadow-sm d-flex justify-content-between align-items-center flex-wrap gap-3">
            <div>
              <h2 className="text-white fw-bold mb-1">
                <i className="fas fa-shield-alt me-2 text-warning"></i>
                Welcome back, {adminName}!
              </h2>
              <p className="mb-0 text-white-50">
                Women's Safety Portal Administration & Rapid Response Center
              </p>
            </div>
            <div className="d-flex gap-2">
              <Link to="/admin/incident" className="btn btn-warning fw-bold text-dark">
                <i className="fas fa-exclamation-circle me-1"></i> Review Incidents
              </Link>
              <Link to="/admin/category/add" className="btn btn-light fw-bold text-primary">
                <i className="fas fa-plus-circle me-1"></i> Add Category
              </Link>
            </div>
          </div>

          {/* Stats Cards */}
          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading statistics...</span>
              </div>
            </div>
          ) : (
            <>
              <div className="row g-4 mb-5">
                {/* Total Incidents */}
                <div className="col-md-6 col-lg-3">
                  <div className="card border-0 shadow-sm rounded p-4 text-center bg-light">
                    <div className="d-inline-flex p-3 rounded-circle bg-primary text-white mx-auto mb-3">
                      <i className="fas fa-bullhorn fa-2x"></i>
                    </div>
                    <h3 className="fw-bold mb-1 text-primary">{stats.totalIncidents}</h3>
                    <span className="text-muted fw-bold">Total Reports</span>
                  </div>
                </div>

                {/* Pending Incidents */}
                <div className="col-md-6 col-lg-3">
                  <div className="card border-0 shadow-sm rounded p-4 text-center bg-light">
                    <div className="d-inline-flex p-3 rounded-circle bg-warning text-dark mx-auto mb-3">
                      <i className="fas fa-clock fa-2x"></i>
                    </div>
                    <h3 className="fw-bold mb-1 text-warning">{stats.pendingIncidents}</h3>
                    <span className="text-muted fw-bold">Pending Action</span>
                  </div>
                </div>

                {/* Resolved Incidents */}
                <div className="col-md-6 col-lg-3">
                  <div className="card border-0 shadow-sm rounded p-4 text-center bg-light">
                    <div className="d-inline-flex p-3 rounded-circle bg-success text-white mx-auto mb-3">
                      <i className="fas fa-check-circle fa-2x"></i>
                    </div>
                    <h3 className="fw-bold mb-1 text-success">{stats.resolvedIncidents}</h3>
                    <span className="text-muted fw-bold">Resolved Cases</span>
                  </div>
                </div>

                {/* Total Categories */}
                <div className="col-md-6 col-lg-3">
                  <div className="card border-0 shadow-sm rounded p-4 text-center bg-light">
                    <div className="d-inline-flex p-3 rounded-circle bg-info text-white mx-auto mb-3">
                      <i className="fas fa-tags fa-2x"></i>
                    </div>
                    <h3 className="fw-bold mb-1 text-info">{stats.totalCategories}</h3>
                    <span className="text-muted fw-bold">Active Categories</span>
                  </div>
                </div>
              </div>

              {/* Recent Incident Reports Table */}
              <div className="card border-0 shadow-sm rounded mb-4">
                <div className="card-header bg-white py-3 d-flex justify-content-between align-items-center">
                  <h5 className="mb-0 text-primary fw-bold">
                    <i className="fas fa-list-alt me-2"></i> Recent Incident Reports
                  </h5>
                  <Link to="/admin/incident" className="btn btn-outline-primary btn-sm">
                    View All Incidents
                  </Link>
                </div>
                <div className="card-body p-0">
                  {recentIncidents.length === 0 ? (
                    <div className="p-4 text-center text-muted">No incidents reported yet.</div>
                  ) : (
                    <div className="table-responsive">
                      <table className="table table-hover align-middle mb-0">
                        <thead className="table-light">
                          <tr>
                            <th>Incident</th>
                            <th>Category</th>
                            <th>Location</th>
                            <th>Status</th>
                            <th>Reported Date</th>
                            <th className="text-end">Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {recentIncidents.map((incident) => (
                            <tr key={incident.id}>
                              <td className="fw-bold text-dark">{incident.name}</td>
                              <td>
                                <span className="badge bg-secondary">{incident.category || "General"}</span>
                              </td>
                              <td>{incident.location || "N/A"}</td>
                              <td>
                                <span
                                  className={`badge ${
                                    incident.status === "Resolved"
                                      ? "bg-success text-white"
                                      : incident.status === "In Progress"
                                      ? "bg-info text-dark"
                                      : incident.status === "Rejected"
                                      ? "bg-secondary text-white"
                                      : "bg-warning text-dark"
                                  }`}
                                >
                                  {incident.status || "Pending"}
                                </span>
                              </td>
                              <td className="text-muted small">
                                {incident.createdAt
                                  ? new Date(incident.createdAt).toLocaleDateString()
                                  : "Recently"}
                              </td>
                              <td className="text-end">
                                <Link to="/admin/incident" className="btn btn-sm btn-outline-primary">
                                  Manage
                                </Link>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}