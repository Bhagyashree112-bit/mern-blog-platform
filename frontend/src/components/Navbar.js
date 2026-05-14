import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");

    alert("Logged out successfully");

    navigate("/");
  };

  return (
    <nav
      className="navbar navbar-expand-lg px-4 py-3"
      style={{
        background:
          "linear-gradient(90deg, #4facfe 0%, #00f2fe 100%)",
        boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
      }}
    >
      <div className="container-fluid">

        {/* LOGO */}

        <h2
          className="text-white fw-bold m-0"
          style={{
            cursor: "pointer",
            letterSpacing: "1px",
          }}
          onClick={() => navigate("/dashboard")}
        >
          🚀 MERN Blog
        </h2>

        {/* BUTTONS */}

        <div className="d-flex align-items-center">

          <button
            className="btn me-3"
            style={{
              backgroundColor: "white",
              color: "#007bff",
              fontWeight: "bold",
              borderRadius: "25px",
              padding: "8px 18px",
              border: "none",
            }}
            onClick={() => navigate("/dashboard")}
          >
            Dashboard
          </button>

          <button
            className="btn"
            style={{
              backgroundColor: "#ff4b5c",
              color: "white",
              fontWeight: "bold",
              borderRadius: "25px",
              padding: "8px 18px",
              border: "none",
            }}
            onClick={logout}
          >
            Logout
          </button>

        </div>

      </div>
    </nav>
  );
}

export default Navbar;