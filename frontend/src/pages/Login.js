import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    try {
      if (!email || !password) {
        alert("Please fill all fields");
        return;
      }

      setLoading(true);

      const res = await axios.post(
        "http://localhost:5000/api/users/login",
        {
          email,
          password,
        }
      );

      localStorage.setItem("token", res.data.token);

      alert("Login Successful");

      navigate("/dashboard");

    } catch (error) {

      alert(
        error.response?.data?.message ||
        "Invalid Credentials"
      );

    } finally {

      setLoading(false);
    }
  };

  return (
    <div
      className="container-fluid"
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #141e30 0%, #243b55 100%)",
      }}
    >
      <div className="row min-vh-100">

        {/* LEFT IMAGE SECTION */}

        <div
          className="col-md-6 d-none d-md-flex align-items-center justify-content-center"
        >
          <img
            src="https://images.unsplash.com/photo-1498050108023-c5249f4df085"
            alt="blog"
            className="img-fluid rounded shadow"
            style={{
              width: "80%",
              maxHeight: "80vh",
              objectFit: "cover",
              borderRadius: "25px",
            }}
          />
        </div>

        {/* RIGHT LOGIN SECTION */}

        <div
          className="col-md-6 d-flex align-items-center justify-content-center"
        >
          <div
            className="card p-5 border-0"
            style={{
              width: "420px",
              borderRadius: "25px",
              boxShadow: "0 15px 35px rgba(0,0,0,0.4)",
            }}
          >

            <div className="text-center mb-4">

              <h1>🚀</h1>

              <h2 className="fw-bold">
                Welcome Back
              </h2>

              <p className="text-muted">
                Login to continue blogging
              </p>

            </div>

            <input
              type="email"
              placeholder="Email address"
              className="form-control mb-3 p-3"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ borderRadius: "14px" }}
            />

            <input
              type="password"
              placeholder="Password"
              className="form-control mb-4 p-3"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ borderRadius: "14px" }}
            />

            <button
              className="btn text-white fw-bold w-100"
              onClick={handleLogin}
              disabled={loading}
              style={{
                background:
                  "linear-gradient(90deg, #ff512f 0%, #dd2476 100%)",
                borderRadius: "25px",
                padding: "12px",
                border: "none",
              }}
            >
              {loading ? "Logging in..." : "Login"}
            </button>

            <p className="mt-4 text-center">
              Don't have an account?{" "}
              <Link
                to="/register"
                style={{
                  color: "#dd2476",
                  fontWeight: "bold",
                  textDecoration: "none",
                }}
              >
                Register
              </Link>
            </p>

          </div>
        </div>

      </div>
    </div>
  );
}

export default Login;