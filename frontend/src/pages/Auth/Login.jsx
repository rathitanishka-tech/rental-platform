import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../services/api";

export default function Login() {
  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/auth/login", form);

      localStorage.setItem("token", res.data.token);

      const token = res.data.token;
localStorage.setItem("token", token);

const payload = JSON.parse(atob(token.split(".")[1]));

if (payload.role === "admin") {
  navigate("/admin/visits");
} else {
  navigate("/listings");
}
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="page" style={{ maxWidth: "400px" }}>
      <h2 style={{ marginBottom: "20px" }}>Login</h2>

      <form onSubmit={handleSubmit}>

        <input
          className="input"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />

        <br /><br />

        <input
          className="input"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
        />

        <br /><br />

        <button className="btn btn-primary" style={{ width: "100%" }}>
          Login
        </button>

      </form>

      <p style={{ marginTop: "15px", fontSize: "14px" }}>
        Don't have an account?{" "}
        <span
          style={{ color: "#FF8E2B", cursor: "pointer" }}
          onClick={() => navigate("/register")}
        >
          Register
        </span>
      </p>
    </div>
  );
}