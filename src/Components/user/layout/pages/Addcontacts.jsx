import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import TrustedcontactsService from "../../../../services/TrustedcontactsService";
import { toast } from "react-hot-toast";

export default function AddTrustedcontacts() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [relation, setRelation] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate()


    async function submitForm(e) {
        e.preventDefault();

        if (!name.trim() || !email.trim() || !phone.trim() || !relation.trim()) {
            toast.error("Please fill all the fields");
            return;
        }

        setLoading(true);
        try {

            let payload = {
                name: name,
                email: email,
                phone: phone,
                relation: relation,

            };

            await TrustedcontactsService.add(payload);
            toast.success("Trustedcontacts added successfully!.");
            navigate("/Trustedcontacts");
        } catch (err) {
            console.error(err);
            toast.error(err.message || "Failed to add Trustedcontacts. Please try again.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <div className="container-fluid page-header py-5">
                <h1 className="text-center text-white display-6">Add a Trustedcontact</h1>
                <ol className="breadcrumb justify-content-center mb-0">
                    <li className="breadcrumb-item">
                        <Link to="/">Home</Link>
                    </li>
                    <li className="breadcrumb-item">
                        <Link to="/Trustedcontacts">Trustedcontacts</Link>
                    </li>
                    <li className="breadcrumb-item active text-white">Add Trustedcontacts</li>
                </ol>
            </div>

            <div className="container-fluid py-5">
                <div className="container py-4">
                    <div className="row justify-content-center">
                        <div className="col-lg-8 col-md-10">
                            <div className="p-5 bg-light rounded shadow-sm">
                                <div className="text-center mb-4">
                                    <span className="badge bg-danger p-2 mb-2">URGENT REPORTING</span>
                                    <h2 className="text-primary fw-bold">Trustedcontacts Details</h2>
                                    <p className="text-muted">
                                        Report an unsafe situation, harassment, poor infrastructure, or request assistance.
                                    </p>
                                </div>

                                <form onSubmit={submitForm}>
                                    {/* Trustedcontacts Title */}
                                    <div className="mb-3">
                                        <label className="form-label fw-bold">Name *</label>
                                        <input
                                            type="text"
                                            className="form-control py-3 border-primary"
                                            placeholder="e.g. Yuvansh"
                                            value={name}
                                            required
                                            onChange={(e) => setName(e.target.value)}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label fw-bold">Email *</label>
                                        <input
                                            type="text"
                                            className="form-control py-3 border-primary"
                                            placeholder="e.g. yuvansh@example.com"
                                            value={email}
                                            required
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label fw-bold">Phone *</label>
                                        <input
                                            type="text"
                                            className="form-control py-3 border-primary"
                                            placeholder="e.g. 9234567891"
                                            value={phone}
                                            required
                                            onChange={(e) => setPhone(e.target.value)}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label fw-bold">Relation *</label>
                                        <input
                                            type="text"
                                            className="form-control py-3 border-primary"
                                            placeholder="e.g. Father"
                                            value={relation}
                                            required
                                            onChange={(e) => setRelation(e.target.value)}
                                        />
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