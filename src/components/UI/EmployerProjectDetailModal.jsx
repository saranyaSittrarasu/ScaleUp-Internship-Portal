import React from "react";

const projectStatusStyles = {
  "In-progress": "bg-amber-100 text-amber-700 border border-amber-200",
  Active: "bg-indigo-100 text-indigo-700 border border-indigo-200",
  Completed: "bg-emerald-100 text-emerald-700 border border-emerald-200",
};

export default function EmployerProjectDetailModal({
  project,
  candidateMap,
  onClose,
  onSelectCandidate,
}) {
  if (!project) return null;

  const status = project?.status || "Active";
  const badgeClasses =
    projectStatusStyles[status] ||
    "bg-slate-100 text-slate-600 border border-slate-200";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 px-4 py-6 backdrop-blur-sm">
      <div className="max-h-[90vh] w-full max-w-4xl overflow-hidden rounded-3xl bg-white shadow-2xl ring-1 ring-slate-200">
        <div className="flex items-center justify-between border-b border-slate-100 px-8 py-6">
          <div>
            <div
              className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${badgeClasses}`}
            >
              {status}
            </div>
            <h2 className="mt-3 text-2xl font-semibold text-slate-900">
              {project?.position_overview?.title}
            </h2>
            <p className="mt-1 text-sm text-slate-500">{project?.company}</p>
          </div>
          <button
            onClick={onClose}
            className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-600 transition hover:border-slate-300 hover:text-slate-900"
          >
            Close
          </button>
        </div>

        <div className="max-h-[70vh] overflow-y-auto px-8 py-6 space-y-6">
          <section className="grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl bg-primary-50/60 px-5 py-4 text-sm text-primary-700">
              <p className="font-semibold uppercase tracking-wide text-primary-600">
                Duration & commitment
              </p>
              <p className="mt-2">
                {project?.duration?.start_date} – {project?.duration?.end_date}
              </p>
              <p className="mt-1">{project?.time_commitment}</p>
              <p className="mt-1">{project?.location}</p>
              <p className="mt-1">
                {project?.remote ? "Remote friendly" : "On-site"}
              </p>
            </div>
            <div className="rounded-2xl bg-slate-50 px-5 py-4 text-sm text-slate-600">
              <p className="font-semibold uppercase tracking-wide text-slate-500">
                Mentor & contact
              </p>
              <p className="mt-2">
                Mentor: {project?.mentor?.name} • {project?.mentor?.position}
              </p>
              <p className="mt-1 text-sm text-slate-500">
                Experience: {project?.mentor?.experience}
              </p>
              <p className="mt-3 text-sm text-slate-500">
                Contact email: {project?.contact_email}
              </p>
            </div>
          </section>

          <section>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
              Project overview
            </h3>
            <p className="mt-2 text-sm text-slate-600 leading-relaxed">
              {project?.position_overview?.summary}
            </p>
          </section>

          <section className="grid gap-6 md:grid-cols-2">
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                Key responsibilities
              </h3>
              <ul className="mt-2 space-y-2 text-sm text-slate-600">
                {project?.key_responsibilities?.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary-500" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                Requirements
              </h3>
              <ul className="mt-2 space-y-2 text-sm text-slate-600">
                {project?.requirements?.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-slate-400" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {project?.benefits?.what_you_will_gain?.length ? (
            <section>
              <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                What interns gain
              </h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {project.benefits.what_you_will_gain.map((benefit, idx) => (
                  <span
                    key={idx}
                    className="rounded-full bg-emerald-50 px-4 py-1 text-sm font-medium text-emerald-600"
                  >
                    {benefit}
                  </span>
                ))}
              </div>
            </section>
          ) : null}

          {project?.skills?.length ? (
            <section>
              <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                Skills focus
              </h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {project.skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="rounded-full bg-primary-100 px-4 py-1 text-sm font-medium text-primary-700"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </section>
          ) : null}

          <section>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
              Assigned talent
            </h3>
            {project?.assignedCandidates?.length ? (
              <div className="mt-4 space-y-3">
                {project.assignedCandidates.map((assignment, idx) => {
                  const candidate = candidateMap?.get?.(
                    assignment?.candidateId
                  );
                  return (
                    <div
                      key={`${assignment?.candidateId}-${idx}`}
                      className="flex flex-col justify-between gap-3 rounded-2xl border border-emerald-100 bg-emerald-50/70 px-4 py-4 sm:flex-row sm:items-center"
                    >
                      <div className="flex items-center gap-3 text-slate-700">
                        <span className="text-2xl">
                          <img
                            src={candidate.profileImage}
                            alt={candidate.profileImage}
                            className="w-20 h-20 rounded-full"
                          />
                        </span>
                        <div>
                          {candidate ? (
                            <button
                              type="button"
                              onClick={() => onSelectCandidate?.(candidate?.id)}
                              className="text-left text-base font-semibold text-emerald-700 underline-offset-4 hover:underline"
                            >
                              {candidate?.name}
                            </button>
                          ) : (
                            <p className="text-base font-semibold text-emerald-700">
                              Candidate profile
                            </p>
                          )}
                          <p className="text-xs uppercase tracking-wide text-emerald-600">
                            {candidate?.Role || "Intern"} •{" "}
                            {candidate?.location || "N/A"}
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-emerald-700">
                        <span className="rounded-full bg-white px-3 py-1">
                          Status: {assignment?.status || "In-progress"}
                        </span>
                        {assignment?.started_on && (
                          <span className="rounded-full bg-white px-3 py-1">
                            Started: {assignment?.started_on}
                          </span>
                        )}
                        {assignment?.completed_on && (
                          <span className="rounded-full bg-white px-3 py-1">
                            Completed: {assignment?.completed_on}
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="mt-3 rounded-2xl border border-dashed border-slate-200 bg-slate-50 px-5 py-6 text-sm text-slate-500">
                No candidates assigned yet.
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
