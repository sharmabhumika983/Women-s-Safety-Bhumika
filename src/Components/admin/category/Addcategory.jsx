import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import CategoryService from "../../../services/CategoryService";
import { toast } from "react-hot-toast";

export default function Addcategory() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Active");
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);

  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  useEffect(() => {
    if (isEdit) {
      loadCategory();
    }
  }, [id]);

  async function loadCategory() {
    setFetching(true);
    try {
      const data = await CategoryService.single(id);
      if (data) {
        setName(data.name || data.title || "");
        setDescription(data.description || "");
        setStatus(data.status || "Active");
      } else {
        toast.error("Category not found");
        navigate("/admin/category");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error loading category");
    } finally {
      setFetching(false);
    }
  }

  async function submitForm(e) {
    e.preventDefault();

    if (!name.trim()) {
      toast.error("Please enter a category name");
      return;
    }

    let payload = {
      name: name.trim(),
      description: description.trim(),
      status: status,
    };

    setLoading(true);
    try {
      if (isEdit) {
        await CategoryService.update(payload, id);
        toast.success("Category updated successfully!");
      } else {
        await CategoryService.add(payload);
        toast.success("Category added successfully!");
      }
      navigate("/admin/category");
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Failed to save category");
    } finally {
      setLoading(false);
    }
  }

  if (fetching) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="container-fluid page-header py-5">
        <h1 className="text-center text-white display-6">
          {isEdit ? "Edit Incident Category" : "Add Incident Category"}
        </h1>
        <ol className="breadcrumb justify-content-center mb-0">
          <li className="breadcrumb-item">
            <Link to="/admin">Dashboard</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to="/admin/category">Categories</Link>
          </li>
          <li className="breadcrumb-item active text-white">
            {isEdit ? "Edit Category" : "Add Category"}
          </li>
        </ol>
      </div>

      <div className="container-fluid py-5">
        <div className="container py-4">
          <div className="row justify-content-center">
            <div className="col-lg-8 col-md-10">
              <div className="p-5 bg-light rounded shadow-sm">
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <h3 className="text-primary mb-0">
                    <i className="fas fa-tags me-2"></i>
                    {isEdit ? "Update Category Details" : "New Incident Category"}
                  </h3>
                  <Link to="/admin/category" className="btn btn-outline-secondary btn-sm">
                    <i className="fas fa-arrow-left me-1"></i> Back to List
                  </Link>
                </div>

                <form onSubmit={submitForm}>
                  {/* Category Name */}
                  <div className="mb-3">
                    <label className="form-label fw-bold">Category Name *</label>
                    <input
                      type="text"
                      className="form-control py-3 border-primary"
                      placeholder="e.g. Harassment, Stalking, Poor Lighting, Emergency"
                      value={name}
                      required
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>

                  {/* Category Description */}
                  <div className="mb-3">
                    <label className="form-label fw-bold">Description</label>
                    <textarea
                      rows="4"
                      className="form-control py-3 border-primary"
                      placeholder="Describe what kind of incidents fall under this category..."
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>

                  {/* Category Status */}
                  <div className="mb-4">
                    <label className="form-label fw-bold">Status</label>
                    <select
                      className="form-select py-3 border-primary"
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                    >
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </div>

                  {/* Submit Button */}
                  <div className="d-flex gap-3">
                    <button
                      className="btn btn-primary py-3 px-5 text-white fw-bold shadow-sm"
                      type="submit"
                      disabled={loading}
                    >
                      {loading
                        ? isEdit
                          ? "Updating..."
                          : "Saving..."
                        : isEdit
                        ? "Update Category"
                        : "Save Category"}
                    </button>
                    <Link
                      to="/admin/category"
                      className="btn btn-secondary py-3 px-4 fw-bold"
                    >
                      Cancel
                    </Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}