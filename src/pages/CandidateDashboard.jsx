import React, { useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Layout/Navbar";
import Footer from "../components/Layout/Footer";
import ProfileCard from "../components/UI/ProfileCard";
import candidatesData from "../data/candidates.json";
import InternshipDetailModal from "../components/UI/InternshipDetailModal";

const statusStyles = {
  "In-progress": "bg-amber-100 text-amber-700 border border-amber-200",
  "In Progress": "bg-amber-100 text-amber-700 border border-amber-200",
  Completed: "bg-emerald-100 text-emerald-700 border border-emerald-200",
  Active: "bg-indigo-100 text-indigo-700 border border-indigo-200",
  "Not Started": "bg-slate-100 text-slate-700 border border-slate-200",
  "Not-Started": "bg-slate-100 text-slate-700 border border-slate-200",
  Locked: "bg-slate-200 text-slate-600 border border-slate-300",
};

const getInternshipKey = (internship) =>
  [
    internship?.position_overview?.title,
    internship?.contact_email,
    internship?.duration?.start_date,
  ]
    .filter(Boolean)
    .join("|");

const InternshipCard = ({
  internship,
  matchScore,
  onViewDetails,
  onApply,
  isWaiting = false,
  isLoading = false,
}) => {
  const status = internship?.status || "Active";
  const badgeClasses =
    statusStyles[status] ||
    "bg-slate-100 text-slate-700 border border-slate-200";
  const progress = Number(
    internship?.progressPercentage || internship?.progress || 0
  );
  const showProgress = status === "In-progress" || status === "In Progress";

  return (
    <div className="relative overflow-hidden rounded-2xl bg-white shadow-lg ring-1 ring-slate-100 transition hover:-translate-y-1 hover:shadow-xl">
      {typeof matchScore === "number" && (
        <div className="absolute right-5 top-5 z-10 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary-600 text-base font-semibold text-white shadow-lg shadow-primary-600/30">
          {matchScore}%
        </div>
      )}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-50/40 via-transparent to-primary-100/30 pointer-events-none" />
      <div className="relative p-6 space-y-4">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="space-y-2">
            <div
              className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${badgeClasses}`}
            >
              {status}
            </div>
            <h3 className="text-xl font-semibold text-slate-900">
              {internship?.position_overview?.title}
            </h3>
            {internship?.company && (
              <p className="text-sm font-medium text-primary-700">
                {internship.company}
              </p>
            )}
            <p className="text-sm text-slate-600">
              {internship?.position_overview?.summary}
            </p>
          </div>
          <div className="flex flex-col items-end text-xs font-medium text-slate-500 gap-1">
            <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-slate-700">
              🗓{" "}
              {internship?.duration?.total_duration ||
                `${internship?.duration?.start_date} – ${internship?.duration?.end_date}`}
            </span>
            <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-slate-700">
              ⏱ {internship?.time_commitment}
            </span>
            <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-slate-700">
              📍 {internship?.location}
            </span>
          </div>
        </div>

        {showProgress && (
          <div>
            <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
              <span>Progress</span>
              <span>{`${Math.min(Math.max(progress, 0), 100)}%`}</span>
            </div>
            <div className="mt-2 h-2 w-full rounded-full bg-slate-200">
              <div
                className="h-full rounded-full bg-gradient-to-r from-primary-500 to-primary-400 transition-all duration-500"
                style={{ width: `${Math.min(Math.max(progress, 0), 100)}%` }}
              />
            </div>
          </div>
        )}

        <div className="flex flex-wrap gap-3 pt-2">
          <button
            onClick={() => onViewDetails?.(internship)}
            className="rounded-xl border border-primary-200 px-4 py-2 text-sm font-semibold text-primary-700 transition hover:border-primary-300 hover:bg-primary-50"
          >
            View details
          </button>
          {typeof onApply === "function" && status === "Active" && (
            <button
              onClick={() => onApply(internship)}
              disabled={isWaiting || isLoading}
              className={`rounded-xl px-4 py-2 text-sm font-semibold text-white shadow ${
                isWaiting || isLoading
                  ? "bg-primary-300 cursor-not-allowed"
                  : "bg-primary-600 hover:bg-primary-700"
              }`}
            >
              {isLoading
                ? "Sending..."
                : isWaiting
                ? "Waiting for response"
                : "Apply"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

const SoftSkillCard = ({ course, status, onStartCourse }) => {
  const displayStatus = status || course?.status || "Not Started";
  const badgeClasses =
    statusStyles[displayStatus] ||
    "bg-slate-100 text-slate-700 border border-slate-200";

  const buttonLabel =
    displayStatus === "Completed"
      ? "Review course"
      : displayStatus === "In Progress" || displayStatus === "In-progress"
      ? "Continue learning"
      : "Start course";

  const handleClick = () => {
    if (displayStatus === "Completed") return;
    onStartCourse?.(course?.title);
  };

  return (
    <div className="group relative overflow-hidden rounded-2xl bg-white shadow-md ring-1 ring-slate-100 transition hover:-translate-y-1 hover:shadow-xl">
      <div className="absolute inset-0 bg-gradient-to-r from-sky-50/70 via-transparent to-violet-50/70 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <div className="relative p-6 space-y-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div
              className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${badgeClasses}`}
            >
              {displayStatus}
            </div>
            <h3 className="mt-3 text-xl font-semibold text-slate-900">
              {course?.title}
            </h3>
            <p className="mt-2 text-slate-600">{course?.description}</p>
          </div>
          <div className="flex flex-col items-end gap-2 text-sm text-slate-500">
            <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 font-medium text-slate-700">
              ⏱ {course?.duration}
            </span>
            <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 font-medium text-slate-700">
              📘 {course?.lessons} lessons
            </span>
            {course?.progress && (
              <span className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-1 font-semibold text-emerald-700">
                ✅ {course?.progress} complete
              </span>
            )}
          </div>
        </div>
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Focus areas
          </h4>
          <div className="mt-2 flex flex-wrap gap-2">
            {course?.tags?.map((tag, idx) => (
              <span
                key={idx}
                className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
        <div className="flex items-center justify-between pt-2">
          {displayStatus !== "Completed" &&
            (displayStatus === "In Progress" ||
              displayStatus === "In-progress") && (
              <span className="text-xs font-semibold uppercase tracking-wide text-amber-500">
                In-progress
              </span>
            )}
          <button
            onClick={handleClick}
            className={`ml-auto rounded-xl px-4 py-2 text-sm font-semibold transition ${
              displayStatus === "Completed"
                ? "border border-emerald-200 text-emerald-600 hover:border-emerald-300 hover:bg-emerald-50"
                : "bg-sky-600 text-white shadow hover:bg-sky-700"
            }`}
          >
            {buttonLabel}
          </button>
        </div>
      </div>
    </div>
  );
};

export default function CandidateDashboard() {
  const storedCandidate = localStorage.getItem("candidate");
  const currentUser = storedCandidate ? JSON.parse(storedCandidate) : null;
  const navigate = useNavigate();
  const [selectedInternship, setSelectedInternship] = useState(null);
  const [courseStatuses, setCourseStatuses] = useState({});
  const [appliedInternships, setAppliedInternships] = useState({});

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

  const internships = candidateProfile?.Internship || [];
  const inProgressInternships = internships.filter(
    (internship) => internship?.status === "In-progress"
  );
  const completedInternships = internships.filter(
    (internship) => internship?.status === "Completed"
  );
  const activeInternships = internships.filter(
    (internship) => internship?.status === "Active"
  );

  const softSkillCourses = candidateProfile?.SoftSkillCourses || [];
  const softSkillsByStatus = softSkillCourses.reduce((acc, course) => {
    const status = course?.status || "Other";
    if (!acc[status]) acc[status] = [];
    acc[status].push(course);
    return acc;
  }, {});

  useEffect(() => {
    const initialStatuses = {};
    softSkillCourses.forEach((course) => {
      initialStatuses[course?.title] = course?.status || "Not Started";
    });
    setCourseStatuses(initialStatuses);
  }, [candidateProfile, softSkillCourses]);

  const calculateMatchPercentage = (internship) => {
    if (!candidateProfile?.skills?.length || !internship?.skills?.length) {
      return null;
    }
    const candidateSkills = new Set(
      candidateProfile.skills.map((skill) => skill.toLowerCase())
    );
    const requiredSkills = internship.skills.map((skill) =>
      skill.toLowerCase()
    );
    const matches = requiredSkills.filter((skill) =>
      candidateSkills.has(skill)
    );
    if (!requiredSkills.length) return null;
    return Math.round((matches.length / requiredSkills.length) * 100);
  };

  const recommendedInternships = useMemo(() => {
    return activeInternships.map((internship) => {
      const scoreFromProfile =
        typeof internship?.matchScore === "number"
          ? internship.matchScore
          : null;
      const derivedScore = calculateMatchPercentage(internship);
      const finalScore =
        typeof scoreFromProfile === "number"
          ? scoreFromProfile
          : typeof derivedScore === "number"
          ? derivedScore
          : null;

      return {
        internship,
        matchScore: finalScore,
      };
    });
  }, [activeInternships, candidateProfile?.skills]);

  const handleViewDetails = (internship) => {
    setSelectedInternship(internship);
  };

  const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

  const handleApply = async (internship) => {
    const internshipKey = getInternshipKey(internship);
    if (!internshipKey || appliedInternships[internshipKey] === "waiting") {
      return;
    }

    setAppliedInternships((prev) => ({
      ...prev,
      [internshipKey]: "loading",
    }));

    const senderEmail = candidateProfile?.email || currentUser?.email;
    const candidateName = candidateProfile?.name || currentUser?.name;

    try {
      const response = await fetch(
        `${API_BASE_URL}/api/send-application-email`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            senderEmail,
            candidateName,
            internshipTitle: internship?.position_overview?.title,
          }),
        }
      );

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data?.detail || "Failed to send email");
      }

      alert("Mail sent to Scale Up team. They will get back to you shortly.");
      setAppliedInternships((prev) => {
        return { ...prev, [internshipKey]: "waiting" };
      });
    } catch (error) {
      console.error(error);
      alert("Failed to send email. Please try again later.");
      setAppliedInternships((prev) => {
        const next = { ...prev };
        delete next[internshipKey];
        return next;
      });
    }
  };

  const handleStartCourse = (title) => {
    setCourseStatuses((prev) => ({
      ...prev,
      [title]: "In Progress",
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />

      <div className="flex-1 bg-gradient-to-br from-primary-50/70 via-white to-sky-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="rounded-3xl bg-white/80 backdrop-blur shadow-xl border border-white/40 px-8 py-10 mb-10">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-sm uppercase font-semibold tracking-[0.3em] text-primary-500">
                  Your growth journey
                </p>
                <h1 className="mt-3 text-3xl md:text-4xl font-bold text-slate-900">
                  Welcome back,{" "}
                  {candidateProfile?.name?.split(" ")[0] || "Trailblazer"}! 👋
                </h1>
                <p className="mt-3 max-w-xl text-base text-slate-600 leading-relaxed">
                  Track your internships, celebrate milestones, and explore new
                  opportunities curated for your skillset.
                </p>
              </div>
              <div className="flex items-center gap-3 rounded-2xl bg-primary-100/60 px-5 py-4 text-primary-700 shadow-inner">
                {/* <span className="text-3xl">{candidateProfile?.profileImage || "🚀"}</span> */}
                <div>
                  <p className="text-sm uppercase font-semibold tracking-wider text-primary-600">
                    Current focus
                  </p>
                  <p className="text-lg font-semibold text-primary-800">
                    {inProgressInternships[0]?.position_overview?.title ||
                      "Exploring new challenges"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-[320px,1fr] gap-8">
            <div className="space-y-6">
              <ProfileCard candidate={candidateProfile || currentUser} />

              <div className="rounded-2xl bg-white shadow-lg ring-1 ring-slate-100 p-6">
                <h2 className="text-xl font-semibold text-slate-900">
                  Quick actions
                </h2>
                <p className="mt-2 text-sm text-slate-500">
                  Shortcuts to keep your profile up-to-date and discover new
                  matches.
                </p>
                <div className="mt-4 space-y-3">
                  <button
                    onClick={() => navigate("/candidate/profile")}
                    className="flex w-full items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-left text-sm font-medium text-slate-700 transition hover:border-primary-300 hover:bg-primary-50 hover:text-primary-700"
                  >
                    <span>📝 Update profile</span>
                    <span>→</span>
                  </button>
                  <button
                    onClick={() => navigate("/candidate/internships")}
                    className="flex w-full items-center justify-between rounded-xl border border-primary-200 bg-primary-50 px-4 py-3 text-left text-sm font-medium text-primary-700 transition hover:border-primary-300 hover:bg-primary-100"
                  >
                    <span>🎯 Find internships</span>
                    <span>→</span>
                  </button>
                  <button
                    onClick={() => navigate("/candidate/soft-skills")}
                    className="flex w-full items-center justify-between rounded-xl border border-sky-200 bg-sky-50 px-4 py-3 text-left text-sm font-medium text-sky-700 transition hover:border-sky-300 hover:bg-sky-100"
                  >
                    <span>🧠 Soft skill matching</span>
                    <span>→</span>
                  </button>
                  <button
                    onClick={() => navigate("/candidate/experience")}
                    className="flex w-full items-center justify-between rounded-xl border border-violet-200 bg-violet-50 px-4 py-3 text-left text-sm font-medium text-violet-700 transition hover:border-violet-300 hover:bg-violet-100"
                  >
                    <span>📚 Experience card</span>
                    <span>→</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="space-y-12">
              {inProgressInternships.length > 0 && (
                <section className="space-y-6">
                  <header className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                      <h2 className="text-2xl font-semibold text-slate-900">
                        Active internship
                      </h2>
                      <p className="text-sm text-slate-500">
                        Projects currently in progress and led by you.
                      </p>
                    </div>
                    <span className="inline-flex items-center gap-2 rounded-full bg-amber-100 px-4 py-1 text-sm font-medium text-amber-700">
                      {inProgressInternships.length} in progress
                    </span>
                  </header>

                  <div className="grid gap-6">
                    {inProgressInternships.map((internship, index) => (
                      <InternshipCard
                        key={`${internship?.position_overview?.title}-${index}`}
                        internship={internship}
                        onViewDetails={handleViewDetails}
                      />
                    ))}
                  </div>
                </section>
              )}

              {recommendedInternships.length > 0 && (
                <section className="space-y-6">
                  <header className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                      <h2 className="text-2xl font-semibold text-slate-900">
                        Recommended for you
                      </h2>
                      <p className="text-sm text-slate-500">
                        Fresh matches aligned with your skills and interests.
                      </p>
                    </div>
                    <span className="inline-flex items-center gap-2 rounded-full bg-indigo-100 px-4 py-1 text-sm font-medium text-indigo-700">
                      {recommendedInternships.length} opportunities
                    </span>
                  </header>

                  <div className="grid gap-6">
                    {recommendedInternships.map(
                      ({ internship, matchScore }, index) => (
                      <InternshipCard
                        key={`${internship?.position_overview?.title}-${index}`}
                        internship={internship}
                        matchScore={matchScore}
                        onViewDetails={handleViewDetails}
                        onApply={handleApply}
                        isWaiting={
                          appliedInternships[getInternshipKey(internship)] ===
                          "waiting"
                        }
                        isLoading={
                          appliedInternships[getInternshipKey(internship)] ===
                          "loading"
                        }
                      />
                    )
                    )}
                  </div>
                </section>
              )}

              {completedInternships.length > 0 && (
                <section className="space-y-6">
                  <header className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                      <h2 className="text-2xl font-semibold text-slate-900">
                        Completed internships
                      </h2>
                      <p className="text-sm text-slate-500">
                        Celebrate what you've accomplished and add it to your
                        portfolio.
                      </p>
                    </div>
                    <span className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-1 text-sm font-medium text-emerald-700">
                      {completedInternships.length} completed
                    </span>
                  </header>

                  <div className="grid gap-6">
                    {completedInternships.map((internship, index) => (
                      <InternshipCard
                        key={`${internship?.position_overview?.title}-${index}`}
                        internship={internship}
                        onViewDetails={handleViewDetails}
                        isWaiting={
                          appliedInternships[getInternshipKey(internship)] ===
                          "waiting"
                        }
                        isLoading={
                          appliedInternships[getInternshipKey(internship)] ===
                          "loading"
                        }
                      />
                    ))}
                  </div>
                </section>
              )}

              {softSkillCourses.length > 0 && (
                <section className="space-y-6">
                  <header className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                      <h2 className="text-2xl font-semibold text-slate-900">
                        Soft skill courses
                      </h2>
                      <p className="text-sm text-slate-500">
                        Courses helping you strengthen collaboration and
                        communication.
                      </p>
                    </div>
                  </header>

                  <div className="space-y-8">
                    {Object.entries(softSkillsByStatus).map(
                      ([status, courses]) => (
                        <div key={status} className="space-y-4">
                          <div className="flex items-center justify-between">
                            <h3 className="text-lg font-semibold text-slate-800">
                              {status}
                            </h3>
                            <span className="text-sm text-slate-500">
                              {courses.length} course
                              {courses.length > 1 ? "s" : ""}
                            </span>
                          </div>
                          <div className="grid gap-5 md:grid-cols-2">
                            {courses.map((course, index) => (
                              <SoftSkillCard
                                key={`${course?.title}-${index}`}
                                course={course}
                                status={courseStatuses[course?.title]}
                                onStartCourse={handleStartCourse}
                              />
                            ))}
                          </div>
                        </div>
                      )
                    )}
                  </div>
                </section>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />

      {selectedInternship && (
        <InternshipDetailModal
          internship={selectedInternship}
          onClose={() => setSelectedInternship(null)}
          onApply={handleApply}
          isWaiting={
            appliedInternships[getInternshipKey(selectedInternship)] ===
            "waiting"
          }
          isLoading={
            appliedInternships[getInternshipKey(selectedInternship)] ===
            "loading"
          }
        />
      )}
    </div>
  );
}
