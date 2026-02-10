import { useEffect, useState } from "react";
import API from "../../services/api";

export default function Saved() {
  const [saved, setSaved] = useState([]);
 const [loading, setLoading] = useState(true);
 const [data, setData] = useState([]);

  useEffect(() => {
  const fetchData = async () => {
    try {
      const res = await API.get("/users/shortlist");
      setData(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  fetchData();
}, []);
if (loading) return <p>Loading saved properties...</p>;
if (!data.length) return <p>No saved properties yet ❤️</p>;
  return (
    
    <div className="page">
      <h2>Saved</h2>
        
      <div className="grid">
        {saved.map(p => (
          <div className="card" key={p._id}>
            <img src={p.images?.[0]} />

            <div className="card-body">
              <h3>{p.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
if (!data.length) {
  return <p>No saved properties yet</p>;
}

}