import { useEffect, useState } from "react";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";
import SummaryCard from "../components/SummaryCard";
import ComplaintCard from "../components/ComplaintCard"

export default function AuthorityDashboard() {
  const { user, logout } = useAuth();
  const [complaints, setComplaints] = useState([]);

  const fetchComplaints = async () => {
    const res = await api.get("/complaints/authority", {
      headers: { Authorization: `Bearer ${user.token}` },
    });
    setComplaints(res.data);
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  const updateStatus = async (id, newStatus) => {
    await api.put(
      `/complaints/${id}/status`,
      { status: newStatus },
      { headers: { Authorization: `Bearer ${user.token}` } }
    );
    fetchComplaints();
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-100 via-blue-50 to-gray-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 px-6 py-10">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-blue-700 dark:text-blue-400 text-center sm:text-left">
            Welcome Officer, {user.name}
          </h1>
          <button
            onClick={logout}
            className="mt-4 sm:mt-0 px-5 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-all duration-200 shadow-md"
          >
            Logout
          </button>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 mb-10">
          <SummaryCard title="Total Complaints" value={complaints.length} />
          <SummaryCard
            title="Resolved"
            value={complaints.filter((c) => c.status === "Resolved").length}
          />
          <SummaryCard
            title="In Progress"
            value={complaints.filter((c) => c.status === "In Progress").length}
          />
        </div>

        {/* Complaints List */}
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4 text-center sm:text-left">
          Complaints Assigned to You
        </h2>

        {complaints.length === 0 ? (
          <p className="text-center text-gray-500 dark:text-gray-400 mt-6">
            No complaints assigned yet.
          </p>
        ) : (
          <div className="space-y-6">
            {complaints.map((c) => (
              <ComplaintCard
                key={c._id}
                complaint={c}
                onStatusChange={updateStatus}
                isAuthorityView={true}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
