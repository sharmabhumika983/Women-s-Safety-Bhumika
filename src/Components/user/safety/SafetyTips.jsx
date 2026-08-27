import { useState, useEffect } from "react";
import SafetyTipService from "../../../services/SafetyTipService";
import { toast } from "react-hot-toast";

export default function SafetyTips() {
    const [tips, setTips] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTips = async () => {
            try {
                const data = await SafetyTipService.getAllTips();
                setTips(data);
            } catch (error) {
                toast.error("Failed to load safety tips");
            } finally {
                setLoading(false);
            }
        };
        fetchTips();
    }, []);

    return (
        <div className="container py-5 mt-5">
            <div className="text-center mb-5">
                <h2 className="display-5 fw-bold text-primary">Safety Tips & Guidelines</h2>
                <p className="lead text-muted">Stay informed and prepared with these essential safety tips.</p>
            </div>

            {loading ? (
                <div className="text-center py-5">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            ) : (
                <div className="row g-4">
                    {tips.map((tip) => (
                        <div className="col-md-6 col-lg-4" key={tip.id}>
                            <div className="card h-100 shadow-sm border-0 safety-tip-card">
                                <div className="card-body p-4">
                                    <div className="d-flex align-items-center mb-3">
                                        <div className="icon-box bg-primary text-white rounded-circle d-flex align-items-center justify-content-center me-3" style={{width: '50px', height: '50px'}}>
                                            <i className="fas fa-shield-alt fa-lg"></i>
                                        </div>
                                        <h5 className="card-title mb-0 fw-bold">{tip.title}</h5>
                                    </div>
                                    <p className="card-text text-muted">{tip.description}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                    {tips.length === 0 && (
                        <div className="col-12 text-center">
                            <p className="text-muted">No safety tips are available at the moment. Please check back later.</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
