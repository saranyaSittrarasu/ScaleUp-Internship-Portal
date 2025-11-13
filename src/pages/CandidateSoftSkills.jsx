import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Layout/Navbar";
import Footer from "../components/Layout/Footer";
import softSkillCatalog from "../data/softSkill.json";

const statusStyles = {
  Completed: "bg-emerald-100 text-emerald-700 border border-emerald-200",
  "In Progress": "bg-amber-100 text-amber-700 border border-amber-200",
  "Not Started": "bg-slate-100 text-slate-700 border border-slate-200",
  Locked: "bg-rose-100 text-rose-700 border border-rose-200",
};

const SoftSkillCard = ({ course, status, onStart }) => {
  const displayStatus = status || course?.status || "Not Started";
  const badgeClasses =
    statusStyles[displayStatus] || "bg-slate-100 text-slate-700 border border-slate-200";

  const buttonText =
    displayStatus === "Completed"
      ? "Review course"
      : displayStatus === "In Progress" || displayStatus === "In-progress"
      ? "Continue learning"
      : "Start course";

  const handleClick = () => {
    if (displayStatus === "Completed") return;
    onStart?.(course?.title);
  };

  return (
    <div className="relative overflow-hidden rounded-3xl bg-white shadow-lg shadow-sky-100/50 ring-1 ring-slate-100 transition hover:-translate-y-1 hover:shadow-2xl">
      <div className="absolute inset-0 bg-gradient-to-br from-sky-100/60 via-transparent to-violet-100/60" />
      <div className="relative space-y-6 p-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${badgeClasses}`}>
              {displayStatus}
            </div>
            <h3 className="mt-4 text-2xl font-semibold text-slate-900">{course?.title}</h3>
            <p className="mt-3 text-sm text-slate-600 leading-relaxed max-w-3xl">
              {course?.description}
            </p>
          </div>
          <div className="flex flex-col items-end text-sm text-slate-600">
            <span className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 font-medium text-slate-700 shadow-sm">
              ⏱ {course?.duration}
            </span>
            <span className="mt-2 inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 font-medium text-slate-700 shadow-sm">
              📘 {course?.lessons} lessons
            </span>
            {course?.progress && (
              <span className="mt-2 inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 font-semibold text-emerald-600 shadow-sm">
                ✅ {course?.progress}
              </span>
            )}
          </div>
        </div>

        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Focus areas
          </h4>
          <div className="mt-3 flex flex-wrap gap-2 text-xs text-slate-600">
            {course?.tags?.map((tag, idx) => (
              <span
                key={idx}
                className="rounded-full bg-white px-3 py-1 text-xs font-medium text-slate-700 shadow"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-xs font-medium uppercase tracking-wide text-slate-400">
            Suggested next step: {course?.action || "Start Course"}
          </span>
          {displayStatus !== "Completed" && (displayStatus === "In Progress" || displayStatus === "In-progress") && (
            <span className="text-xs font-semibold uppercase tracking-wide text-amber-500">
              In-progress
            </span>
          )}
          <button
            onClick={handleClick}
            className={`ml-auto rounded-full px-5 py-2 text-xs font-semibold shadow ${
              displayStatus === "Completed"
                ? "border border-emerald-200 text-emerald-600 hover:border-emerald-300 hover:bg-emerald-50"
                : "bg-sky-600/90 text-white hover:bg-sky-700"
            }`}
          >
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default function CandidateSoftSkills() {
  const navigate = useNavigate();
  const storedCandidate = localStorage.getItem("candidate");
  const [courseStatuses, setCourseStatuses] = useState({});

  useEffect(() => {
    const initialStatuses = {};
    (softSkillCatalog?.courses || []).forEach((course) => {
      initialStatuses[course?.title] = course?.status || "Not Started";
    });
    setCourseStatuses(initialStatuses);
  }, []);

  const handleStartCourse = (title) => {
    setCourseStatuses((prev) => ({
      ...prev,
      [title]: "In Progress",
    }));
  };

  if (!storedCandidate) {
    navigate("/");
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />

      <div className="flex-1 bg-gradient-to-br from-sky-50/70 via-white to-violet-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="mb-10 flex flex-col gap-4 rounded-3xl bg-white/90 px-8 py-10 shadow-xl ring-1 ring-sky-100/60">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-sm uppercase font-semibold tracking-[0.3em] text-sky-500">
                  Growth academy
                </p>
                <h1 className="mt-3 text-3xl font-bold text-slate-900">
                  Strengthen your soft skills for the modern workplace
                </h1>
                <p className="mt-3 max-w-2xl text-sm text-slate-600">
                  Explore curated courses focusing on communication, collaboration, and cultural fit tailored for Norwegian workplaces.
                </p>
              </div>
              <button
                onClick={() => navigate("/candidate/dashboard")}
                className="inline-flex items-center justify-center rounded-2xl bg-sky-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-sky-600/30 transition hover:-translate-y-0.5 hover:bg-sky-700"
              >
                ← Back to dashboard
              </button>
            </div>
          </div>

          <div className="space-y-8">
            {(softSkillCatalog?.courses || []).map((course, idx) => (
              <SoftSkillCard
                key={`${course?.title}-${idx}`}
                course={course}
                status={courseStatuses[course?.title]}
                onStart={handleStartCourse}
              />
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}


