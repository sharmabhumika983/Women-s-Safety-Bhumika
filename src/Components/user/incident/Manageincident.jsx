import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import IncidentService from "../../../services/IncidentService";
import CategoryService from "../../../services/CategoryService";
import { toast } from "react-hot-toast";

export default function Manageincident() {
  const [incidents, setIncidents] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    setLoading(true);
    try {
      const [incidentData, categoryData] = await Promise.all([
        IncidentService.all(),
        CategoryService.all()
      ]);
      setIncidents(incidentData);
      setCategories(categoryData);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load incidents");
    } finally {
      setLoading(false);
    }
  }

  const filteredIncidents = incidents.filter((item) => {
    const matchesCategory =
      selectedCategory === "All" || item.category === selectedCategory;
    const matchesSearch =
      (item.name && item.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (item.description && item.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (item.location && item.location.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  function getStatusBadge(status) {
    switch (status) {
      case "Resolved":
        return "bg-success";
      case "In Progress":
        return "bg-info text-dark";
      case "Rejected":
        return "bg-secondary";
      default:
        return "bg-warning text-dark";
    }
  }

  return (
    <>
      {/* Header Start */}
      <div className="container-fluid page-header py-5">
        <h1 className="text-center text-white display-6">Reported Safety Incidents</h1>
        <ol className="breadcrumb justify-content-center mb-0">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item active text-white">Incidents</li>
        </ol>
      </div>
      {/* Header End */}

      {/* Incident Section Start */}
      <div className="container-fluid py-5">
        <div className="container py-4">
          {/* Top Bar with Filters & Action */}
          <div className="row g-3 justify-content-between align-items-center mb-5">
            <div className="col-lg-4 col-md-6">
              <div className="input-group">
                <span className="input-group-text bg-white border-primary">
                  <i className="fas fa-search text-primary"></i>
                </span>
                <input
                  type="text"
                  className="form-control border-primary"
                  placeholder="Search by keyword, location..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <div className="col-lg-4 col-md-6">
              <select
                className="form-select border-primary"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="All">All Categories</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.name || c.title}>
                    {c.name || c.title}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-lg-4 text-lg-end text-center">
              <Link to="/incident/add" className="btn btn-danger px-4 py-2 text-white fw-bold shadow-sm">
                <i className="fas fa-bullhorn me-2"></i> Report An Incident
              </Link>
            </div>
          </div>

          {/* Incidents Grid */}
          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading incidents...</span>
              </div>
              <p className="mt-2 text-muted">Loading incident reports...</p>
            </div>
          ) : filteredIncidents.length === 0 ? (
            <div className="card shadow-sm border-0 p-5 text-center bg-light">
              <i className="fas fa-shield-alt fa-3x text-primary mb-3"></i>
              <h4>No Incidents Found</h4>
              <p className="text-muted">
                {searchQuery || selectedCategory !== "All"
                  ? "No incident matched your search filters."
                  : "No safety incidents have been reported in this category yet."}
              </p>
              <div className="mt-3">
                <Link to="/incident/add" className="btn btn-primary px-4 py-2 text-white">
                  <i className="fas fa-plus me-1"></i> Report an Incident
                </Link>
              </div>
            </div>
          ) : (
            <div className="row g-4">
              {filteredIncidents.map((incident) => (
                <div className="col-md-6 col-lg-4" key={incident.id}>
                  <div className="card h-100 shadow-sm border-0 rounded overflow-hidden">
                    {/* Image */}
                    <div className="position-relative" style={{ height: 220, backgroundColor: "#f0f2f5" }}>
                      <img
                        src={incident.imageUrl || "img/incident 1.jpg"}
                        className="w-100 h-100"
                        style={{ objectFit: "cover" }}
                        alt={incident.name || "Incident"}
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "img/incident 1.jpg";
                        }}
                      />
                      {/* Status badge */}
                      <div className="position-absolute top-0 start-0 m-3">
                        <span className={`badge ${getStatusBadge(incident.status)} px-3 py-2 shadow-sm`}>
                          <i className="fas fa-info-circle me-1"></i>
                          {incident.status || "Pending"}
                        </span>
                      </div>
                      {/* Category badge */}
                      <div className="position-absolute top-0 end-0 m-3">
                        <span className="badge bg-dark text-white px-3 py-2 shadow-sm">
                          {incident.category || "General Safety"}
                        </span>
                      </div>
                    </div>

                    {/* Card Body */}
                    <div className="card-body p-4 d-flex flex-column">
                      <h4 className="card-title text-primary fw-bold mb-2">
                        {incident.name}
                      </h4>

                      <p className="card-text text-muted flex-grow-1 mb-3">
                        {incident.description}
                      </p>

                      <hr className="my-2 text-muted" />

                      <div className="small text-muted mb-1">
                        <i className="fas fa-map-marker-alt text-danger me-2"></i>
                        <strong>Location:</strong> {incident.location || "N/A"}
                      </div>

                      {incident.latitude && incident.longitude && (
                        <div className="small text-muted mb-1">
                          <i className="fas fa-compass text-secondary me-2"></i>
                          <strong>GPS:</strong> {incident.latitude}, {incident.longitude}
                        </div>
                      )}

                      <div className="small text-muted mt-2 pt-2 border-top d-flex justify-content-between">
                        <span>
                          <i className="fas fa-user me-1 text-primary"></i> By: {incident.reportedBy || "Citizen"}
                        </span>
                        {incident.createdAt && (
                          <span>
                            <i className="fas fa-calendar-alt me-1 text-secondary"></i>
                            {new Date(incident.createdAt).toLocaleDateString()}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      {/* Incident Section End */}
    </>
  );
}