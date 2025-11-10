# Internship Hub – From Learning to Experience

A modern web application connecting Scale Up graduates with Norwegian companies for meaningful internship experiences.

## 🌟 Features

### For Candidates
- **Smart Matching**: Find internships based on skill compatibility
- **Profile Management**: Edit your skills, location, and language levels
- **Experience Cards**: Digital documentation of completed internships
- **Dashboard**: View recommended opportunities and current assignments

### For Employers
- **Post Internships**: Create and manage internship openings
- **Candidate Matching**: Find suitable candidates for your projects
- **Project Management**: Assign candidates and track active projects

## 🛠️ Tech Stack

- **Frontend**: React 18
- **Styling**: TailwindCSS
- **Routing**: React Router v6
- **Animations**: Framer Motion
- **State Management**: React Context API
- **Build Tool**: Vite

## 📦 Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

## 📁 Project Structure

```
src/
├── components/
│   ├── Layout/          # Navbar, Footer, HeroSection
│   └── UI/              # Reusable UI components
├── context/             # Global state management
├── data/                # JSON data files
├── pages/               # Page components
├── utils/               # Utility functions (matching algorithm)
├── App.jsx              # Main app with routing
└── main.jsx             # Entry point
```

## 🚀 Getting Started

### As a Candidate
1. Click "I am a Candidate" on the landing page
2. Select a demo profile to login
3. Explore your dashboard to see recommended internships
4. Use the "Find Internships" page to see all available opportunities
5. Check your "Experience Card" to view completed internships

### As an Employer
1. Click "I am an Employer" on the landing page
2. Continue to the employer dashboard
3. Click "Post New Internship" to create a new internship
4. View matching candidates for each project
5. Assign candidates to projects

## 📝 Data Structure

The application uses local JSON files for data storage:
- `candidates.json` - Candidate profiles
- `projects.json` - Internship postings
- `employers.json` - Company information
- `feedback.json` - Experience records

## 🎨 Features in Detail

### Smart Matching Algorithm
The matching algorithm calculates compatibility based on:
- Required skills overlap
- Location preferences
- Work type (remote/on-site)
- Project duration

### Experience Cards
Digital documentation includes:
- Company and role information
- Skills applied
- Feedback and ratings
- Duration and dates

## 🏗️ Build for Production

```bash
npm run build
```

## 📄 License

MIT License


