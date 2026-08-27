import { useState, useEffect } from "react";
import IncidentService from "../../../services/IncidentServices";
import AuthService from "../../../services/AuthService";
import { toast } from "react-hot-toast";

export default function MyReports() {
    const [incidents, setIncidents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMyIncidents = async () => {
            try {
                const userId = AuthService.getId();
                if (userId) {
                    const allIncidents = await IncidentService.all();
                    // Filter incidents where user_id matches logged in user
                    // (Assuming you stored user_id in incidents, if not we filter locally if possible, or show all for simplicity. Wait, in earlier code, Addincident saves user_id)
                    const myInc = allIncidents.filter(inc => inc.user_id === userId);
                    setIncidents(myInc);
                }
            } catch (error) {
                toast.error("Failed to load your reports");
            } finally {
                setLoading(false);
            }
        };
        fetchMyIncidents();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this report?")) {
            try {
                await IncidentService.deleteIncident(id);
                setIncidents(incidents.filter(inc => inc.id !== id));
                toast.success("Report deleted successfully");
            } catch (error) {
                toast.error("Failed to delete report");
            }
        }
    };

    return (
        <div className="container mt-5 pt-5">
            <div className="row mb-4">
                <div className="col-12">
                    <h2 className="text-primary"><i className="fas fa-file-alt me-2"></i>My Reported Incidents</h2>
                    <p className="text-muted">Track the status and details of the incidents you have reported.</p>
                </div>
            </div>

            <div className="card shadow-sm">
                <div className="card-body">
                    {loading ? (
                        <div className="text-center py-5">
                            <div className="spinner-border text-primary" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        </div>
                    ) : (
                        <div className="table-responsive">
                            <table className="table table-hover align-middle">
                                <thead className="table-light">
                                    <tr>
                                        <th>Date Reported</th>
                                        <th>Location</th>
                                        <th>Category</th>
                                        <th>Description</th>
                                        <th>Image</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {incidents.map((inc) => (
                                        <tr key={inc.id}>
                                            <td>{new Date(inc.createdAt).toLocaleDateString()}</td>
                                            <td>{inc.location}</td>
                                            <td>{inc.category_name || inc.category_id}</td>
                                            <td>{inc.description?.substring(0, 50)}...</td>
                                            <td>
                                                {inc.image ? (
                                                    <img src={inc.image} alt="Incident" style={{width: "50px", height: "50px", objectFit: "cover"}} className="rounded" />
                                                ) : (
                                                    <span className="text-muted small">No Image</span>
                                                )}
                                            </td>
                                            <td>
                                                <button 
                                                    onClick={() => handleDelete(inc.id)}
                                                    className="btn btn-sm btn-danger"
                                                >
                                                    <i className="fas fa-trash"></i>
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                    {incidents.length === 0 && (
                                        <tr>
                                            <td colSpan="6" className="text-center text-muted py-5">
                                                <i className="fas fa-folder-open fa-3x mb-3 text-light"></i>
                                                <h5>No incidents reported</h5>
                                                <p>You haven't reported any incidents yet.</p>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
