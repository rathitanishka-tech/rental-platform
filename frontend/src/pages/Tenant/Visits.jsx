import { useEffect, useState } from "react";
import API from "../../services/api";

export default function Visits() {
  const [visits, setVisits] = useState([]);
  const [loading, setLoading] = useState(true);


 useEffect(() => {
  API.get("/visits")
    .then(res => setVisits(res.data))
    .catch(err => console.log(err))
    .finally(() => setLoading(false));
}, []);

if (loading) return <p>Loading visits...</p>;
if (!visits.length) return <p>No visits yet 📅</p>;
  return (
    
    <div className="page">
      <h2>My Visits</h2>

      <div className="grid">
        {visits.map(v => (
          <div className="card" key={v._id}>

            <img src={v.propertyId?.images?.[0]} />

            <div className="card-body">
              <h3>{v.propertyId?.title}</h3>

              <span className={`badge ${
                v.status === "visited"
                  ? "badge-visited"
                  : v.status === "scheduled"
                  ? "badge-scheduled"
                  : "badge-pending"
              }`}>
                {v.status}
              </span>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}