import { useState, useEffect } from "react";
import SafetyTipService from "../../../services/SafetyTipService";
import { toast } from "react-hot-toast";

export default function ManageSafetyTips() {
    const [tips, setTips] = useState([]);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({ title: "", description: "" });
    const [editId, setEditId] = useState(null);

    useEffect(() => {
        fetchTips();
    }, []);

    const fetchTips = async () => {
        try {
            setLoading(true);
            const data = await SafetyTipService.getAllTips();
            setTips(data);
        } catch (error) {
            toast.error("Failed to fetch safety tips");
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editId) {
                await SafetyTipService.updateTip(editId, formData);
                toast.success("Tip updated successfully");
            } else {
                await SafetyTipService.addTip({ ...formData, createdAt: new Date().toISOString() });
                toast.success("Tip added successfully");
            }
            setFormData({ title: "", description: "" });
            setEditId(null);
            fetchTips();
        } catch (error) {
            toast.error("Failed to save tip");
        }
    };

    const handleEdit = (tip) => {
        setFormData({ title: tip.title, description: tip.description });
        setEditId(tip.id);
        window.scrollTo(0, 0);
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this tip?")) {
            try {
                await SafetyTipService.deleteTip(id);
                toast.success("Tip deleted successfully");
                fetchTips();
            } catch (error) {
                toast.error("Failed to delete tip");
            }
        }
    };

    return (
        <div className="container mt-5 pt-5">
            <div className="row mb-4">
                <div className="col-12">
                    <h2 className="text-primary"><i className="fas fa-lightbulb me-2"></i>Manage Safety Tips</h2>
                    <p className="text-muted">Add, edit, or remove safety tips for users.</p>
                </div>
            </div>

            <div className="row">
                <div className="col-md-4 mb-4">
                    <div className="card shadow-sm">
                        <div className="card-header bg-primary text-white">
                            <h5 className="mb-0">{editId ? "Edit Tip" : "Add New Tip"}</h5>
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label className="form-label">Title</label>
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        name="title" 
                                        value={formData.title} 
                                        onChange={handleChange} 
                                        required 
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Description</label>
                                    <textarea 
                                        className="form-control" 
                                        name="description" 
                                        rows="4" 
                                        value={formData.description} 
                                        onChange={handleChange} 
                                        required
                                    ></textarea>
                                </div>
                                <button type="submit" className="btn btn-primary w-100">
                                    {editId ? "Update Tip" : "Save Tip"}
                                </button>
                                {editId && (
                                    <button 
                                        type="button" 
                                        className="btn btn-secondary w-100 mt-2" 
                                        onClick={() => {
                                            setEditId(null);
                                            setFormData({ title: "", description: "" });
                                        }}
                                    >
                                        Cancel
                                    </button>
                                )}
                            </form>
                        </div>
                    </div>
                </div>

                <div className="col-md-8">
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
                                                <th>Title</th>
                                                <th>Description</th>
                                                <th style={{width: "120px"}}>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {tips.map((tip) => (
                                                <tr key={tip.id}>
                                                    <td className="fw-bold">{tip.title}</td>
                                                    <td>{tip.description}</td>
                                                    <td>
                                                        <button 
                                                            onClick={() => handleEdit(tip)}
                                                            className="btn btn-sm btn-info me-1 text-white"
                                                        >
                                                            <i className="fas fa-edit"></i>
                                                        </button>
                                                        <button 
                                                            onClick={() => handleDelete(tip.id)}
                                                            className="btn btn-sm btn-danger"
                                                        >
                                                            <i className="fas fa-trash"></i>
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                            {tips.length === 0 && (
                                                <tr>
                                                    <td colSpan="3" className="text-center text-muted py-4">No safety tips added yet.</td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
