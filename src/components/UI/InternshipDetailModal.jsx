import React from "react";

const badgeStyles = {
  "In-progress": "bg-amber-100 text-amber-700 border border-amber-200",
  Active: "bg-indigo-100 text-indigo-700 border border-indigo-200",
  Completed: "bg-emerald-100 text-emerald-700 border border-emerald-200",
};

export default function InternshipDetailModal({
  internship,
  onClose,
  onApply,
  isWaiting = false,
  isLoading = false,
}) {
  if (!internship) return null;

  const status = internship?.status || "Active";
  const badgeClass =
    badgeStyles[status] || "bg-slate-100 text-slate-700 border border-slate-200";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm px-4 py-6">
      <div className="relative max-h-[90vh] w-full max-w-4xl overflow-hidden rounded-3xl bg-white shadow-2xl ring-1 ring-slate-200">
        <div className="flex items-center justify-between border-b border-slate-100 px-8 py-6">
          <div>
            <div className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${badgeClass}`}>
              {status}
            </div>
            <h2 className="mt-3 text-2xl font-semibold text-slate-900">
              {internship?.position_overview?.title}
            </h2>
            {internship?.company && (
              <p className="mt-1 text-sm text-slate-500">{internship.company}</p>
            )}
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
                {internship?.duration?.start_date} – {internship?.duration?.end_date}
              </p>
              <p className="mt-1">{internship?.time_commitment}</p>
              <p className="mt-1">{internship?.location}</p>
              <p className="mt-1">{internship?.remote ? "Remote friendly" : "On-site"}</p>
            </div>
            <div className="rounded-2xl bg-slate-50 px-5 py-4 text-sm text-slate-600">
              <p className="font-semibold uppercase tracking-wide text-slate-500">
                Contact & mentor
              </p>
              <p className="mt-2">
                Mentor: {internship?.mentor?.name} • {internship?.mentor?.position}
              </p>
              <p className="mt-1 text-sm text-slate-500">
                Experience: {internship?.mentor?.experience}
              </p>
              <p className="mt-3 text-sm text-slate-500">
                Contact email: {internship?.contact_email}
              </p>
            </div>
          </section>

          <section>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
              Overview
            </h3>
            <p className="mt-2 text-sm text-slate-600 leading-relaxed">
              {internship?.position_overview?.summary}
            </p>
          </section>

          <section className="grid gap-6 md:grid-cols-2">
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                Key responsibilities
              </h3>
              <ul className="mt-2 space-y-2 text-sm text-slate-600">
                {internship?.key_responsibilities?.map((item, idx) => (
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
                {internship?.requirements?.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-slate-400" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {internship?.benefits?.what_you_will_gain?.length ? (
            <section>
              <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                What you'll gain
              </h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {internship.benefits.what_you_will_gain.map((benefit, idx) => (
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

          {internship?.skills?.length ? (
            <section>
              <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                Skills spotlight
              </h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {internship.skills.map((skill, idx) => (
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
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 px-8 py-5">
          <div className="text-sm text-slate-500">
            {internship?.team?.collaboration && (
              <p className="font-medium text-slate-600">{internship.team.collaboration}</p>
            )}
            {internship?.team?.team_size && (
              <p className="text-xs uppercase tracking-wide text-slate-400">
                Team size: {internship.team.team_size}
              </p>
            )}
          </div>
          {onApply && status === "Active" && (
            <button
              onClick={() => onApply?.(internship)}
              disabled={isWaiting || isLoading}
              className={`rounded-2xl px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-primary-600/30 transition ${
                isWaiting || isLoading
                  ? "bg-primary-300 cursor-not-allowed"
                  : "bg-primary-600 hover:-translate-y-0.5 hover:bg-primary-700"
              }`}
            >
              {isLoading ? "Sending..." : isWaiting ? "Waiting for response" : "Apply now"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}


