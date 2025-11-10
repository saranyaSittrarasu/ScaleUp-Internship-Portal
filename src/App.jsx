import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';

// Pages
import LandingPage from './pages/LandingPage';
import CandidateDashboard from './pages/CandidateDashboard';
import CandidateProfile from './pages/CandidateProfile';
import CandidateMatching from './pages/CandidateMatching';
import CandidateExperience from './pages/CandidateExperience';
import EmployerDashboard from './pages/EmployerDashboard';
import PostProject from './pages/PostProject';

function App() {
  return (
    <AppProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          
          {/* Candidate Routes */}
          <Route path="/candidate/dashboard" element={<CandidateDashboard />} />
          <Route path="/candidate/profile" element={<CandidateProfile />} />
          <Route path="/candidate/matching" element={<CandidateMatching />} />
          <Route path="/candidate/experience" element={<CandidateExperience />} />
          
          {/* Employer Routes */}
          <Route path="/employer/dashboard" element={<EmployerDashboard />} />
          <Route path="/employer/projects/new" element={<PostProject />} />
        </Routes>
      </Router>
    </AppProvider>
  );
}

export default App;


