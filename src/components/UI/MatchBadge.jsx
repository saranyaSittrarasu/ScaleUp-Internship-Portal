import React from 'react';

export default function MatchBadge({ percentage }) {
  const getColor = () => {
    if (percentage >= 75) return 'bg-green-500';
    if (percentage >= 50) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getText = () => {
    if (percentage >= 75) return 'Excellent Match!';
    if (percentage >= 50) return 'Good Match';
    return 'Consider Learning';
  };

  return (
    <div className="flex flex-col items-end">
      <div className={`px-4 py-2 rounded-lg text-white font-bold ${getColor()}`}>
        {percentage}% Match
      </div>
      <p className="text-xs text-gray-600 mt-1">{getText()}</p>
    </div>
  );
}


