import { useState, useEffect } from "react";
import UserService from "../../../services/UserService";
import { toast } from "react-hot-toast";

export default function ManageUsers() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            setLoading(true);
            const data = await UserService.all();
            setUsers(data);
        } catch (error) {
            toast.error("Failed to fetch users");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this user?")) {
            try {
                await UserService.deleteUser(id);
                toast.success("User deleted successfully");
                fetchUsers();
            } catch (error) {
                toast.error("Failed to delete user");
            }
        }
    };

    return (
        <div className="container mt-5 pt-5">
            <div className="row mb-4">
                <div className="col-12">
                    <h2 className="text-primary"><i className="fas fa-users me-2"></i>Manage Users</h2>
                    <p className="text-muted">View and manage all registered users (excluding admins).</p>
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
                                        <th>Sr No.</th>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Phone</th>
                                        <th>Address</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.map((user, index) => (
                                        <tr key={user.id}>
                                            <td>{index + 1}</td>
                                            <td>{user.name}</td>
                                            <td>{user.email}</td>
                                            <td>{user.phone || 'N/A'}</td>
                                            <td>{user.address || 'N/A'}</td>
                                            <td>
                                                <button 
                                                    onClick={() => handleDelete(user.id)}
                                                    className="btn btn-sm btn-danger"
                                                >
                                                    <i className="fas fa-trash"></i>
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                    {users.length === 0 && (
                                        <tr>
                                            <td colSpan="6" className="text-center text-muted py-4">No users found.</td>
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
