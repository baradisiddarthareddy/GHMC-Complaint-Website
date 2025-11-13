import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-gray-900 text-white px-6 py-4 flex justify-between items-center shadow-md">
      <Link to="/" className="text-2xl font-bold text-blue-400">
        GHMC Cleanliness
      </Link>

      <div className="flex items-center gap-4">
        {!user && (
          <>
            <Link
              to="/login"
              className="text-gray-300 hover:text-white transition"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
            >
              Register
            </Link>
          </>
        )}

        {user && (
          <>
            <Link
              to={
                user.role === "user"
                  ? "/user/dashboard"
                  : "/authority/dashboard"
              }
              className="text-gray-300 hover:text-white transition"
            >
              Dashboard
            </Link>

            <button
              onClick={logout}
              className="text-red-400 hover:text-red-500 font-medium transition"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
