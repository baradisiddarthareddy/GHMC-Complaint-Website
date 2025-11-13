import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";
import LocationPicker from "../components/LocationPicker";

export default function ComplaintForm() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [file, setFile] = useState(null);
  const [description, setDescription] = useState("");
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [loadingLocation, setLoadingLocation] = useState(false);
  const [error, setError] = useState("");

  const submitComplaint = async (e) => {
    e.preventDefault();

    if (!lat || !lng) {
      alert("Please select or use your current location.");
      return;
    }

    const formData = new FormData();
    formData.append("image", file);
    formData.append("description", description);
    formData.append("authorityId", state.authorityId);
    formData.append("lat", lat);
    formData.append("lng", lng);

    try {
      await api.post("/complaints", formData, {
        headers: {
          Authorization: `Bearer ${user.token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      navigate("/user/dashboard");
    } catch (err) {
      setError("Failed to submit complaint. Please try again.");
    }
  };

  // 🟢 Get current location using browser GPS
  const handleUseMyLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }

    setLoadingLocation(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLat(position.coords.latitude);
        setLng(position.coords.longitude);
        setLoadingLocation(false);
        alert("✅ Location detected successfully!");
      },
      (error) => {
        setLoadingLocation(false);
        alert(
          "⚠️ Failed to access location. Please allow location access in your browser."
        );
      }
    );
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-linear-to-br from-gray-100 via-blue-50 to-gray-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 px-4">
      <div className="w-full max-w-2xl bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
        <h1 className="text-3xl font-bold text-center mb-6 text-blue-700 dark:text-blue-400">
          Raise a Cleanliness Complaint
        </h1>
        <p className="text-center text-gray-600 dark:text-gray-400 mb-6">
          Upload a photo, describe the issue, and mark or use your current
          location.
        </p>

        {error && (
          <p className="text-red-500 text-center bg-red-50 dark:bg-red-900/30 py-2 rounded-xl mb-4">
            {error}
          </p>
        )}

        <form
          onSubmit={submitComplaint}
          className="space-y-5 text-gray-700 dark:text-gray-200"
        >
          {/* File Upload */}
          <div>
            <label className="block mb-1 font-medium">Upload Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setFile(e.target.files[0])}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block mb-1 font-medium">Description</label>
            <textarea
              placeholder="Describe the issue briefly..."
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 h-28 resize-none"
              required
            />
          </div>

          {/* 🟢 Current Location Button */}
          <div className="flex justify-between items-center">
            <label className="font-medium">Select Location</label>
            <button
              type="button"
              onClick={handleUseMyLocation}
              className="text-blue-600 dark:text-blue-400 font-semibold hover:underline"
              disabled={loadingLocation}
            >
              {loadingLocation
                ? "Getting location..."
                : "📍 Use My Current Location"}
            </button>
          </div>

          {/* Map Picker */}
          <LocationPicker
            onSelect={({ lat, lng }) => {
              setLat(lat);
              setLng(lng);
            }}
          />

          {lat && lng && (
            <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
              📍 Selected Location: {lat.toFixed(4)}, {lng.toFixed(4)}
            </p>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-xl shadow-md transition-all duration-200"
          >
            Submit Complaint
          </button>
        </form>
      </div>
    </div>
  );
}
