import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";
import { Link } from "react-router-dom";
import ComplaintCard from "../components/ComplaintCard";

export default function UserDashboard() {
  const { user, logout } = useAuth();
  const [authorities, setAuthorities] = useState([]);
  const [complaints, setComplaints] = useState([]);
  const [coords, setCoords] = useState({ lat: null, lng: null });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((pos) => {
      setCoords({
        lat: pos.coords.latitude,
        lng: pos.coords.longitude,
      });
    });
  }, []);

  useEffect(() => {
    async function fetchAuthorities() {
      if (!coords.lat) return;
      const res = await api.get(
        `/authorities/nearby?lat=${coords.lat}&lng=${coords.lng}&radius=20`
      );
      setAuthorities(res.data);
    }
    fetchAuthorities();
  }, [coords]);

  // 🟢 Fetch user’s complaints
  useEffect(() => {
    async function fetchComplaints() {
      const res = await api.get("/complaints/user", {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setComplaints(res.data);
    }
    fetchComplaints();
  }, []);

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-100 via-blue-50 to-gray-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 px-6 py-10">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-blue-700 dark:text-blue-400 text-center sm:text-left">
            Welcome, {user.name}
          </h1>
          <button
            onClick={logout}
            className="mt-4 sm:mt-0 px-5 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-all duration-200 shadow-md"
          >
            Logout
          </button>
        </div>

        {/* Nearby Authorities */}
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4 text-center sm:text-left">
          Nearby GHMC Authorities
        </h2>

        {authorities.length === 0 ? (
          <p className="text-center text-gray-500 dark:text-gray-400 mt-6">
            Searching for nearby authorities...
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {authorities.map((a) => (
              <div
                key={a._id}
                className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300"
              >
                <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">
                  {a.name}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  {a.address}
                </p>
                <Link
                  to="/complaint/new"
                  state={{ authorityId: a._id }}
                  className="inline-block mt-4 text-blue-600 dark:text-blue-400 font-semibold hover:underline"
                >
                  Raise Complaint →
                </Link>
              </div>
            ))}
          </div>
        )}

        {/* 🟢 My Complaints Section */}
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4 text-center sm:text-left">
          My Complaints
        </h2>

        {complaints.length === 0 ? (
          <p className="text-center text-gray-500 dark:text-gray-400 mt-6">
            You have not raised any complaints yet.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {complaints.map((c) => (
              <ComplaintCard
                key={c._id}
                complaint={c}
                isAuthorityView={false}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
