import {  Routes, Route } from "react-router-dom";
import Login from "./pages/Auth/Login";
import Listings from "./pages/Tenant/Listings";
import PropertyDetails from "./pages/Tenant/PropertyDetails";

export default function AppRoutes() {
  return (
    
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/listings" element={<Listings />} />
        <Route path="/property/:id" element={<PropertyDetails />} />
      </Routes>
   
  );
}