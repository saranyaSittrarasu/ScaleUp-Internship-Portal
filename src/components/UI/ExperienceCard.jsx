import React from 'react';

export default function ExperienceCard({ experience }) {
  return (
    <div className="bg-gradient-to-r from-primary-50 to-white rounded-lg shadow-md p-6 border-l-4 border-primary-500">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="text-xl font-bold text-gray-800">{experience.role}</h3>
          <p className="text-gray-600 font-medium">{experience.company}</p>
        </div>
        <div className="text-sm text-gray-500">
          {experience.startDate} - {experience.endDate}
        </div>
      </div>
      
      <div className="mb-3">
        <p className="text-sm font-semibold text-gray-700 mb-2">Skills Applied:</p>
        <div className="flex flex-wrap gap-2">
          {experience.skillsApplied?.map((skill, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
      
      <div className="bg-white p-4 rounded-lg border border-gray-200">
        <p className="text-gray-700 mb-3">{experience.feedback}</p>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">Rating:</span>
          <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
              <span key={i} className={i < experience.rating ? 'text-yellow-400' : 'text-gray-300'}>
                ⭐
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}


