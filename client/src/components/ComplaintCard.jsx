import React from "react";
import StatusTimeline from "./StatusTimeline"; // 🟢 import timeline if available

export default function ComplaintCard({
  complaint,
  onStatusChange,
  isAuthorityView,
}) {
  const statusColor = {
    Pending: "bg-gray-500",
    "In Progress": "bg-yellow-500",
    Resolved: "bg-green-600",
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300">
      {complaint.imageUrl && (
        <img
          src={complaint.imageUrl}
          alt="Complaint"
          className="w-full h-56 object-cover rounded-xl mb-4"
        />
      )}

      <p className="text-gray-800 dark:text-gray-200 mb-2 font-medium">
        {complaint.description}
      </p>

      {/* Status Info */}
      <div className="flex items-center gap-2 mb-2">
        <div
          className={`w-3 h-3 rounded-full ${statusColor[complaint.status]}`}
        ></div>
        <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
          {complaint.status}
        </span>
      </div>

      {/* For user view: show timeline */}
      {!isAuthorityView && <StatusTimeline status={complaint.status} />}

      {/* Authority buttons */}
      {isAuthorityView && (
        <div className="flex flex-wrap gap-3 mt-4">
          <button
            onClick={() => onStatusChange(complaint._id, "In Progress")}
            disabled={
              complaint.status === "In Progress" ||
              complaint.status === "Resolved"
            }
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              complaint.status === "In Progress" ||
              complaint.status === "Resolved"
                ? "bg-yellow-300 text-white cursor-not-allowed"
                : "bg-yellow-500 hover:bg-yellow-600 text-white"
            }`}
          >
            In Progress
          </button>
          <button
            onClick={() => onStatusChange(complaint._id, "Resolved")}
            disabled={complaint.status === "Resolved"}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              complaint.status === "Resolved"
                ? "bg-green-400 text-white cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700 text-white"
            }`}
          >
            Resolved
          </button>
        </div>
      )}
    </div>
  );
}
