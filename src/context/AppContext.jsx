import React, { createContext, useContext, useReducer, useEffect } from 'react';
import candidatesData from '../data/candidates.json';
import projectsData from '../data/projects.json';
import employersData from '../data/employers.json';
import feedbackData from '../data/feedback.json';

const AppContext = createContext();

const initialState = {
  candidates: [],
  projects: [],
  employers: [],
  feedback: [],
  currentUser: null,
  userRole: null, // 'candidate' or 'employer'
  isLoading: true,
};

function appReducer(state, action) {
  switch (action.type) {
    case 'LOAD_DATA':
      return {
        ...state,
        candidates: action.payload.candidates,
        projects: action.payload.projects,
        employers: action.payload.employers,
        feedback: action.payload.feedback,
        isLoading: false,
      };
    case 'SET_USER':
      return {
        ...state,
        currentUser: action.payload.user,
        userRole: action.payload.role,
      };
    case 'LOGOUT':
      return {
        ...state,
        currentUser: null,
        userRole: null,
      };
    case 'UPDATE_CANDIDATE':
      return {
        ...state,
        candidates: state.candidates.map(c =>
          c.id === action.payload.id ? { ...c, ...action.payload.data } : c
        ),
      };
    case 'ADD_PROJECT':
      return {
        ...state,
        projects: [...state.projects, action.payload],
      };
    case 'ASSIGN_INTERNSHIP':
      return {
        ...state,
        projects: state.projects.map(p =>
          p.id === action.payload.projectId
            ? { ...p, assignedTo: action.payload.candidateId }
            : p
        ),
        candidates: state.candidates.map(c =>
          c.id === action.payload.candidateId
            ? { ...c, currentInternship: action.payload.projectId }
            : c
        ),
      };
    default:
      return state;
  }
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  useEffect(() => {
    // Load data from JSON files
    dispatch({
      type: 'LOAD_DATA',
      payload: {
        candidates: candidatesData,
        projects: projectsData,
        employers: employersData,
        feedback: feedbackData,
      },
    });
  }, []);

  // Persist data to localStorage
  useEffect(() => {
    if (!state.isLoading) {
      localStorage.setItem('internshipHubData', JSON.stringify(state));
    }
  }, [state]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
}


