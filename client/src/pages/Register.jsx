import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import LocationPicker from "../components/LocationPicker";

export default function Register() {
  const navigate = useNavigate();
  const [role, setRole] = useState("user");

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
    lat: "",
    lng: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password.length < 6) {
      alert("Password must be at least 6 characters long.");
      return;
    }

    if (!form.lat || !form.lng) {
      alert("Please pick a location on the map.");
      return;
    }

    const payload =
      role === "authority"
        ? {
            ...form,
            role,
            location: {
              type: "Point",
              coordinates: [form.lng, form.lat],
            },
          }
        : {
            ...form,
            role,
            location: {
              lat: form.lat,
              lng: form.lng,
            },
          };

    await api.post("/auth/register", payload);
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-50 via-gray-100 to-blue-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 px-4">
      <div className="w-full max-w-lg bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
        <h1 className="text-3xl font-bold text-center mb-6 text-blue-700 dark:text-blue-400">
          Create Your Account
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Role Selector */}
          <div>
            <label className="block text-gray-600 dark:text-gray-300 mb-1 font-medium">
              Select Role
            </label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-900 text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="user">User</option>
              <option value="authority">Authority</option>
            </select>
          </div>

          {/* Name */}
          <div>
            <label className="block text-gray-600 dark:text-gray-300 mb-1 font-medium">
              Full Name
            </label>
            <input
              name="name"
              placeholder="Enter your full name"
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-900 text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-600 dark:text-gray-300 mb-1 font-medium">
              Email Address
            </label>
            <input
              name="email"
              placeholder="Enter your email"
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-900 text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-600 dark:text-gray-300 mb-1 font-medium">
              Password
            </label>
            <input
              name="password"
              type="password"
              placeholder="Minimum 6 characters"
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-900 text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Address (Authority Only) */}
          {role === "authority" && (
            <div>
              <label className="block text-gray-600 dark:text-gray-300 mb-1 font-medium">
                Office Address
              </label>
              <input
                name="address"
                placeholder="Enter office address"
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-900 text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          )}

          {/* Location Picker */}
          <div>
            <label className="block text-gray-600 dark:text-gray-300 mb-1 font-medium">
              Select Location on Map
            </label>
            <LocationPicker
              onSelect={({ lat, lng }) => setForm({ ...form, lat, lng })}
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-xl shadow-md transition-all duration-200"
          >
            Register
          </button>
        </form>

        <p className="text-center mt-5 text-gray-600 dark:text-gray-400">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-blue-600 dark:text-blue-400 font-semibold hover:underline"
          >
            Login
          </a>
        </p>
      </div>
    </div>
  );
}
