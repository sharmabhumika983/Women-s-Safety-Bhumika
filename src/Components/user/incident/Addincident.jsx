import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import IncidentService from "../../../services/IncidentService";
import CategoryService from "../../../services/CategoryService";
import CloudinaryService from "../../../services/CloudinaryService";
import AuthService from "../../../services/AuthService";
import { toast } from "react-hot-toast";

export default function Addincident() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [locating, setLocating] = useState(false);

  const navigate = useNavigate();

  // Load available categories and auto-fetch location
  useEffect(() => {
    loadCategories();
    detectLocation();
  }, []);

  async function loadCategories() {
    try {
      const data = await CategoryService.all();
      const activeCats = data.filter((c) => c.status !== "Inactive");
      setCategories(activeCats);
      if (activeCats.length > 0) {
        setCategory(activeCats[0].name || activeCats[0].title);
      } else {
        setCategory("General Safety");
      }
    } catch (err) {
      console.error(err);
      setCategory("General Safety");
    }
  }

  function detectLocation() {
    if (!navigator.geolocation) {
      toast.error("Geolocation is not supported by your browser");
      return;
    }
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLatitude(position.coords.latitude.toFixed(6));
        setLongitude(position.coords.longitude.toFixed(6));
        setLocating(false);
        toast.success("Current GPS coordinates captured");
      },
      (error) => {
        setLocating(false);
        console.warn("Location permission not granted:", error.message);
      },
      { timeout: 10000 }
    );
  }

  function handleFileChange(e) {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  }

  async function submitForm(e) {
    e.preventDefault();

    if (!title.trim() || !description.trim() || !location.trim()) {
      toast.error("Please fill in the incident title, description, and location");
      return;
    }

    setLoading(true);
    try {
      let finalImageUrl = imageUrl.trim();

      // If a file was chosen, upload to Cloudinary
      if (imageFile) {
        toast.loading("Uploading incident evidence/photo...", { id: "upload" });
        try {
          const uploadedUrl = await CloudinaryService.upload(imageFile);
          if (uploadedUrl) {
            finalImageUrl = uploadedUrl;
          }
        } catch (uploadErr) {
          console.warn("Cloudinary upload error, continuing without cloud image:", uploadErr);
        } finally {
          toast.dismiss("upload");
        }
      }

      const reporterName = AuthService.getName() || "Anonymous";
      const reporterEmail = AuthService.getEmail() || "N/A";

      let payload = {
        name: title.trim(),
        category: category || "General Safety",
        description: description.trim(),
        location: location.trim(),
        latitude: latitude || "",
        longitude: longitude || "",
        imageUrl: finalImageUrl,
        status: "Pending",
        reportedBy: reporterName,
        reportedByEmail: reporterEmail,
      };

      await IncidentService.add(payload);
      toast.success("Incident reported successfully! Help is being mobilized.");
      navigate("/incident");
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Failed to report incident. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div className="container-fluid page-header py-5">
        <h1 className="text-center text-white display-6">Report a Safety Incident</h1>
        <ol className="breadcrumb justify-content-center mb-0">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to="/incident">Incidents</Link>
          </li>
          <li className="breadcrumb-item active text-white">Report Incident</li>
        </ol>
      </div>

      <div className="container-fluid py-5">
        <div className="container py-4">
          <div className="row justify-content-center">
            <div className="col-lg-8 col-md-10">
              <div className="p-5 bg-light rounded shadow-sm">
                <div className="text-center mb-4">
                  <span className="badge bg-danger p-2 mb-2">URGENT REPORTING</span>
                  <h2 className="text-primary fw-bold">Incident Details</h2>
                  <p className="text-muted">
                    Report an unsafe situation, harassment, poor infrastructure, or request assistance.
                  </p>
                </div>

                <form onSubmit={submitForm}>
                  {/* Incident Title */}
                  <div className="mb-3">
                    <label className="form-label fw-bold">Incident Title / Summary *</label>
                    <input
                      type="text"
                      className="form-control py-3 border-primary"
                      placeholder="e.g. Unsafe bus stop after dark, Eve teasing incident"
                      value={title}
                      required
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </div>

                  {/* Category Selection */}
                  <div className="mb-3">
                    <label className="form-label fw-bold">Category</label>
                    <select
                      className="form-select py-3 border-primary"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                    >
                      {categories.length > 0 ? (
                        categories.map((c) => (
                          <option key={c.id} value={c.name || c.title}>
                            {c.name || c.title}
                          </option>
                        ))
                      ) : (
                        <>
                          <option value="Harassment">Harassment</option>
                          <option value="Poor Lighting / Infrastructure">Poor Lighting / Infrastructure</option>
                          <option value="Stalking">Stalking</option>
                          <option value="Emergency Assistance">Emergency Assistance</option>
                          <option value="General Safety">General Safety</option>
                        </>
                      )}
                    </select>
                  </div>

                  {/* Description */}
                  <div className="mb-3">
                    <label className="form-label fw-bold">Detailed Description *</label>
                    <textarea
                      rows="4"
                      className="form-control py-3 border-primary"
                      placeholder="Provide specific details about what occurred or the hazard observed..."
                      value={description}
                      required
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>

                  {/* Location Name */}
                  <div className="mb-3">
                    <label className="form-label fw-bold">Location Name / Landmark *</label>
                    <input
                      type="text"
                      className="form-control py-3 border-primary"
                      placeholder="e.g. Near City Center Metro Station, Street 5"
                      value={location}
                      required
                      onChange={(e) => setLocation(e.target.value)}
                    />
                  </div>

                  {/* GPS Coordinates */}
                  <div className="row mb-3">
                    <div className="col-md-6 mb-2 mb-md-0">
                      <label className="form-label fw-bold">Latitude (GPS)</label>
                      <input
                        type="text"
                        className="form-control py-3 border-primary bg-white"
                        placeholder="Auto detected"
                        value={latitude}
                        onChange={(e) => setLatitude(e.target.value)}
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label fw-bold">Longitude (GPS)</label>
                      <input
                        type="text"
                        className="form-control py-3 border-primary bg-white"
                        placeholder="Auto detected"
                        value={longitude}
                        onChange={(e) => setLongitude(e.target.value)}
                      />
                    </div>
                    <div className="col-12 mt-2">
                      <button
                        type="button"
                        onClick={detectLocation}
                        disabled={locating}
                        className="btn btn-outline-primary btn-sm"
                      >
                        <i className={`fas fa-map-marker-alt me-1 ${locating ? "fa-spin" : ""}`}></i>
                        {locating ? "Detecting location..." : "Refetch Current GPS Location"}
                      </button>
                    </div>
                  </div>

                  {/* Image Upload / URL */}
                  <div className="mb-4">
                    <label className="form-label fw-bold">Evidence Photo / Image (Optional)</label>
                    <input
                      type="file"
                      accept="image/*"
                      className="form-control py-2 mb-2 border-primary"
                      onChange={handleFileChange}
                    />
                    <div className="input-group">
                      <span className="input-group-text bg-light text-muted">Or Image URL</span>
                      <input
                        type="url"
                        className="form-control py-2 border-primary"
                        placeholder="https://example.com/photo.jpg"
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                      />
                    </div>
                    {imagePreview && (
                      <div className="mt-2 text-center">
                        <img
                          src={imagePreview}
                          alt="Preview"
                          className="rounded border"
                          style={{ maxHeight: 180, objectFit: "cover" }}
                        />
                      </div>
                    )}
                  </div>

                  {/* Submit */}
                  <div className="text-center">
                    <button
                      className="w-100 btn btn-danger py-3 text-white fw-bold shadow-sm"
                      type="submit"
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                          Submitting Report...
                        </>
                      ) : (
                        <>
                          <i className="fas fa-paper-plane me-2"></i> Submit Safety Report
                        </>
                      )}
                    </button>
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