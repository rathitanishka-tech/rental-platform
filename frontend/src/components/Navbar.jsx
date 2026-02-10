import { useNavigate } from "react-router-dom";
import { isAdmin } from "../utils/auth";

export default function Navbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="navbar">
      <h3 style={{ color: "#1E5EFF", cursor: "pointer" }} onClick={() => navigate("/listings")}>
        RentalHub
      </h3>

      <div style={{ display: "flex", gap: "15px", alignItems: "center" }}>

        {/* 👤 TENANT VIEW */}
        {!isAdmin() && (
          <>
            <button className="btn btn-secondary" onClick={() => navigate("/listings")}>
              Home
            </button>

            <button className="btn btn-secondary" onClick={() => navigate("/visits")}>
              Visits
            </button>

            <button className="btn btn-secondary" onClick={() => navigate("/saved")}>
              Saved
            </button>
          </>
        )}

        {/* 🛠️ ADMIN VIEW */}
        {isAdmin() && (
          <button
            className="btn btn-primary"
            onClick={() => navigate("/admin/visits")}
          >
            Admin Panel
          </button>
        )}

        {/* 🚪 LOGOUT */}
        <button className="btn btn-secondary" onClick={logout}>
          Logout
        </button>

      </div>
    </div>
  );
}