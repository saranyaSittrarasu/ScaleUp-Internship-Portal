import React from 'react';

export default function ProfileCard({ candidate, showAction = false, onAction }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-start gap-4">
        <div className="text-5xl">{candidate.profileImage || '👤'}</div>
        <div className="flex-1">
          <h3 className="text-xl font-bold text-gray-800">{candidate.name}</h3>
          <p className="text-gray-600">{candidate.location}</p>
          {candidate.bio && (
            <p className="text-sm text-gray-500 mt-2">{candidate.bio}</p>
          )}
          <div className="mt-4">
            <div className="flex flex-wrap gap-2">
              {candidate.skills?.slice(0, 5).map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
          <div className="mt-3 flex gap-4 text-sm text-gray-600">
            <span>🇳🇴 Norwegian: {candidate.norwegian}</span>
            <span>🇬🇧 English: {candidate.english}</span>
          </div>
          {showAction && onAction && (
            <button
              onClick={() => onAction(candidate)}
              className="mt-4 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            >
              View Profile
            </button>
          )}
        </div>
      </div>
    </div>
  );
}


