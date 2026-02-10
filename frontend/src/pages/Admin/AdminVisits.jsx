import { useEffect, useState } from "react";
import API from "../../services/api";

export default function AdminVisits() {
const [visits, setVisits] = useState([]);
const [loading, setLoading] = useState(true);


  const fetchData = async () => {
    try {
      const res = await API.get("/visits/all");
      setVisits(res.data);
    } catch (err) {
      console.log(err);
      alert("Not authorized");
    }
  };

 useEffect(() => {
  API.get("/visits/all")
    .then(res => setVisits(res.data))
    .catch(err => console.log(err))
    .finally(() => setLoading(false));
}, []);

  const updateStatus = async (id, status) => {
    try {
      await API.put(`/visits/${id}`, { status });
      fetchData();
    } catch (err) {
      alert("Update failed");
    }
  };
if (loading) return <p>Loading all visits...</p>;
if (!visits.length) return <p>No visits found</p>;
  return (
    <div className="page">
      <h2>Admin Visit Panel</h2>

      <div className="grid">
        {visits.map(v => (
          <div key={v._id} className="card">
            <div className="card-body">
              <h3>{v.propertyId?.title}</h3>
              <p>User: {v.userId?.email}</p>
              <p>Status: {v.status}</p>

              <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
                <button
                  className="btn btn-secondary"
                  onClick={() => updateStatus(v._id, "scheduled")}
                >
                  Schedule
                </button>

                <button
                  className="btn btn-primary"
                  onClick={() => updateStatus(v._id, "visited")}
                >
                  Mark Visited
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}