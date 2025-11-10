import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import Navbar from '../components/Layout/Navbar';
import Footer from '../components/Layout/Footer';
import ExperienceCard from '../components/UI/ExperienceCard';

export default function CandidateExperience() {
  const navigate = useNavigate();
  const { state } = useApp();

  if (!state.currentUser) {
    navigate('/');
    return null;
  }

  const candidate = state.currentUser;
  const userExperiences = state.feedback.filter(
    f => f.candidateId === candidate.id
  );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      
      <div className="flex-1 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              My Experience Card 📚
            </h1>
            <p className="text-gray-600 mt-2">
              Digital record of your internship journey
            </p>
          </div>
        </div>

        {userExperiences.length > 0 ? (
          <div className="space-y-6">
            {userExperiences.map((experience) => (
              <ExperienceCard key={experience.id} experience={experience} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <div className="text-6xl mb-4">📝</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">
              No experiences yet
            </h3>
            <p className="text-gray-600 mb-6">
              Complete an internship to see it reflected here
            </p>
            <button
              onClick={() => navigate('/candidate/matching')}
              className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium"
            >
              Find Internships
            </button>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}


