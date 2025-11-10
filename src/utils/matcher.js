/**
 * Matching algorithm to calculate compatibility between candidates and projects
 * Returns a match percentage (0-100) based on skill overlap
 */

export const calculateMatch = (candidate, project) => {
  if (!candidate.skills || !project.requiredSkills) {
    return 0;
  }

  // Convert skills to lowercase for comparison
  const candidateSkills = candidate.skills.map(skill => skill.toLowerCase());
  const requiredSkills = project.requiredSkills.map(skill => skill.toLowerCase());

  // Find matching skills
  const matches = requiredSkills.filter(skill => 
    candidateSkills.includes(skill)
  );

  // Calculate match percentage
  const matchPercentage = (matches.length / requiredSkills.length) * 100;

  return Math.round(matchPercentage);
};

/**
 * Get top matches for a candidate
 * Returns projects sorted by match percentage (descending)
 */
export const getTopMatches = (candidate, projects, limit = 5) => {
  const matches = projects
    .map(project => ({
      project,
      matchPercentage: calculateMatch(candidate, project)
    }))
    .sort((a, b) => b.matchPercentage - a.matchPercentage)
    .slice(0, limit);

  return matches;
};

/**
 * Get matching candidates for a project
 */
export const getMatchingCandidates = (project, candidates, limit = 5) => {
  const matches = candidates
    .map(candidate => ({
      candidate,
      matchPercentage: calculateMatch(candidate, project)
    }))
    .sort((a, b) => b.matchPercentage - a.matchPercentage)
    .slice(0, limit);

  return matches;
};


