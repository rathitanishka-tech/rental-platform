import { useEffect, useState } from "react";
import API from "../../services/api";

export default function Saved() {
  const [saved, setSaved] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get("/users/shortlist")
      .then(res => setSaved(res.data))
      .catch(err => console.log(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading saved properties...</p>;
  if (!saved.length) return <p>No saved properties ❤️</p>;

  return (
    <div className="page">
      <h2>Saved Properties</h2>

      <div className="grid">
        {saved.map(p => (
          <div className="card" key={p._id}>

            <img src={p.images?.[0]} alt="property" />

            <div className="card-body">
              <h3>{p.title}</h3>
              <p>{p.location}</p>

              <p style={{ color: "#1E5EFF", fontWeight: "bold" }}>
                ₹ {p.price}
              </p>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}