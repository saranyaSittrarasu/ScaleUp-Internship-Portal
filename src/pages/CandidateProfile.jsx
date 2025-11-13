import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Layout/Navbar";
import Footer from "../components/Layout/Footer";
import candidatesData from "../data/candidates.json";

export default function CandidateProfile() {
  const navigate = useNavigate();
  const storedCandidate = localStorage.getItem("candidate");
  const currentUser = storedCandidate ? JSON.parse(storedCandidate) : null;
  const [isEditing, setIsEditing] = useState(false);

  const candidateProfile = useMemo(() => {
    if (!currentUser) return null;
    return (
      candidatesData.find(
        (profile) =>
          profile?.id === currentUser?.id ||
          profile?.email === currentUser?.email
      ) || currentUser
    );
  }, [currentUser]);

  const [formData, setFormData] = useState(() => ({
    name: candidateProfile?.name || "",
    email: candidateProfile?.email || "",
    location: candidateProfile?.location || "",
    skills: candidateProfile?.skills || [],
    norwegian: candidateProfile?.norwegian || "",
    english: candidateProfile?.english || "",
    bio: candidateProfile?.bio || "",
  }));

  const [newSkill, setNewSkill] = useState("");

  if (!currentUser) {
    navigate("/");
    return null;
  }

  const handleUpdate = () => {
    setIsEditing(false);
    alert("Profile updated successfully!");
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

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />

      <div className="flex-1 bg-gradient-to-br from-primary-50/70 via-white to-slate-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
          <div className="mb-10 flex flex-col gap-4 rounded-3xl bg-white/90 px-8 py-10 shadow-xl ring-1 ring-primary-100/60">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-sm uppercase font-semibold tracking-[0.3em] text-primary-500">
                Edit your profile
                </p>
                <h1 className="mt-3 text-3xl font-bold text-slate-900">
                Update your information.
                </h1>
                <p className="mt-3 max-w-2xl text-sm text-slate-600">
                A complete profile helps match you with the best internship opportunities from our partner companies.
                </p>
              </div>
              <button
                onClick={() => navigate("/candidate/dashboard")}
                className="inline-flex items-center justify-center rounded-2xl bg-primary-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-primary-600/30 transition hover:-translate-y-0.5 hover:bg-primary-700"
              >
                ← Back to dashboard
              </button>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-slate-900">My Profile</h1>
            <button
              onClick={() => setIsEditing((prev) => !prev)}
              className="rounded-2xl bg-primary-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-primary-600/30 transition hover:-translate-y-0.5 hover:bg-primary-700"
            >
              {isEditing ? "Cancel" : "Edit profile"}
            </button>
          </div>

          <div className="grid gap-8 lg:grid-cols-[1.2fr,0.8fr]">
            <div className="rounded-3xl bg-white px-8 py-10 shadow-xl ring-1 ring-slate-100 space-y-6">
              <div className="flex items-center gap-4">
                
                <div>
                  <p className="text-sm font-semibold uppercase tracking-wide text-primary-500">
                    {candidateProfile?.Role}
                  </p>
                  <p className="text-sm text-slate-500">
                    {candidateProfile?.location} • Norwegian{" "}
                    {candidateProfile?.norwegian} • English{" "}
                    {candidateProfile?.english}
                  </p>
                </div>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <ProfileField
                  label="Full name"
                  value={formData.name}
                  isEditing={isEditing}
                  onChange={(value) =>
                    setFormData({ ...formData, name: value })
                  }
                />
                <ProfileField
                  label="Email"
                  value={formData.email}
                  isEditing={isEditing}
                  inputType="email"
                  onChange={(value) =>
                    setFormData({ ...formData, email: value })
                  }
                />
                <ProfileField
                  label="Location"
                  value={formData.location}
                  isEditing={isEditing}
                  onChange={(value) =>
                    setFormData({ ...formData, location: value })
                  }
                />
                <ProfileSelect
                  label="Norwegian level"
                  value={formData.norwegian}
                  isEditing={isEditing}
                  options={["A1", "A2", "B1", "B2", "C1", "C2"]}
                  onChange={(value) =>
                    setFormData({ ...formData, norwegian: value })
                  }
                />
                <ProfileSelect
                  label="English level"
                  value={formData.english}
                  isEditing={isEditing}
                  options={["A1", "A2", "B1", "B2", "C1", "C2"]}
                  onChange={(value) =>
                    setFormData({ ...formData, english: value })
                  }
                />
              </div>

              <div>
                <label className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                  Bio
                </label>
                {isEditing ? (
                  <textarea
                    value={formData.bio}
                    onChange={(e) =>
                      setFormData({ ...formData, bio: e.target.value })
                    }
                    rows={4}
                    className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-700 shadow-sm focus:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-200"
                  />
                ) : (
                  <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                    {formData.bio}
                  </p>
                )}
              </div>

              <div>
                <label className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                  Skills snapshot
                </label>
                <div className="mt-3 flex flex-wrap gap-2">
                  {formData.skills.map((skill, index) => (
                    <span
                      key={`${skill}-${index}`}
                      className="inline-flex items-center gap-2 rounded-full bg-primary-100 px-4 py-1.5 text-sm font-medium text-primary-700"
                    >
                      {skill}
                      {isEditing && (
                        <button
                          onClick={() => handleRemoveSkill(skill)}
                          className="text-primary-500 hover:text-primary-700"
                        >
                          ×
                        </button>
                      )}
                    </span>
                  ))}
                </div>
                {isEditing && (
                  <div className="mt-4 flex gap-2">
                    <input
                      type="text"
                      value={newSkill}
                      onChange={(e) => setNewSkill(e.target.value)}
                      onKeyDown={(e) =>
                        e.key === "Enter" &&
                        (e.preventDefault(), handleAddSkill())
                      }
                      placeholder="Add a new skill"
                      className="flex-1 rounded-2xl border border-slate-200 px-4 py-2.5 text-sm text-slate-700 shadow-sm focus:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-200"
                    />
                    <button
                      onClick={handleAddSkill}
                      className="rounded-2xl bg-primary-600 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-primary-700"
                    >
                      Add
                    </button>
                  </div>
                )}
              </div>

              {isEditing && (
                <button
                  onClick={handleUpdate}
                  className="w-full rounded-2xl bg-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-600/30 transition hover:-translate-y-0.5 hover:bg-emerald-700"
                >
                  Update profile
                </button>
              )}
            </div>

            <aside className="space-y-6">
              <div className="rounded-3xl bg-white px-6 py-8 shadow-xl ring-1 ring-slate-100">
                <h2 className="text-lg font-semibold text-slate-900">
                  Completed internships
                </h2>
                <p className="mt-1 text-xs uppercase tracking-wide text-slate-400">
                  Highlights at a glance
                </p>
                <div className="mt-5 space-y-4">
                  {(candidateProfile?.Internship || [])
                    .filter((internship) => internship?.status === "Completed")
                    .map((internship, idx) => (
                      <div
                        key={`${internship?.position_overview?.title}-${idx}`}
                        className="rounded-2xl border border-slate-100 bg-slate-50/70 px-4 py-3"
                      >
                        <p className="text-sm font-semibold text-slate-800">
                          {internship?.position_overview?.title}
                        </p>
                        <p className="text-xs text-slate-500">
                          {internship?.company} •{" "}
                          {internship?.duration?.total_duration}
                        </p>
                      </div>
                    ))}
                </div>
                <button
                  onClick={() => navigate("/candidate/experience")}
                  className="mt-5 w-full rounded-2xl border border-primary-200 bg-primary-50 px-4 py-2 text-sm font-semibold text-primary-700 transition hover:border-primary-300 hover:bg-primary-100"
                >
                  Open experience card
                </button>
              </div>
            </aside>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

const ProfileField = ({
  label,
  value,
  isEditing,
  onChange,
  inputType = "text",
}) => (
  <div>
    <label className="text-sm font-semibold uppercase tracking-wide text-slate-500">
      {label}
    </label>
    {isEditing ? (
      <input
        type={inputType}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-2.5 text-sm text-slate-700 shadow-sm focus:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-200"
      />
    ) : (
      <p className="mt-2 text-sm text-slate-700">{value}</p>
    )}
  </div>
);

const ProfileSelect = ({ label, value, options, isEditing, onChange }) => (
  <div>
    <label className="text-sm font-semibold uppercase tracking-wide text-slate-500">
      {label}
    </label>
    {isEditing ? (
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-2.5 text-sm text-slate-700 shadow-sm focus:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-200"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    ) : (
      <p className="mt-2 text-sm text-slate-700">{value}</p>
    )}
  </div>
);
