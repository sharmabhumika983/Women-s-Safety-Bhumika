import { useState, useEffect } from "react";
import UserService from "../../../services/UserService";
import AuthService from "../../../services/AuthService";
import { toast } from "react-hot-toast";

export default function ManageProfile() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        address: ""
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const id = AuthService.getId();
                if (id) {
                    const data = await UserService.single(id);
                    if (data) {
                        setFormData({
                            name: data.name || "",
                            email: data.email || "",
                            phone: data.phone || "",
                            address: data.address || ""
                        });
                    }
                }
            } catch (error) {
                toast.error("Failed to load profile data");
            } finally {
                setLoading(false);
            }
        };
        fetchProfile();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const id = AuthService.getId();
            await UserService.update(formData, id);
            
            // Update auth service local storage name if it changed
            localStorage.setItem("name", formData.name);
            
            toast.success("Profile updated successfully");
        } catch (error) {
            toast.error("Failed to update profile");
        }
    };

    if (loading) {
        return (
            <div className="container mt-5 pt-5 text-center">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="container mt-5 pt-5">
            <div className="row justify-content-center">
                <div className="col-md-8 col-lg-6">
                    <div className="card shadow border-0 rounded-3">
                        <div className="card-header bg-primary text-white text-center py-3">
                            <h4 className="mb-0"><i className="fas fa-user-edit me-2"></i>Manage Profile</h4>
                        </div>
                        <div className="card-body p-4">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label className="form-label text-muted fw-bold">Full Name</label>
                                    <div className="input-group">
                                        <span className="input-group-text bg-light border-end-0"><i className="fas fa-user text-primary"></i></span>
                                        <input 
                                            type="text" 
                                            className="form-control border-start-0" 
                                            name="name" 
                                            value={formData.name} 
                                            onChange={handleChange} 
                                            required 
                                        />
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label text-muted fw-bold">Email Address</label>
                                    <div className="input-group">
                                        <span className="input-group-text bg-light border-end-0"><i className="fas fa-envelope text-primary"></i></span>
                                        <input 
                                            type="email" 
                                            className="form-control border-start-0 bg-light" 
                                            name="email" 
                                            value={formData.email} 
                                            disabled 
                                        />
                                    </div>
                                    <small className="text-muted">Email cannot be changed.</small>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label text-muted fw-bold">Phone Number</label>
                                    <div className="input-group">
                                        <span className="input-group-text bg-light border-end-0"><i className="fas fa-phone text-primary"></i></span>
                                        <input 
                                            type="tel" 
                                            className="form-control border-start-0" 
                                            name="phone" 
                                            value={formData.phone} 
                                            onChange={handleChange} 
                                            required 
                                        />
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <label className="form-label text-muted fw-bold">Home Address</label>
                                    <div className="input-group">
                                        <span className="input-group-text bg-light border-end-0"><i className="fas fa-map-marker-alt text-primary"></i></span>
                                        <textarea 
                                            className="form-control border-start-0" 
                                            name="address" 
                                            rows="3" 
                                            value={formData.address} 
                                            onChange={handleChange} 
                                            required
                                        ></textarea>
                                    </div>
                                </div>
                                <div className="d-grid">
                                    <button type="submit" className="btn btn-primary py-2 fw-bold">
                                        <i className="fas fa-save me-2"></i> Save Changes
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
