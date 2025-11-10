import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { getMatchingCandidates } from '../utils/matcher';
import Navbar from '../components/Layout/Navbar';
import Footer from '../components/Layout/Footer';
import ProjectCard from '../components/UI/ProjectCard';
import ProfileCard from '../components/UI/ProfileCard';

export default function EmployerDashboard() {
  const navigate = useNavigate();
  const { state, dispatch } = useApp();

  if (!state.currentUser) {
    navigate('/');
    return null;
  }

  const employer = state.currentUser;
  const myProjects = state.projects.filter(
    p => p.employerId === employer.id
  );

  const handleAssignCandidate = (projectId, candidateId) => {
    dispatch({
      type: 'ASSIGN_INTERNSHIP',
      payload: { projectId, candidateId },
    });
    alert('Candidate assigned successfully!');
  };

  const showMatchingCandidates = (project) => {
    const matches = getMatchingCandidates(project, state.candidates, 5);
    return matches;
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      
      <div className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              Welcome, {employer.companyName}! 🏢
            </h1>
            <p className="text-gray-600 mt-2">
              Manage your internship postings and candidates
            </p>
          </div>
          <button
            onClick={() => navigate('/employer/projects/new')}
            className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium"
          >
            + Post New Internship
          </button>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Active Projects ({myProjects.length})
          </h2>
          
          {myProjects.length > 0 ? (
            <div className="space-y-6">
              {myProjects.map((project) => {
                const assignedCandidate = project.assignedTo 
                  ? state.candidates.find(c => c.id === project.assignedTo)
                  : null;
                const candidateMatches = showMatchingCandidates(project);
                
                return (
                  <div key={project.id} className="bg-white rounded-lg shadow-md p-6">
                    <ProjectCard project={project} />
                    
                    {assignedCandidate ? (
                      <div className="mt-4 p-4 bg-green-50 border-2 border-green-500 rounded-lg">
                        <h3 className="font-semibold text-gray-800 mb-2">
                          Assigned Candidate:
                        </h3>
                        <ProfileCard candidate={assignedCandidate} />
                      </div>
                    ) : (
                      <div className="mt-4">
                        <h3 className="font-semibold text-gray-800 mb-3">
                          Top Matching Candidates:
                        </h3>
                        <div className="space-y-3">
                          {candidateMatches.slice(0, 3).map((match) => (
                            <div key={match.candidate.id} className="flex items-center justify-between bg-gray-50 p-4 rounded-lg">
                              <ProfileCard candidate={match.candidate} />
                              <button
                                onClick={() => handleAssignCandidate(project.id, match.candidate.id)}
                                className="ml-4 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium"
                              >
                                Assign
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-md p-12 text-center">
              <div className="text-6xl mb-4">📋</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                No projects yet
              </h3>
              <p className="text-gray-600 mb-6">
                Create your first internship posting
              </p>
              <button
                onClick={() => navigate('/employer/projects/new')}
                className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium"
              >
                Post New Internship
              </button>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}

