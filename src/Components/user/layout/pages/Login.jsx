import { useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";
import UserService from "../../../../services/UserService";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const nav = useNavigate();

  async function submitForm(e) {
    e.preventDefault();

    if (!email.trim() || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    let payload = {
      email: email.trim(),
      password
    };

    setLoading(true);
    try {
      const user = await UserService.login(payload);
      toast.success("Login Successful!");
      
      if (user.userType == "1" || user.userType === 1) {
        nav("/admin");
      } else {
        nav("/");
      }
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="main">
      {/* Page Title */}
      <div className="container-fluid page-header py-5">
        <h1 className="text-center text-white display-6">Login</h1>
        <ol className="breadcrumb justify-content-center mb-0">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item active text-white">Login</li>
        </ol>
      </div>
      {/* End Page Title */}

      {/* Login Section */}
      <section className="container-fluid py-5">
        <div className="container py-5">
          <div className="row justify-content-center">
            <div className="col-lg-6 col-md-8">
              <div className="p-5 bg-light rounded shadow-sm">
                <div className="text-center mb-4">
                  <h2 className="text-primary fw-bold">Welcome Back</h2>
                  <p className="text-muted">Sign in to access your safety portal</p>
                </div>

                <form onSubmit={submitForm}>
                  <div className="mb-3">
                    <label className="form-label fw-bold">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      className="form-control py-3 border-primary"
                      placeholder="Enter your email"
                      value={email}
                      required
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>

                  <div className="mb-4">
                    <label className="form-label fw-bold">Password</label>
                    <input
                      type="password"
                      className="form-control py-3 border-primary"
                      name="password"
                      placeholder="Enter your password"
                      value={password}
                      required
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>

                  <div className="text-center">
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-100 btn btn-primary py-3 text-white fw-bold shadow-sm"
                    >
                      {loading ? "Signing in..." : "Login"}
                    </button>
                  </div>

                  <div className="text-center mt-4">
                    <p className="mb-0 text-muted">
                      Don't have an account?{" "}
                      <Link to="/register" className="text-primary fw-bold">
                        Register here
                      </Link>
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* /Login Section */}
    </main>
  );
}