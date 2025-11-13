import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import Navbar from "../components/Layout/Navbar";
import Footer from "../components/Layout/Footer";
import HeroSection from "../components/Layout/HeroSection";

export default function LandingPage() {
  const navigate = useNavigate();
  const { state, dispatch } = useApp();
  const [showLogin, setShowLogin] = useState(false);

  const handleRoleSelect = (role) => {
    if (role === "candidate") {
      navigate("/candidate/login");
    } else if (role === "employer") {
      navigate("/employer/login");
    }
  };

  // const handleLogin = (candidate) => {
  //   dispatch({
  //     type: "SET_USER",
  //     payload: {
  //       user: candidate,
  //       role: "candidate",
  //     },
  //   });

  //   if (window.selectedRole === "candidate") {
  //     navigate("/candidate/dashboard");
  //   }
  //   setShowLogin(false);
  // };

  // const handleEmployerLogin = () => {
  //   // For demo, use first employer
  //   const employer = state.employers[0];
  //   if (employer) {
  //     dispatch({
  //       type: "SET_USER",
  //       payload: {
  //         user: employer,
  //         role: "employer",
  //       },
  //     });
  //     navigate("/employer/dashboard");
  //   }
  // };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* {showLogin && window.selectedRole === "candidate" ? (
        <div className="flex-1 bg-gray-50 py-12 px-4">
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
                Select Your Profile
              </h2>
              <p className="text-gray-600 text-center mb-6">
                Choose a demo profile to explore the candidate dashboard
              </p>
              <div className="space-y-4">
                {state.candidates.map((candidate) => (
                  <button
                    key={candidate.id}
                    onClick={() => handleLogin(candidate)}
                    className="w-full text-left p-4 border-2 border-gray-200 rounded-lg hover:border-primary-600 hover:bg-primary-50 transition-all"
                  >
                    <div className="flex items-center gap-4">
                      <div className="text-4xl">{candidate.profileImage}</div>
                      <div>
                        <h3 className="font-bold text-lg text-gray-800">
                          {candidate.name}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {candidate.location}
                        </p>
                        <p className="text-sm text-gray-500">
                          {candidate.skills.slice(0, 3).join(", ")}
                        </p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
              <button
                onClick={() => setShowLogin(false)}
                className="mt-6 w-full py-2 text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      ) : showLogin && window.selectedRole === "employer" ? (
        <div className="flex-1 bg-gray-50 py-12 px-4">
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
                Employer Login
              </h2>
              <p className="text-gray-600 text-center mb-6">
                Continue as demo employer
              </p>
              <button
                onClick={handleEmployerLogin}
                className="w-full py-4 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-bold text-lg"
              >
                Continue to Employer Dashboard
              </button>
              <button
                onClick={() => setShowLogin(false)}
                className="mt-4 w-full py-2 text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      ) : ( */}
      <>
        <HeroSection onRoleSelect={handleRoleSelect} />

        <div className="flex-1 bg-gray-50 py-12 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="text-4xl mb-4">🎯</div>
                <h3 className="text-xl font-bold mb-2">Smart Matching</h3>
                <p className="text-gray-600">
                  Our algorithm finds the best internship matches based on your
                  skills
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="text-4xl mb-4">📚</div>
                <h3 className="text-xl font-bold mb-2">Experience Cards</h3>
                <p className="text-gray-600">
                  Document and showcase your learning journey digitally
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="text-4xl mb-4">🚀</div>
                <h3 className="text-xl font-bold mb-2">Career Growth</h3>
                <p className="text-gray-600">
                  Build connections and advance your career in Norway
                </p>
              </div>
            </div>
          </div>
        </div>
      </>
      {/* )} */}

      <Footer />
    </div>
  );
}
