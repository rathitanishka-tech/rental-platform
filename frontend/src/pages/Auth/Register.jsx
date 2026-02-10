import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../services/api";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/auth/register", form);

      alert("Registered successfully");

      navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="page" style={{ maxWidth: "400px" }}>
      <h2 style={{ marginBottom: "20px" }}>Register</h2>

      <form onSubmit={handleSubmit}>

        <input
          className="input"
          type="text"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />

        <br /><br />

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
          Register
        </button>

      </form>

      <p style={{ marginTop: "15px", fontSize: "14px" }}>
        Already have an account?{" "}
        <span
          style={{ color: "#FF8E2B", cursor: "pointer" }}
          onClick={() => navigate("/")}
        >
          Login
        </span>
      </p>
    </div>
  );
}