import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { getTopMatches } from '../utils/matcher';
import Navbar from '../components/Layout/Navbar';
import Footer from '../components/Layout/Footer';
import ProfileCard from '../components/UI/ProfileCard';
import ProjectCard from '../components/UI/ProjectCard';

export default function CandidateDashboard() {
  const navigate = useNavigate();
  const { state } = useApp();

  if (!state.currentUser) {
    navigate('/');
    return null;
  }

  const candidate = state.currentUser;
  const recommendedProjects = getTopMatches(candidate, state.projects, 3);

  const currentInternship = state.projects.find(
    p => p.assignedTo === candidate.id
  );

  const handleApply = (project) => {
    alert(`Application submitted for ${project.title}!`);
  };

  const handleViewDetails = (project) => {
    // Could navigate to a detailed project page
    alert(`Project details for ${project.title}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      
      <div className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">
          Welcome back, {candidate.name}! 👋
        </h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-1">
            <ProfileCard candidate={candidate} />
            
            <div className="mt-6 bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">
                Quick Actions
              </h2>
              <div className="space-y-3">
                <button
                  onClick={() => navigate('/candidate/profile')}
                  className="w-full text-left px-4 py-3 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors font-medium"
                >
                  📝 Edit Profile
                </button>
                <button
                  onClick={() => navigate('/candidate/matching')}
                  className="w-full text-left px-4 py-3 bg-primary-100 text-primary-700 rounded-lg hover:bg-primary-200 transition-colors font-medium"
                >
                  🔍 Find Internships
                </button>
                <button
                  onClick={() => navigate('/candidate/experience')}
                  className="w-full text-left px-4 py-3 bg-primary-100 text-primary-700 rounded-lg hover:bg-primary-200 transition-colors font-medium"
                >
                  📚 View Experience Card
                </button>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Current Internship */}
            {currentInternship && (
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                  Current Internship
                </h2>
                <div className="bg-green-50 border-2 border-green-500 rounded-lg p-6">
                  <ProjectCard
                    project={currentInternship}
                    onViewDetails={handleViewDetails}
                  />
                </div>
              </div>
            )}

            {/* Recommended Projects */}
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Recommended for You
              </h2>
              <p className="text-gray-600 mb-4">
                Based on your skills profile
              </p>
              <div className="space-y-4">
                {recommendedProjects.map((match) => (
                  <ProjectCard
                    key={match.project.id}
                    project={match.project}
                    candidate={candidate}
                    onApply={handleApply}
                    onViewDetails={handleViewDetails}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}


