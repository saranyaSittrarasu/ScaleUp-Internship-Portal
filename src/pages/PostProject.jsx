import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Layout/Navbar";
import Footer from "../components/Layout/Footer";

export default function PostProject() {
  const navigate = useNavigate();
  const storedEmployer = localStorage.getItem("employer");
  const employer = storedEmployer ? JSON.parse(storedEmployer) : null;

  const [formData, setFormData] = useState({
    title: "",
    summary: "",
    description: "",
    requiredSkills: [],
    responsibilities: "",
    requirements: "",
    benefits: "",
    durationWeeks: 12,
    startDate: "",
    endDate: "",
    timeCommitment: "20 hours per week",
    location: "",
    remote: true,
    teamSize: 5,
    collaboration: "",
    mentorName: "",
    mentorRole: "",
    mentorExperience: "",
    contactEmail: employer?.contact_email || employer?.email || "",
  });

  const [newSkill, setNewSkill] = useState("");

  if (!employer) {
    navigate("/employer/login");
    return null;
  }

  const splitMultilineField = (value) =>
    value
      .split("\n")
      .map((item) => item.trim())
      .filter(Boolean);

  const handleSubmit = (e) => {
    e.preventDefault();

    const responsibilityList = splitMultilineField(formData.responsibilities);
    const requirementList = splitMultilineField(formData.requirements);
    const benefitList = splitMultilineField(formData.benefits);

    const newInternship = {
      id: `custom-${Date.now()}-${Math.floor(Math.random() * 1_000_000)}`,
      position_overview: {
        title: formData.title,
        summary: formData.summary || formData.description,
      },
      duration: {
        start_date: formData.startDate || "TBD",
        end_date: formData.endDate || "TBD",
        total_duration: `${formData.durationWeeks} weeks`,
      },
      time_commitment: formData.timeCommitment || "20 hours per week",
      key_responsibilities: responsibilityList,
      requirements: requirementList,
      benefits: {
        what_you_will_gain: benefitList,
      },
      mentor: {
        name: formData.mentorName || employer?.ContactPerson || "Mentor",
        position: formData.mentorRole || "Hiring Manager",
        experience: formData.mentorExperience || "Experience shared during onboarding",
      },
      team: {
        team_size: Number(formData.teamSize) || 1,
        collaboration:
          formData.collaboration ||
          "Collaborate closely with our cross-functional team members",
      },
      skills: formData.requiredSkills,
      location: formData.location,
      remote: formData.remote,
      status: "Active",
      contact_email: formData.contactEmail || employer?.email,
      company: employer?.companyName,
      created_at: new Date().toISOString(),
    };

    const storedProjects = JSON.parse(localStorage.getItem("employerProjects") || "{}");
    const employerProjects = storedProjects[employer.id] || [];

    storedProjects[employer.id] = [...employerProjects, newInternship];
    localStorage.setItem("employerProjects", JSON.stringify(storedProjects));

    alert("Internship posted successfully!");
    navigate("/employer/dashboard");
  };

  const handleAddSkill = () => {
    if (newSkill.trim() && !formData.requiredSkills.includes(newSkill.trim())) {
      setFormData((prev) => ({
        ...prev,
        requiredSkills: [...prev.requiredSkills, newSkill.trim()],
      }));
      setNewSkill("");
    }
  };

  const handleRemoveSkill = (skill) => {
    setFormData((prev) => ({
      ...prev,
      requiredSkills: prev.requiredSkills.filter((s) => s !== skill),
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />

      <div className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Post New Internship</h1>
          <button
            onClick={() => navigate("/employer/dashboard")}
            className="text-gray-600 hover:text-gray-800"
          >
            ← Back to Dashboard
          </button>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-8 space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Internship title *
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g., Frontend Developer Internship"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Brief summary *
              </label>
              <input
                type="text"
                required
                value={formData.summary}
                onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                placeholder="One-line summary for candidates"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Full description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={4}
              placeholder="Describe the internship, responsibilities, and learning opportunities..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
            />
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Responsibilities (one per line)
              </label>
              <textarea
                value={formData.responsibilities}
                onChange={(e) =>
                  setFormData({ ...formData, responsibilities: e.target.value })
                }
                rows={4}
                placeholder="List responsibilities on new lines"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Requirements (one per line)
              </label>
              <textarea
                value={formData.requirements}
                onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                rows={4}
                placeholder="List requirements on new lines"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Benefits (one per line)
            </label>
            <textarea
              value={formData.benefits}
              onChange={(e) => setFormData({ ...formData, benefits: e.target.value })}
              rows={3}
              placeholder="Highlight the learning outcomes and perks"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Required skills *
            </label>
            <div className="flex flex-wrap gap-2 mb-3">
              {formData.requiredSkills.map((skill, index) => (
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
                onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), handleAddSkill())}
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

          <div className="grid gap-6 md:grid-cols-3">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Start date
              </label>
              <input
                type="date"
                value={formData.startDate}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                End date
              </label>
              <input
                type="date"
                value={formData.endDate}
                onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Duration (weeks) *
              </label>
              <input
                type="number"
                min={4}
                max={52}
                required
                value={formData.durationWeeks}
                onChange={(e) =>
                  setFormData({ ...formData, durationWeeks: Number(e.target.value) })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              />
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Location *
              </label>
              <input
                type="text"
                required
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                placeholder="e.g., Oslo, Norway"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Weekly time commitment *
              </label>
              <input
                type="text"
                required
                value={formData.timeCommitment}
                onChange={(e) => setFormData({ ...formData, timeCommitment: e.target.value })}
                placeholder="e.g., 20 hours per week"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Work type *
            </label>
            <div className="flex gap-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  checked={formData.remote}
                  onChange={() => setFormData({ ...formData, remote: true })}
                  className="mr-2"
                />
                Remote
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  checked={!formData.remote}
                  onChange={() => setFormData({ ...formData, remote: false })}
                  className="mr-2"
                />
                On-site
              </label>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Team size
              </label>
              <input
                type="number"
                min={1}
                value={formData.teamSize}
                onChange={(e) => setFormData({ ...formData, teamSize: Number(e.target.value) })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Collaboration style
              </label>
              <textarea
                value={formData.collaboration}
                onChange={(e) => setFormData({ ...formData, collaboration: e.target.value })}
                rows={3}
                placeholder="Explain how the intern will collaborate with your team"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              />
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Mentor name
              </label>
              <input
                type="text"
                value={formData.mentorName}
                onChange={(e) => setFormData({ ...formData, mentorName: e.target.value })}
                placeholder={employer?.ContactPerson || "Mentor name"}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Mentor role
              </label>
              <input
                type="text"
                value={formData.mentorRole}
                onChange={(e) => setFormData({ ...formData, mentorRole: e.target.value })}
                placeholder="e.g., Senior Developer"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Mentor experience
              </label>
              <input
                type="text"
                value={formData.mentorExperience}
                onChange={(e) =>
                  setFormData({ ...formData, mentorExperience: e.target.value })
                }
                placeholder="e.g., 5+ years"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Contact email *
            </label>
            <input
              type="email"
              required
              value={formData.contactEmail}
              onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
              placeholder="Where candidates can reach you"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
            />
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              className="flex-1 px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium"
            >
              Post internship
            </button>
            <button
              type="button"
              onClick={() => navigate("/employer/dashboard")}
              className="flex-1 px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>

      <Footer />
    </div>
  );
}
