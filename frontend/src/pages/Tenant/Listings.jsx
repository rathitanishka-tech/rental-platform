import { useEffect, useState } from "react";
import API from "../../services/api";
import { useNavigate } from "react-router-dom";

export default function Listings() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
const [loading, setLoading] = useState(true);
  const navigate = useNavigate();


 useEffect(() => {
  API.get("/properties")
    .then(res => setData(res.data))
    .catch(err => console.log(err))
    .finally(() => setLoading(false));
}, []);
  const filtered = data.filter(p =>
    p.location?.toLowerCase().includes(search.toLowerCase())
  );
if (loading) return <p>Loading properties...</p>;
if (!data.length) return <p>No properties found</p>;
  return (
    
    <div className="page">

      <h2>Explore Properties</h2>

      <input
        className="input"
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <br /><br />

      <div className="grid">
        {filtered.map(p => (
          <div className="card" key={p._id} onClick={() => navigate(`/property/${p._id}`)}>

            <img src={p.images?.[0]} />

            <div className="card-body">
              <h3>{p.title}</h3>
              <p>{p.location}</p>

              <p style={{ color: "#1E5EFF", fontWeight: "bold" }}>
                ₹{p.price}
              </p>

              <button className="btn btn-primary">
                View
              </button>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}