import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import Navbar from "../components/Layout/Navbar";
import Footer from "../components/Layout/Footer";

export default function CandidateOnboarding() {
  const navigate = useNavigate();
  const { state, dispatch } = useApp();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    linkedinUrl: "",
    experience: "",
    education: "",
    skills: [],
    norwegianLevel: "A1",
    courses: "",
    certification: "",
    photos: null,
    resume: null,
  });
  const [newSkill, setNewSkill] = useState("");
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, photos: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleResumeUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.type !== "application/pdf") {
      setError("Please upload a PDF file");
      return;
    }

    setUploading(true);
    setError("");

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("resume", file);

      const response = await fetch("http://localhost:5000/api/parse-resume", {
        method: "POST",
        body: formDataToSend,
      });

      if (!response.ok) {
        throw new Error("Failed to parse resume");
      }

      const data = await response.json();

      // Auto-fill fields from parsed resume
      setFormData((prev) => ({
        ...prev,
        name: data.name || prev.name,
        email: data.email || prev.email,
        linkedinUrl: data.linkedin || prev.linkedinUrl,
        experience: data.experience || prev.experience,
        education: data.education || prev.education,
        skills:
          data.skills && data.skills.length > 0 ? data.skills : prev.skills,
        courses: data.courses || prev.courses,
        certification: data.certifications || prev.certification,
        resume: file.name,
      }));
    } catch (err) {
      console.error("Error parsing resume:", err);
      setError("Failed to parse resume. Please fill the form manually.");
    } finally {
      setUploading(false);
    }
  };

  const handleAddSkill = () => {
    if (newSkill.trim() && !formData.skills.includes(newSkill.trim())) {
      setFormData({
        ...formData,
        skills: [...formData.skills, newSkill.trim()],
      });
      setNewSkill("");
    }
  };

  const handleRemoveSkill = (skill) => {
    setFormData({
      ...formData,
      skills: formData.skills.filter((s) => s !== skill),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    // Validation
    if (!formData.name || !formData.email || !formData.password) {
      setError("Please fill in all required fields (Name, Email, Password)");
      return;
    }

    // Create/update candidate profile
    // const candidateData = {
    //   id: (state.currentUser && state.currentUser.id) || Date.now(),
    //   username: formData.email.split("@")[0], // Use email prefix as username
    //   name: formData.name,
    //   email: formData.email,
    //   password: formData.password,
    //   linkedinUrl: formData.linkedinUrl,
    //   experience: formData.experience,
    //   education: formData.education,
    //   skills: formData.skills,
    //   norwegian: formData.norwegianLevel,
    //   norwegianLevel: formData.norwegianLevel,
    //   english: "C1", // Default
    //   courses: formData.courses,
    //   certification: formData.certification,
    //   photos: formData.photos,
    //   resume: formData.resume,
    //   location: "",
    //   bio: formData.experience || "", // Use experience as initial bio
    //   about: formData.experience || "",
    //   profileImage: formData.photos || "👤",
    //   profileCompleted: true,
    // };

    // // Update context
    // dispatch({
    //   type: "SET_USER",
    //   payload: {
    //     user: candidateData,
    //     role: "candidate",
    //   },
    // });

    // dispatch({
    //   type: "UPDATE_CANDIDATE",
    //   payload: {
    //     id: candidateData.id,
    //     data: candidateData,
    //   },
    // });

    // alert("Profile completed successfully!");
    navigate("/candidate/dashboard");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />

      <div className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
            Complete Your Profile
          </h2>

          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Resume Upload */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Upload Resume (PDF) - We'll extract your details automatically
              </label>
              <input
                type="file"
                accept="application/pdf"
                onChange={handleResumeUpload}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                disabled={uploading}
              />
              {uploading && (
                <p className="mt-2 text-sm text-gray-600">Parsing resume...</p>
              )}
            </div>

            {/* Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email ID *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Password *
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                required
              />
            </div>

            {/* LinkedIn URL */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                LinkedIn URL
              </label>
              <input
                type="url"
                name="linkedinUrl"
                value={formData.linkedinUrl}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                placeholder="https://linkedin.com/in/yourprofile"
              />
            </div>

            {/* Experience */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Experience
              </label>
              <textarea
                name="experience"
                value={formData.experience}
                onChange={handleInputChange}
                rows="4"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                placeholder="Describe your work experience..."
              />
            </div>

            {/* Education */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Education
              </label>
              <textarea
                name="education"
                value={formData.education}
                onChange={handleInputChange}
                rows="4"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                placeholder="Describe your educational background..."
              />
            </div>

            {/* Skills */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Skills
              </label>
              <div className="flex flex-wrap gap-2 mb-3">
                {formData.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="flex items-center gap-2 px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium"
                  >
                    {skill}
                    <button
                      type="button"
                      onClick={() => handleRemoveSkill(skill)}
                      className="text-red-600 hover:text-red-800"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  onKeyPress={(e) =>
                    e.key === "Enter" && (e.preventDefault(), handleAddSkill())
                  }
                  placeholder="Add skill"
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                />
                <button
                  type="button"
                  onClick={handleAddSkill}
                  className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
                >
                  Add
                </button>
              </div>
            </div>

            {/* Norwegian Level */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Norwegian Level
              </label>
              <select
                name="norwegianLevel"
                value={formData.norwegianLevel}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              >
                <option value="A1">A1</option>
                <option value="A2">A2</option>
                <option value="B1">B1</option>
                <option value="B2">B2</option>
                <option value="C1">C1</option>
                <option value="C2">C2</option>
              </select>
            </div>

            {/* Courses */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Courses
              </label>
              <textarea
                name="courses"
                value={formData.courses}
                onChange={handleInputChange}
                rows="3"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                placeholder="List relevant courses..."
              />
            </div>

            {/* Certification */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Certification
              </label>
              <textarea
                name="certification"
                value={formData.certification}
                onChange={handleInputChange}
                rows="3"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                placeholder="List your certifications..."
              />
            </div>

            {/* Photos */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Profile Photo
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              />
              {formData.photos && (
                <img
                  src={formData.photos}
                  alt="Profile"
                  className="mt-2 w-32 h-32 object-cover rounded-lg"
                />
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-bold text-lg"
            >
              Complete Profile
            </button>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  );
}
