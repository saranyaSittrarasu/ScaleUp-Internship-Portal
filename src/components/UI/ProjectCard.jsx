import React from 'react';
import { calculateMatch } from '../../utils/matcher';
import MatchBadge from './MatchBadge';

export default function ProjectCard({ project, candidate = null, onApply, onViewDetails }) {
  const matchPercentage = candidate ? calculateMatch(candidate, project) : null;

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-bold text-gray-800">{project.title}</h3>
          <p className="text-gray-600 font-medium">{project.company}</p>
        </div>
        {matchPercentage !== null && (
          <MatchBadge percentage={matchPercentage} />
        )}
      </div>
      
      <p className="text-gray-600 mb-4">{project.description}</p>
      
      <div className="mb-4">
        <p className="text-sm font-semibold text-gray-700 mb-2">Required Skills:</p>
        <div className="flex flex-wrap gap-2">
          {project.requiredSkills?.map((skill, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
      
      <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
        <span>📍 {project.location}</span>
        <span>⏱️ {project.duration} weeks</span>
        <span>{project.remote ? '🏠 Remote' : '🏢 On-site'}</span>
      </div>
      
      <div className="flex gap-3">
        {onViewDetails && (
          <button
            onClick={() => onViewDetails(project)}
            className="flex-1 px-4 py-2 border-2 border-primary-600 text-primary-600 rounded-lg hover:bg-primary-50 transition-colors font-medium"
          >
            View Details
          </button>
        )}
        {onApply && (
          <button
            onClick={() => onApply(project)}
            className="flex-1 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium"
          >
            Apply
          </button>
        )}
      </div>
    </div>
  );
}


