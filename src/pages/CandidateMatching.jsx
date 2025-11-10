import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { getTopMatches } from '../utils/matcher';
import Navbar from '../components/Layout/Navbar';
import Footer from '../components/Layout/Footer';
import ProjectCard from '../components/UI/ProjectCard';

export default function CandidateMatching() {
  const navigate = useNavigate();
  const { state } = useApp();

  if (!state.currentUser) {
    navigate('/');
    return null;
  }

  const candidate = state.currentUser;
  const allMatches = getTopMatches(candidate, state.projects, 10);

  const handleApply = (project) => {
    alert(`Application submitted for ${project.title} at ${project.company}!`);
  };

  const handleViewDetails = (project) => {
    alert(`Project: ${project.title}\nCompany: ${project.company}\nDescription: ${project.description}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      
      <div className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Find Your Perfect Internship 🎯
        </h1>
        <p className="text-gray-600 mb-8">
          Discover opportunities matched to your skills and interests
        </p>

        <div className="space-y-6">
          {allMatches.map((match, index) => (
            <ProjectCard
              key={match.project.id}
              project={match.project}
              candidate={candidate}
              onApply={handleApply}
              onViewDetails={handleViewDetails}
            />
          ))}
        </div>

        {allMatches.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600">No internships found at the moment. Check back later!</p>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}

