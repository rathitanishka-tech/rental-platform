import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../../services/api";
import { isAdmin } from "../../utils/auth";

export default function PropertyDetails() {
  const { id } = useParams();

  const [property, setProperty] = useState(null);
  const [hasRequested, setHasRequested] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    API.get(`/properties/${id}`)
      .then((res) => setProperty(res.data))
      .catch((err) => console.log(err));
  }, [id]);

  useEffect(() => {
    API.get("/visits")
      .then((res) => {
        const exists = res.data.find((v) => v.propertyId === id);
        if (exists) setHasRequested(true);
      })
      .catch((err) => console.log(err));
  }, [id]);

  useEffect(() => {
    API.get("/users/shortlist")
      .then((res) => {
        const exists = res.data.find((p) => p._id === id);
        if (exists) setIsSaved(true);
      })
      .catch((err) => console.log(err));
  }, [id]);

  const requestVisit = async () => {
    try {
      await API.post("/visits", { propertyId: id });
      setHasRequested(true);
      alert("Visit requested ✅");
    } catch (err) {
      alert("Error requesting visit");
    }
  };

  const toggleShortlist = async () => {
    try {
      if (isSaved) {
        await API.delete("/users/shortlist", {
          data: { propertyId: id },
        });
        setIsSaved(false);
      } else {
        await API.post("/users/shortlist", { propertyId: id });
        setIsSaved(true);
      }
    } catch (err) {
      alert("Error updating shortlist");
    }
  };

  if (!property) return <p className="page">Loading...</p>;

  return (
    <div className="page">
      <div className="card" style={{ maxWidth: "800px", margin: "auto" }}>
        <img
          src={
            property.images?.[0] ||
            "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85"
          }
          alt="property"
        />

        <div className="card-body">
          <h2>{property.title}</h2>

          <p>{property.location}</p>

          <p className="price-tag">₹{property.price}</p>

          <p>{property.description}</p>

          <div style={{ display: "flex", gap: "10px", marginTop: "15px" }}>
            {/* ❤️ Save */}
            {!isAdmin() && (
              <button className="btn btn-secondary" onClick={toggleShortlist}>
                {isSaved ? "❤️ Saved" : "🤍 Save"}
              </button>
            )}

            {/* 📅 Visit */}
            {!isAdmin() &&
              (hasRequested ? (
                <span className="badge badge-visited">Requested</span>
              ) : (
                <button className="btn btn-primary" onClick={requestVisit}>
                  Request Visit
                </button>
              ))}
          </div>
        </div>
      </div>
    </div>
  );

  const handleSave = async () => {
  try {
    await API.post("/users/shortlist", {
      propertyId: property._id
    });

    alert("Saved successfully ❤️");

  } catch (err) {
    console.log(err);
    alert("Error saving");
  }
};
}
