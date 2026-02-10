import { Routes, Route } from "react-router-dom";

import Listings from "./pages/Tenant/Listings";
import Visits from "./pages/Tenant/Visits";
import Saved from "./pages/Tenant/Saved";
import PropertyDetails from "./pages/Tenant/PropertyDetails";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import AdminVisits from "./pages/Admin/AdminVisits";

import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";

export default function AppRoutes() {
  return (
    <Routes>

      {/* Public */}
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* User Routes */}
      <Route path="/listings" element={
        <ProtectedRoute>
          <Listings />
        </ProtectedRoute>
      } />

      <Route path="/visits" element={
        <ProtectedRoute>
          <Visits />
        </ProtectedRoute>
      } />

      <Route path="/saved" element={
        <ProtectedRoute>
          <Saved />
        </ProtectedRoute>
      } />

      <Route path="/property/:id" element={
        <ProtectedRoute>
          <PropertyDetails />
        </ProtectedRoute>
      } />

      {/* Admin Route */}
      <Route path="/admin/visits" element={
        <AdminRoute>
          <AdminVisits />
        </AdminRoute>
      } />

    </Routes>
  );
}