import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AppProvider } from "./context/AppContext";

// Pages
import LandingPage from "./pages/LandingPage";
import CandidateDashboard from "./pages/CandidateDashboard";
import CandidateProfile from "./pages/CandidateProfile";
import CandidateMatching from "./pages/CandidateMatching";
import CandidateExperience from "./pages/CandidateExperience";
import EmployerDashboard from "./pages/EmployerDashboard";
import PostProject from "./pages/PostProject";
import CandidateLogin from "./pages/CandidateLogin";
import EmployerLogin from "./pages/EmployerLogin";
import CandidateOnboarding from "./pages/CandidateOnboarding";
import EmployerSignup from "./pages/EmployerSignup";
import CandidateInternships from "./pages/CandidateInternships";
import CandidateSoftSkills from "./pages/CandidateSoftSkills";

function App() {
  return (
    <AppProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />

          {/* Candidate Routes */}
          <Route path="/candidate/login" element={<CandidateLogin />} />
          <Route
            path="/candidate/onboarding"
            element={<CandidateOnboarding />}
          />
          <Route path="/candidate/dashboard" element={<CandidateDashboard />} />
          <Route path="/candidate/profile" element={<CandidateProfile />} />
          <Route path="/candidate/matching" element={<CandidateMatching />} />
          <Route
            path="/candidate/experience"
            element={<CandidateExperience />}
          />
          <Route
            path="/candidate/internships"
            element={<CandidateInternships />}
          />
          <Route
            path="/candidate/soft-skills"
            element={<CandidateSoftSkills />}
          />

          {/* Employer Routes */}
          <Route path="/employer/login" element={<EmployerLogin />} />
          <Route path="/employer/signup" element={<EmployerSignup />} />
          <Route path="/employer/dashboard" element={<EmployerDashboard />} />
          <Route path="/employer/projects/new" element={<PostProject />} />
        </Routes>
      </Router>
    </AppProvider>
  );
}

export default App;
