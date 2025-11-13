import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Layout/Navbar";
import Footer from "../components/Layout/Footer";
import employersData from "../data/employers.json";
import candidatesData from "../data/candidates.json";
import EmployerProjectDetailModal from "../components/UI/EmployerProjectDetailModal";

const projectStatusStyles = {
  "In-progress": "bg-amber-100 text-amber-700 border border-amber-200",
  Active: "bg-indigo-100 text-indigo-700 border border-indigo-200",
  Completed: "bg-emerald-100 text-emerald-700 border border-emerald-200",
};

const getProjectKey = (project) =>
  project?.id ||
  [
    project?.position_overview?.title,
    project?.contact_email,
    project?.duration?.start_date,
    project?.created_at,
  ]
    .filter(Boolean)
    .join("|");

const EmployerProjectCard = ({ project, onViewDetails, onDelete }) => {
  const status = project?.status || "Active";
  const badgeClasses =
    projectStatusStyles[status] ||
    "bg-slate-100 text-slate-600 border border-slate-200";
  const assignedCount = project?.assignedCandidates?.length || 0;

  return (
    <div className="relative overflow-hidden rounded-2xl bg-white shadow-lg ring-1 ring-slate-100 transition hover:-translate-y-1 hover:shadow-xl">
      <div className="absolute inset-0 bg-gradient-to-br from-primary-50/40 via-transparent to-sky-100/30 pointer-events-none" />
      <div className="relative p-6 space-y-5">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="space-y-2">
            <div
              className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${badgeClasses}`}
            >
              {status}
            </div>
            <h3 className="text-xl font-semibold text-slate-900">
              {project?.position_overview?.title}
            </h3>
            <p className="text-sm font-medium text-primary-700">
              {project?.company || "Scale Up Partner"}
            </p>
            <p className="text-sm text-slate-600 line-clamp-2">
              {project?.position_overview?.summary}
            </p>
          </div>
          <div className="flex flex-col items-end gap-1 text-xs font-medium text-slate-500">
            <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-slate-700">
              🗓{" "}
              {project?.duration?.total_duration ||
                `${project?.duration?.start_date} – ${project?.duration?.end_date}`}
            </span>
            <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-slate-700">
              ⏱ {project?.time_commitment}
            </span>
            <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-slate-700">
              📍 {project?.location}
            </span>
            <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-emerald-600">
              👥 {assignedCount} assigned
            </span>
          </div>
        </div>

        <div className="flex flex-wrap gap-3 pt-2">
          <button
            onClick={() => onViewDetails?.(project)}
            className="rounded-xl border border-primary-200 px-4 py-2 text-sm font-semibold text-primary-700 transition hover:border-primary-300 hover:bg-primary-50"
          >
            View details
          </button>
          <button
            onClick={() => onDelete?.(project)}
            className="rounded-xl border border-red-200 px-4 py-2 text-sm font-semibold text-red-600 transition hover:border-red-300 hover:bg-red-50"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

const CandidateModal = ({ candidate, onClose }) => {
  if (!candidate) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 px-4 py-6 backdrop-blur-sm">
      <div className="max-h-[90vh] w-full max-w-2xl overflow-auto rounded-3xl bg-white shadow-2xl ring-1 ring-slate-200">
        <div className="flex items-center justify-between border-b border-slate-100 px-8 py-6">
          <div className="flex items-center gap-4">
            <div>
              <h3 className="text-2xl font-semibold text-slate-900">
                {candidate?.name}
              </h3>
              <p className="text-sm uppercase tracking-wide text-slate-500">
                {candidate?.Role} • {candidate?.location}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-600 transition hover:border-slate-300 hover:text-slate-900"
          >
            Close
          </button>
        </div>

        <div className="space-y-8 px-8 py-6">
          <section className="space-y-3">
            <h4 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
              About
            </h4>
            <p className="text-slate-600 leading-relaxed">{candidate?.bio}</p>
          </section>

          <section className="grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-slate-100 bg-slate-50/70 px-6 py-5">
              <h4 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                Skills
              </h4>
              <div className="mt-3 flex flex-wrap gap-2">
                {candidate?.skills?.map((skill, idx) => (
                  <span
                    key={idx}
                    className="rounded-full bg-white px-3 py-1 text-xs font-medium text-slate-600 shadow-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <div className="rounded-2xl border border-slate-100 bg-slate-50/70 px-6 py-5">
              <h4 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                Language proficiency
              </h4>
              <div className="mt-3 space-y-2 text-sm text-slate-600">
                <p>
                  <span className="font-semibold text-slate-800">
                    Norwegian:
                  </span>{" "}
                  {candidate?.norwegian}
                </p>
                <p>
                  <span className="font-semibold text-slate-800">English:</span>{" "}
                  {candidate?.english}
                </p>
              </div>
            </div>
          </section>

          {candidate?.Internship?.length ? (
            <section className="space-y-3">
              <h4 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                Internship history
              </h4>
              <div className="space-y-3">
                {candidate.Internship.map((internship, idx) => (
                  <div
                    key={idx}
                    className="rounded-2xl border border-slate-100 bg-white px-5 py-4 shadow-sm"
                  >
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <p className="text-base font-semibold text-slate-800">
                          {internship?.position_overview?.title}
                        </p>
                        <p className="text-sm text-slate-500">
                          {internship?.duration?.start_date} –{" "}
                          {internship?.duration?.end_date}
                        </p>
                      </div>
                      <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                        {internship?.status}
                      </span>
                    </div>
                    <p className="mt-2 text-sm text-slate-600">
                      {internship?.position_overview?.summary}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default function EmployerDashboard() {
  const navigate = useNavigate();
  const storedemployer = localStorage.getItem("employer");
  const currentEmployer = storedemployer ? JSON.parse(storedemployer) : null;

  const employerProfile = useMemo(() => {
    if (!currentEmployer) return null;
    return (
      employersData.find(
        (profile) =>
          profile?.id === currentEmployer?.id ||
          profile?.email === currentEmployer?.email ||
          profile?.companyName === currentEmployer?.companyName
      ) || currentEmployer
    );
  }, [currentEmployer]);

  const [customProjects, setCustomProjects] = useState([]);
  const [deletedProjectKeys, setDeletedProjectKeys] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);

  const candidateMap = useMemo(() => {
    const map = new Map();
    candidatesData.forEach((candidate) => map.set(candidate?.id, candidate));
    return map;
  }, []);

  const [selectedCandidateId, setSelectedCandidateId] = useState(null);
  const selectedCandidate = useMemo(
    () => candidateMap.get(selectedCandidateId) || null,
    [candidateMap, selectedCandidateId]
  );

  useEffect(() => {
    if (!employerProfile?.id) return;
    const stored = JSON.parse(localStorage.getItem("employerProjects") || "{}");
    setCustomProjects(stored[employerProfile.id] || []);
  }, [employerProfile?.id]);

  useEffect(() => {
    if (!employerProfile?.id) return;
    const stored = JSON.parse(
      localStorage.getItem("employerDeletedProjects") || "{}"
    );
    setDeletedProjectKeys(stored[employerProfile.id] || []);
  }, [employerProfile?.id]);

  useEffect(() => {
    if (!employerProfile?.id) return;
    const stored = JSON.parse(localStorage.getItem("employerProjects") || "{}");
    stored[employerProfile.id] = customProjects;
    localStorage.setItem("employerProjects", JSON.stringify(stored));
  }, [customProjects, employerProfile?.id]);

  useEffect(() => {
    if (!employerProfile?.id) return;
    const stored = JSON.parse(
      localStorage.getItem("employerDeletedProjects") || "{}"
    );
    stored[employerProfile.id] = deletedProjectKeys;
    localStorage.setItem("employerDeletedProjects", JSON.stringify(stored));
  }, [deletedProjectKeys, employerProfile?.id]);

  const baseProjects = useMemo(() => {
    const all = employerProfile?.Project || [];
    return all.filter(
      (project) => !deletedProjectKeys.includes(getProjectKey(project))
    );
  }, [employerProfile?.Project, deletedProjectKeys]);

  const projects = useMemo(
    () => [...baseProjects, ...customProjects],
    [baseProjects, customProjects]
  );

  const activeProjects = projects.filter(
    (project) =>
      project?.status === "Active" || project?.status === "In-progress"
  );
  const completedProjects = projects.filter(
    (project) => project?.status === "Completed"
  );

  const handleViewProject = (project) => {
    setSelectedProject(project);
  };

  const handleDeleteProject = (project) => {
    if (
      !window.confirm(
        "Are you sure you want to delete this internship? This action cannot be undone."
      )
    ) {
      return;
    }

    const projectKey = getProjectKey(project);
    const isCustom = customProjects.some(
      (custom) => getProjectKey(custom) === projectKey
    );

    if (isCustom) {
      setCustomProjects((prev) =>
        prev.filter((custom) => getProjectKey(custom) !== projectKey)
      );
    } else {
      setDeletedProjectKeys((prev) =>
        prev.includes(projectKey) ? prev : [...prev, projectKey]
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />

      <div className="flex-1 bg-gradient-to-br from-primary-50/60 via-white to-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="rounded-3xl bg-white/80 backdrop-blur shadow-xl border border-white/40 px-8 py-10 mb-10">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-sm uppercase font-semibold tracking-[0.3em] text-primary-500">
                  Employer overview
                </p>
                <h1 className="mt-3 text-3xl md:text-4xl font-bold text-slate-900">
                  Welcome, {employerProfile?.ContactPerson || "Partner"}! 🏢
                </h1>
                <p className="mt-3 max-w-2xl text-base text-slate-600 leading-relaxed">
                  Manage your internship programs, stay close to assigned
                  talent, and keep momentum with a clear view of every track.
                </p>
                {employerProfile && (
                  <div className="mt-6 grid gap-4 sm:grid-cols-2 text-sm text-slate-600">
                    <p>
                      <span className="font-semibold text-slate-800">
                        Company:
                      </span>{" "}
                      {employerProfile.companyName}
                    </p>
                    <p>
                      <span className="font-semibold text-slate-800">
                        Location:
                      </span>{" "}
                      {employerProfile.location}
                    </p>
                    <p className="sm:col-span-2">
                      <span className="font-semibold text-slate-800">
                        Focus:
                      </span>{" "}
                      {employerProfile.description}
                    </p>
                    {employerProfile.website && (
                      <p>
                        <span className="font-semibold text-slate-800">
                          Website:
                        </span>{" "}
                        <a
                          href={employerProfile.website}
                          className="text-primary-600 underline-offset-4 hover:underline"
                          target="_blank"
                          rel="noreferrer"
                        >
                          {employerProfile.website}
                        </a>
                      </p>
                    )}
                  </div>
                )}
              </div>
              <button
                onClick={() => navigate("/employer/projects/new")}
                className="inline-flex items-center justify-center rounded-2xl bg-primary-600 px-6 py-4 text-base font-semibold text-white shadow-lg shadow-primary-600/30 transition hover:-translate-y-0.5 hover:bg-primary-700"
              >
                + Post new internship
              </button>
            </div>
          </div>

          <div className="space-y-12">
            <section className="space-y-6">
              <header className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <h2 className="text-2xl font-semibold text-slate-900">
                    Active & in-progress tracks
                  </h2>
                  <p className="text-sm text-slate-500">
                    Stay synced with interns currently engaged with your teams.
                  </p>
                </div>
                <span className="inline-flex items-center gap-2 rounded-full bg-indigo-100 px-4 py-1 text-sm font-medium text-indigo-700">
                  {activeProjects.length} ongoing
                </span>
              </header>

              {activeProjects.length > 0 ? (
                <div className="grid gap-7">
                  {activeProjects.map((project, idx) => (
                    <EmployerProjectCard
                      key={`${project?.position_overview?.title}-${idx}`}
                      project={project}
                      onViewDetails={handleViewProject}
                      onDelete={handleDeleteProject}
                    />
                  ))}
                </div>
              ) : (
                <div className="rounded-3xl border border-dashed border-indigo-200 bg-indigo-50/60 px-6 py-10 text-center text-indigo-700">
                  <p className="text-lg font-semibold">
                    No active internships at the moment
                  </p>
                  <p className="mt-2 text-sm text-indigo-600">
                    Launch a new project to attract emerging talent.
                  </p>
                </div>
              )}
            </section>

            <section className="space-y-6">
              <header className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <h2 className="text-2xl font-semibold text-slate-900">
                    Completed internships
                  </h2>
                  <p className="text-sm text-slate-500">
                    Review the talent that has successfully wrapped up
                    engagements.
                  </p>
                </div>
                <span className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-1 text-sm font-medium text-emerald-700">
                  {completedProjects.length} completed
                </span>
              </header>

              {completedProjects.length > 0 ? (
                <div className="grid gap-7">
                  {completedProjects.map((project, idx) => (
                    <EmployerProjectCard
                      key={`${project?.position_overview?.title}-completed-${idx}`}
                      project={project}
                      onViewDetails={handleViewProject}
                      onDelete={handleDeleteProject}
                    />
                  ))}
                </div>
              ) : (
                <div className="rounded-3xl border border-dashed border-emerald-200 bg-emerald-50/60 px-6 py-10 text-center text-emerald-700">
                  <p className="text-lg font-semibold">
                    No completed internships logged yet
                  </p>
                  <p className="mt-2 text-sm text-emerald-600">
                    Completed projects will appear here automatically.
                  </p>
                </div>
              )}
            </section>
          </div>
        </div>
      </div>

      <Footer />

      {selectedProject && (
        <EmployerProjectDetailModal
          project={selectedProject}
          candidateMap={candidateMap}
          onClose={() => setSelectedProject(null)}
          onSelectCandidate={(candidateId) =>
            setSelectedCandidateId(candidateId)
          }
        />
      )}

      {selectedCandidate && (
        <CandidateModal
          candidate={selectedCandidate}
          onClose={() => setSelectedCandidateId(null)}
        />
      )}
    </div>
  );
}
