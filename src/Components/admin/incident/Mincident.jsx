import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import IncidentService from "../../../services/IncidentService";
import { toast } from "react-hot-toast";

export default function Mincident() {
  const [incidents, setIncidents] = useState([]);
  const [statusFilter, setStatusFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadIncidents();
  }, []);

  async function loadIncidents() {
    setLoading(true);
    try {
      const data = await IncidentService.all();
      setIncidents(data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load incidents");
    } finally {
      setLoading(false);
    }
  }

  async function updateIncidentStatus(id, newStatus) {
    try {
      await IncidentService.update({ status: newStatus }, id);
      toast.success(`Incident status changed to ${newStatus}`);
      loadIncidents();
    } catch (err) {
      console.error(err);
      toast.error("Failed to update status");
    }
  }

  async function deleteIncident(id, name) {
    if (window.confirm(`Are you sure you want to delete incident "${name}"?`)) {
      try {
        await IncidentService.deleteItem(id);
        toast.success(`Incident "${name}" deleted`);
        loadIncidents();
      } catch (err) {
        console.error(err);
        toast.error("Failed to delete incident");
      }
    }
  }

  const filteredIncidents = incidents.filter((item) => {
    const matchesStatus =
      statusFilter === "All" || item.status === statusFilter;
    const matchesSearch =
      (item.name && item.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (item.location && item.location.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (item.category && item.category.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesStatus && matchesSearch;
  });

  function getStatusBadge(status) {
    switch (status) {
      case "Resolved":
        return "bg-success text-white";
      case "In Progress":
        return "bg-info text-dark";
      case "Rejected":
        return "bg-secondary text-white";
      default:
        return "bg-warning text-dark";
    }
  }

  return (
    <>
      {/* Header Start */}
      <div className="container-fluid page-header py-5">
        <h1 className="text-center text-white display-6">Manage Safety Incidents</h1>
        <ol className="breadcrumb justify-content-center mb-0">
          <li className="breadcrumb-item">
            <Link to="/admin">Dashboard</Link>
          </li>
          <li className="breadcrumb-item active text-white">Manage Incidents</li>
        </ol>
      </div>
      {/* Header End */}

      <div className="container-fluid py-5">
        <div className="container py-4">
          {/* Top Controls */}
          <div className="row g-3 justify-content-between align-items-center mb-4">
            <div className="col-lg-4 col-md-6">
              <div className="input-group">
                <span className="input-group-text bg-white border-primary">
                  <i className="fas fa-search text-primary"></i>
                </span>
                <input
                  type="text"
                  className="form-control border-primary"
                  placeholder="Search incidents..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <div className="col-lg-4 col-md-6">
              <select
                className="form-select border-primary"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="All">All Statuses ({incidents.length})</option>
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Resolved">Resolved</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>

            <div className="col-lg-4 text-lg-end text-center">
              <Link to="/incident/add" className="btn btn-primary px-4 py-2 text-white fw-bold shadow-sm">
                <i className="fas fa-plus-circle me-1"></i> New Incident Report
              </Link>
            </div>
          </div>

          {/* Table / List View */}
          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="mt-2 text-muted">Loading incidents database...</p>
            </div>
          ) : filteredIncidents.length === 0 ? (
            <div className="card shadow-sm border-0 p-5 text-center bg-light">
              <i className="fas fa-clipboard-check fa-3x text-muted mb-3"></i>
              <h4>No Incidents Found</h4>
              <p className="text-muted">No incident reports match your selected criteria.</p>
            </div>
          ) : (
            <div className="card shadow-sm border-0 overflow-hidden">
              <div className="table-responsive">
                <table className="table table-hover align-middle mb-0">
                  <thead className="table-primary">
                    <tr>
                      <th scope="col" style={{ width: "5%" }}>#</th>
                      <th scope="col" style={{ width: "12%" }}>Evidence</th>
                      <th scope="col" style={{ width: "20%" }}>Incident Title</th>
                      <th scope="col" style={{ width: "15%" }}>Category</th>
                      <th scope="col" style={{ width: "18%" }}>Location / GPS</th>
                      <th scope="col" style={{ width: "15%" }}>Status</th>
                      <th scope="col" style={{ width: "15%" }} className="text-end">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredIncidents.map((incident, index) => (
                      <tr key={incident.id}>
                        <th scope="row">{index + 1}</th>
                        <td>
                          <img
                            src={incident.imageUrl || "img/incident 1.jpg"}
                            alt={incident.name}
                            className="rounded border"
                            style={{ width: 60, height: 50, objectFit: "cover" }}
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = "img/incident 1.jpg";
                            }}
                          />
                        </td>
                        <td>
                          <div className="fw-bold text-dark">{incident.name}</div>
                          <small className="text-muted text-truncate d-inline-block" style={{ maxWidth: 200 }}>
                            {incident.description}
                          </small>
                          <div className="small text-muted">
                            <i className="fas fa-user-circle me-1"></i>
                            {incident.reportedBy || "Citizen"}
                          </div>
                        </td>
                        <td>
                          <span className="badge bg-secondary text-white">
                            {incident.category || "General"}
                          </span>
                        </td>
                        <td>
                          <div>
                            <i className="fas fa-map-marker-alt text-danger me-1"></i>
                            {incident.location || "N/A"}
                          </div>
                          {incident.latitude && incident.longitude && (
                            <small className="text-muted">
                              {incident.latitude}, {incident.longitude}
                            </small>
                          )}
                        </td>
                        <td>
                          <select
                            className={`form-select form-select-sm fw-bold ${getStatusBadge(incident.status)}`}
                            value={incident.status || "Pending"}
                            onChange={(e) => updateIncidentStatus(incident.id, e.target.value)}
                            style={{ cursor: "pointer", maxWidth: 130 }}
                          >
                            <option value="Pending" className="bg-white text-dark">Pending</option>
                            <option value="In Progress" className="bg-white text-dark">In Progress</option>
                            <option value="Resolved" className="bg-white text-dark">Resolved</option>
                            <option value="Rejected" className="bg-white text-dark">Rejected</option>
                          </select>
                        </td>
                        <td className="text-end">
                          <button
                            onClick={() => deleteIncident(incident.id, incident.name)}
                            className="btn btn-sm btn-outline-danger"
                            title="Delete Incident"
                          >
                            <i className="fas fa-trash-alt me-1"></i> Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}