import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    try {
      if (!name || !email || !password) {
        alert("Please fill all fields");
        return;
      }

      setLoading(true);

      await axios.post("http://localhost:5000/api/users/register", {
        name,
        email,
        password,
      });

      alert("Registration Successful");

      navigate("/");
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Registration Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #43cea2 0%, #185a9d 100%)",
      }}
    >
      <div
        className="card p-5 border-0"
        style={{
          width: "430px",
          borderRadius: "25px",
          boxShadow: "0 15px 35px rgba(0,0,0,0.3)",
        }}
      >
        <div className="text-center mb-4">
          <h1>✨</h1>

          <h2 className="fw-bold">
            Create Account
          </h2>

          <p className="text-muted">
            Join the MERN Blog community
          </p>
        </div>

        <input
          type="text"
          placeholder="Full Name"
          className="form-control mb-3 p-3"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ borderRadius: "14px" }}
        />

        <input
          type="email"
          placeholder="Email Address"
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
          onClick={handleRegister}
          disabled={loading}
          style={{
            background:
              "linear-gradient(90deg, #43cea2 0%, #185a9d 100%)",
            borderRadius: "25px",
            padding: "12px",
            border: "none",
          }}
        >
          {loading ? "Registering..." : "Register"}
        </button>

        <p className="mt-4 text-center">
          Already have an account?{" "}
          <Link
            to="/"
            style={{
              color: "#185a9d",
              fontWeight: "bold",
              textDecoration: "none",
            }}
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;