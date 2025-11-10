# Quick Start Guide

## Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at `http://localhost:5173`

## Demo Credentials

### As a Candidate
1. Click "I am a Candidate"
2. Select one of the demo profiles:
   - **Sarah Ahmed** - Already has an active internship
   - **Fatima Ali** - Available for new opportunities
   - **Aisha Hassan** - Available for new opportunities

### As an Employer
1. Click "I am an Employer"
2. Login as **TechNord AS** (demo company)
3. View existing projects or create new ones

## Key Features to Try

### For Candidates:
- Browse recommended internships on the Dashboard
- Use the matching page to see all opportunities with match scores
- Edit your profile to update skills and preferences
- View your Experience Card to see completed internships

### For Employers:
- Post a new internship project
- View matching candidates for each project
- Assign candidates to projects
- Track all active projects

## Project Structure

### Data Files
All data is stored in JSON files in `src/data/`:
- Modify these files to add/edit candidates, projects, or employers
- Changes reflect immediately in the app (hot reload)

### Components
- **UI Components**: ProfileCard, ProjectCard, MatchBadge, ExperienceCard
- **Layout Components**: Navbar, Footer, HeroSection
- **Pages**: All major views are in `src/pages/`

### Matching Algorithm
The matching is done in `src/utils/matcher.js`:
- Calculates skill overlap between candidates and projects
- Returns a percentage match (0-100%)
- Uses case-insensitive skill matching

## Troubleshooting

If you encounter issues:

1. **Module not found errors**: Run `npm install` again
2. **Port already in use**: Change the port in vite.config.js or kill the process on port 5173
3. **Styles not loading**: Ensure TailwindCSS is properly installed and configured

## Next Steps

To extend this project:
1. Add authentication system
2. Implement API backend
3. Add real database integration
4. Enhance matching algorithm with more factors
5. Add PDF export for Experience Cards
6. Implement email notifications
7. Add more filtering and search options


