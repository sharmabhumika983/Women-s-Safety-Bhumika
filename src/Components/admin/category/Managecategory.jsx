import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CategoryService from "../../../services/CategoryService";
import { toast } from "react-hot-toast";

export default function Managecategory() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCategories();
  }, []);

  async function loadCategories() {
    setLoading(true);
    try {
      const data = await CategoryService.all();
      setCategories(data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load categories");
    } finally {
      setLoading(false);
    }
  }

  async function deleteCategory(id, name) {
    if (window.confirm(`Are you sure you want to delete category "${name}"?`)) {
      try {
        await CategoryService.deleteItem(id);
        toast.success(`Category "${name}" deleted`);
        loadCategories();
      } catch (err) {
        console.error(err);
        toast.error("Failed to delete category");
      }
    }
  }

  async function toggleStatus(category) {
    const newStatus = category.status === "Active" ? "Inactive" : "Active";
    try {
      await CategoryService.update({ status: newStatus }, category.id);
      toast.success(`Status updated to ${newStatus}`);
      loadCategories();
    } catch (err) {
      console.error(err);
      toast.error("Failed to update status");
    }
  }

  return (
    <>
      {/* Header Start */}
      <div className="container-fluid page-header py-5">
        <h1 className="text-center text-white display-6">Manage Incident Categories</h1>
        <ol className="breadcrumb justify-content-center mb-0">
          <li className="breadcrumb-item">
            <Link to="/admin">Dashboard</Link>
          </li>
          <li className="breadcrumb-item active text-white">Manage Categories</li>
        </ol>
      </div>
      {/* Header End */}

      {/* Category Section Start */}
      <div className="container-fluid py-5">
        <div className="container py-4">
          <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
            <div>
              <h3 className="text-primary mb-1">
                <i className="fas fa-tags me-2"></i>Incident Categories
              </h3>
              <p className="text-muted mb-0">
                Total categories configured: <strong>{categories.length}</strong>
              </p>
            </div>
            <Link to="/admin/category/add" className="btn btn-primary px-4 py-2 text-white fw-bold shadow-sm">
              <i className="fas fa-plus-circle me-2"></i> Add New Category
            </Link>
          </div>

          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="mt-2 text-muted">Loading categories...</p>
            </div>
          ) : categories.length === 0 ? (
            <div className="card shadow-sm border-0 p-5 text-center bg-light">
              <i className="fas fa-folder-open fa-3x text-muted mb-3"></i>
              <h4>No Categories Found</h4>
              <p className="text-muted">Start by adding your first safety category (e.g. Harassment, Cyber Safety, Stalking).</p>
              <div className="mt-3">
                <Link to="/admin/category/add" className="btn btn-primary px-4 py-2 text-white">
                  <i className="fas fa-plus me-1"></i> Add Category
                </Link>
              </div>
            </div>
          ) : (
            <div className="card shadow-sm border-0 overflow-hidden">
              <div className="table-responsive">
                <table className="table table-hover align-middle mb-0">
                  <thead className="table-primary">
                    <tr>
                      <th scope="col" style={{ width: "5%" }}>#</th>
                      <th scope="col" style={{ width: "25%" }}>Category Name</th>
                      <th scope="col" style={{ width: "40%" }}>Description</th>
                      <th scope="col" style={{ width: "15%" }}>Status</th>
                      <th scope="col" style={{ width: "15%" }} className="text-end">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {categories.map((cat, index) => (
                      <tr key={cat.id}>
                        <th scope="row">{index + 1}</th>
                        <td className="fw-bold text-dark">
                          <i className="fas fa-tag text-primary me-2"></i>
                          {cat.name || cat.title || "Unnamed Category"}
                        </td>
                        <td className="text-muted">
                          {cat.description || "No description provided."}
                        </td>
                        <td>
                          <button
                            onClick={() => toggleStatus(cat)}
                            title="Click to toggle status"
                            className={`btn btn-sm badge ${
                              cat.status === "Active"
                                ? "bg-success text-white"
                                : "bg-secondary text-white"
                            }`}
                            style={{ cursor: "pointer", fontSize: "0.85rem", padding: "6px 12px" }}
                          >
                            {cat.status || "Active"}
                          </button>
                        </td>
                        <td className="text-end">
                          <div className="btn-group">
                            <Link
                              to={`/admin/category/edit/${cat.id}`}
                              className="btn btn-sm btn-outline-primary"
                              title="Edit Category"
                            >
                              <i className="fas fa-edit"></i> Edit
                            </Link>
                            <button
                              onClick={() => deleteCategory(cat.id, cat.name || cat.title)}
                              className="btn btn-sm btn-outline-danger ms-1"
                              title="Delete Category"
                            >
                              <i className="fas fa-trash-alt"></i> Delete
                            </button>
                          </div>
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
      {/* Category Section End */}
    </>
  );
}