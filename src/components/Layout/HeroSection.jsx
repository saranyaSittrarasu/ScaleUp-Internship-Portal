import React from 'react';
import { motion } from 'framer-motion';

export default function HeroSection({ onRoleSelect }) {
  return (
    <div className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-20 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl font-bold mb-6"
        >
          Internship Hub
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-2xl mb-4"
        >
          From Learning to Experience
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-lg text-primary-100 mb-12 max-w-2xl mx-auto"
        >
          Bridging skills & work experience for women in Norway. Connect with innovative
          companies and build your career through meaningful internships.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-6 justify-center items-center"
        >
          <button
            onClick={() => onRoleSelect('candidate')}
            className="px-8 py-4 bg-white text-primary-600 rounded-lg font-bold text-lg hover:bg-primary-50 transition-all transform hover:scale-105 shadow-lg"
          >
            I am a Candidate 👩‍💼
          </button>
          <button
            onClick={() => onRoleSelect('employer')}
            className="px-8 py-4 bg-primary-500 text-white rounded-lg font-bold text-lg hover:bg-primary-400 transition-all transform hover:scale-105 shadow-lg border-2 border-white"
          >
            I am an Employer 🏢
          </button>
        </motion.div>
      </div>
    </div>
  );
}

