import { useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";
import UserService from "../../../../services/UserService";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);

  const nav = useNavigate();

  async function submitForm(e) {
    e.preventDefault();

    if (!name.trim() || !email.trim() || !password || !phone.trim() || !address.trim()) {
      toast.error("Please fill in all fields");
      return;
    }

    if (password.length < 6) {
      toast.error("Password should be at least 6 characters");
      return;
    }

    let payload = {
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      password,
      address: address.trim(),
    };

    setLoading(true);
    try {
      await UserService.register(payload);
      toast.success("Registration Successful! Please login.");
      nav("/login");
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="main">
      {/* Page Title */}
      <div className="container-fluid page-header py-5">
        <h1 className="text-center text-white display-6">Register</h1>
        <ol className="breadcrumb justify-content-center mb-0">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item active text-white">Register</li>
        </ol>
      </div>
      {/* End Page Title */}

      {/* Register Section */}
      <section className="container-fluid py-5">
        <div className="container py-5">
          <div className="row justify-content-center">
            <div className="col-lg-8 col-md-10">
              <div className="p-5 bg-light rounded shadow-sm">
                <div className="text-center mb-4">
                  <h2 className="text-primary fw-bold">Create Account</h2>
                  <p className="text-muted">Join the Women's Safety community</p>
                </div>

                <form onSubmit={submitForm}>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label fw-bold">Full Name</label>
                      <input
                        type="text"
                        name="name"
                        className="form-control py-3 border-primary"
                        placeholder="Your Full Name"
                        value={name}
                        required
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label fw-bold">Contact Number</label>
                      <input
                        type="tel"
                        name="phone"
                        className="form-control py-3 border-primary"
                        placeholder="Your Contact Number"
                        value={phone}
                        required
                        onChange={(e) => setPhone(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label fw-bold">Email Address</label>
                      <input
                        type="email"
                        name="email"
                        className="form-control py-3 border-primary"
                        placeholder="Your Email"
                        value={email}
                        required
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label fw-bold">Password</label>
                      <input
                        type="password"
                        name="password"
                        className="form-control py-3 border-primary"
                        placeholder="At least 6 characters"
                        value={password}
                        required
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="form-label fw-bold">Address / City</label>
                    <textarea
                      className="form-control py-3 border-primary"
                      name="address"
                      rows="3"
                      placeholder="Your Residential Address or City"
                      value={address}
                      required
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </div>

                  <div className="text-center">
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-100 btn btn-primary py-3 text-white fw-bold shadow-sm"
                    >
                      {loading ? "Registering..." : "Register Now"}
                    </button>
                  </div>

                  <div className="text-center mt-4">
                    <p className="mb-0 text-muted">
                      Already have an account?{" "}
                      <Link to="/login" className="text-primary fw-bold">
                        Login here
                      </Link>
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* /Register Section */}
    </main>
  );
}