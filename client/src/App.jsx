import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UserDashboard from "./pages/UserDashboard";
import AuthorityDashboard from "./pages/AuthorityDashboard";
import ComplaintForm from "./pages/ComplaintForm";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// 🟢 New Home Page Component
function Home() {
  return (
    <main className="flex flex-col justify-center items-center text-center px-6 py-16 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 min-h-[calc(100vh-140px)]">
      <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-blue-700 dark:text-blue-400">
        Welcome to GHMC Cleanliness Portal
      </h1>
      <p className="text-lg sm:text-xl max-w-2xl mb-8">
        Report cleanliness issues in your area and help keep your city clean.
        Citizens can raise complaints with their nearest GHMC authorities easily
        and transparently.
      </p>
      <div className="flex flex-wrap gap-4 justify-center">
        <a
          href="/register"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow-md transition"
        >
          Register Now
        </a>
        <a
          href="/login"
          className="border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-6 py-3 rounded-lg shadow-md transition"
        >
          Login
        </a>
      </div>
    </main>
  );
}

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <BrowserRouter>
        <Navbar />
        <div className="grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* User Dashboard */}
            <Route
              path="/user/dashboard"
              element={
                <ProtectedRoute role="user">
                  <UserDashboard />
                </ProtectedRoute>
              }
            />

            {/* Authority Dashboard */}
            <Route
              path="/authority/dashboard"
              element={
                <ProtectedRoute role="authority">
                  <AuthorityDashboard />
                </ProtectedRoute>
              }
            />

            {/* Complaint Form */}
            <Route
              path="/complaint/new"
              element={
                <ProtectedRoute role="user">
                  <ComplaintForm />
                </ProtectedRoute>
              }
            />

            <Route
              path="*"
              element={
                <h1 className="text-center mt-10 text-red-500 text-xl">
                  404 — Page Not Found
                </h1>
              }
            />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
