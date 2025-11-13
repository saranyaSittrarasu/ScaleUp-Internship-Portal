import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useApp } from "../../context/AppContext";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { state, dispatch } = useApp();

  const parseStoredJSON = (key) => {
    try {
      const raw = localStorage.getItem(key);
      if (!raw || raw === "undefined") {
        return null;
      }
      return JSON.parse(raw);
    } catch (error) {
      console.warn(`Failed to parse ${key} from localStorage`, error);
      // remove corrupted entry so we don't keep failing
      localStorage.removeItem(key);
      return null;
    }
  };

  const storedCandidate = parseStoredJSON("candidate");
  const storedEmployer = parseStoredJSON("employer");

  const derivedUser =
    state.currentUser || storedCandidate || storedEmployer || null;

  const derivedRole =
    state.userRole ||
    (storedCandidate ? "candidate" : storedEmployer ? "employer" : null);

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    localStorage.removeItem("candidate");
    localStorage.removeItem("employer");
    localStorage.removeItem("internshipHubData");
    navigate("/");
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center gap-2">
            <span className="text-2xl font-bold text-primary-600">
              Internship Hub
            </span>
          </Link>

          {derivedRole && (
            <div className="flex items-center gap-6">
              {derivedUser && (
                <div className="flex items-center gap-3">
                  {/* <span className="text-lg text-black font-semibold text-primary-600">
                    <h1>{derivedUser.name || derivedUser.companyName}</h1>
                  </span> */}
                  <button
                    onClick={handleLogout}
                    className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors text-sm font-medium"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
