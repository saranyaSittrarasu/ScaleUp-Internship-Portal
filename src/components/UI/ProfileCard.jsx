export default function ProfileCard({ candidate }) {
  console.log("Rendering ProfileCard for candidate:", candidate);
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-start gap-4">
        <div className="text-5xl"><img src={candidate.profileImage} alt={candidate.profileImage} className="w-20 h-20 rounded-full" /></div>
        <div className="flex-1">
          <h3 className="text-xl font-bold text-gray-800">{candidate.name}</h3>
          <p className="text-gray-600">{candidate.location}</p>
          <a href={`${candidate.LinkedIn}`} className="text-primary-600 hover:text-primary-700 transition-colors">LinkedIn</a>
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
        </div>
      </div>
    </div>
  );
}
