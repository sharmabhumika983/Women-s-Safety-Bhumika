import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import TrustedcontactsService from "../../../../services/TrustedcontactsService"
import { toast } from "react-hot-toast";

export default function Trustedcontacts() {
  const [trustedcontacts, setTrustedcontacts] = useState([]);
  const [name, setName] = useState([]);
  const [selectedTrustedcontacts, setSelectedTrustedcontacts] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    setLoading(true);
    try {
      const res = await TrustedcontactsService.all();
      console.log("res: ", res);
      
      setTrustedcontacts(res);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load trustedcontact");
    } finally {
      setLoading(false);
    }
  }


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
        <h1 className="text-center text-white display-6">Reported Safety Trustedcontacts</h1>
        <ol className="breadcrumb justify-content-center mb-0">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item active text-white">Trustedcontacts</li>
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
                value={selectedTrustedcontacts}
                onChange={(e) => setSelectedTrustedcontacts(e.target.value)}
              >
              </select>
            </div>

            <div className="col-lg-4 text-lg-end text-center">
              <Link to="/incident/add" className="btn btn-danger px-4 py-2 text-white fw-bold shadow-sm">
                <i className="fas fa-bullhorn me-2"></i> Report An Incident
              </Link>
            </div>
          </div>

          {/* Trustedcontact Grid */}
          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading Trusted contact...</span>
              </div>
              <p className="mt-2 text-muted">Loading incident reports...</p>
            </div>
          ) : trustedcontacts.length === 0 ? (
            <div className="card shadow-sm border-0 p-5 text-center bg-light">
              <i className="fas fa-shield-alt fa-3x text-primary mb-3"></i>
              <h4>No Trustedcontact Found</h4>
              <p className="text-muted">
                {searchQuery || selectedTrustedcontacts !== "All"
                  ? "No incident matched your search filters."
                  : "No safety Trusted contact have been reported in this category yet."}
              </p>
              <div className="mt-3">
                <Link to="/incident/add" className="btn btn-primary px-4 py-2 text-white">
                  <i className="fas fa-plus me-1"></i> Report an Incident
                </Link>
              </div>
            </div>
          ) : (
            <div className="row g-4">
              {trustedcontacts.map((tc) => (
                <div className="col-md-6 col-lg-4" key={tc.id}>
                  <div className="card h-100 shadow-sm border-0 rounded overflow-hidden">
                    {/* Image */}
                    <div className="position-relative" >
                     
                      {/* Status badge */}
                      <div className="position-absolute top-0 start-100 m-3">
                        <span className={`badge ${getStatusBadge(tc.status)} px-3 py-2 shadow-sm`}>
                          <i className="fas fa-info-circle me-1"></i>
                          {tc.status || "Pending"}
                        </span>
                      </div>
                      {/* Trustedcontacts badge */}
                    </div>

                    {/* Card Body */}
                    <div className="card-body p-4 d-flex flex-column">
                      <h4 className="card-title text-primary fw-bold mb-2">
                        {tc.name}
                      </h4>

                      <p className="card-text text-muted flex-grow-1 mb-3">
                        {tc.email}
                      </p>
                      <hr className="my-2 text-muted" />
                       <p className="card-text text-muted flex-grow-1 mb-3">
                        {tc.phone}
                      </p>
                      <hr className="my-2 text-muted" />
                       <p className="card-text text-muted flex-grow-1 mb-3">
                        {tc.relation}
                      </p>
                      <hr className="my-2 text-muted" />
                  

                      <div className="small text-muted mt-2 pt-2 border-top d-flex justify-content-between">
                        <span>
                          <i className="fas fa-user me-1 text-primary"></i> By: {tc.reportedBy || "Citizen"}
                        </span>
                        {tc.createdAt && (
                          <span>
                            <i className="fas fa-calendar-alt me-1 text-secondary"></i>
                            {new Date(tc.createdAt).toLocaleDateString()}
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
      {/* Trustedcontact Section End */}
    </>
  );
}