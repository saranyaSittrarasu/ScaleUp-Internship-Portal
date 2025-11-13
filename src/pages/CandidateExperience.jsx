import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import Navbar from "../components/Layout/Navbar";
import Footer from "../components/Layout/Footer";
import candidatesData from "../data/candidates.json";

const ExperienceCertificate = ({ candidate, experiences }) => (
  <div className="space-y-8 rounded-3xl bg-white px-10 py-12 shadow-xl ring-1 ring-primary-100/60">
    <header className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
      <div>
        <p className="text-sm uppercase font-semibold tracking-[0.3em] text-primary-500">
          Experience certification
        </p>
        <h1 className="mt-2 text-3xl font-bold text-slate-900">{candidate?.name}</h1>
        <p className="mt-2 text-sm text-slate-600 max-w-xl">
          This document certifies the successful completion of structured internship programmes through Scale Up.
        </p>
      </div>
      <div className="rounded-2xl bg-primary-600/10 px-5 py-4 text-sm text-primary-700">
        <p className="font-semibold uppercase tracking-wide text-primary-600">Profile summary</p>
        <p className="mt-2 text-primary-700">
          {candidate?.Role} • {candidate?.location}
        </p>
        <p className="mt-1 text-primary-700">Norwegian: {candidate?.norwegian} • English: {candidate?.english}</p>
      </div>
    </header>

    <section className="space-y-6">
      <h2 className="text-xl font-semibold text-slate-900">Completed internships</h2>
      <div className="space-y-4">
        {experiences.map((internship, idx) => (
          <div
            key={`${internship?.position_overview?.title}-${idx}`}
            className="rounded-2xl border border-slate-100 bg-slate-50/70 px-6 py-5"
          >
            <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-lg font-semibold text-slate-900">
                  {internship?.position_overview?.title}
                </p>
                <p className="text-sm text-slate-600">
                  {internship?.company} • {internship?.time_commitment}
                </p>
              </div>
              <p className="text-sm font-medium text-slate-600">
                {internship?.duration?.start_date} – {internship?.duration?.end_date}
              </p>
            </div>
            <p className="mt-3 text-sm text-slate-600 leading-relaxed">
              {internship?.position_overview?.summary}
            </p>
            <div className="mt-3 text-xs uppercase tracking-wide text-slate-400">
              Contact: {internship?.contact_email}
            </div>
          </div>
        ))}
      </div>
    </section>

    <footer className="flex flex-col gap-4 border-t border-slate-100 pt-4 text-sm text-slate-500">
      <p>
        Issued by <span className="font-semibold text-slate-700">Scale Up Internship Programme</span>
      </p>
      <p>Generated on {new Date().toLocaleDateString()}</p>
    </footer>
  </div>
);

export default function CandidateExperience() {
  const navigate = useNavigate();
  const storedCandidate = localStorage.getItem("candidate");
  const currentUser = storedCandidate ? JSON.parse(storedCandidate) : null;

  const candidateProfile = useMemo(() => {
    if (!currentUser) return null;
    return (
      candidatesData.find(
        (profile) =>
          profile?.id === currentUser?.id || profile?.email === currentUser?.email
      ) || currentUser
    );
  }, [currentUser]);

  const completedExperiences = candidateProfile?.Internship?.filter(
    (internship) => internship?.status === "Completed"
  ) || [];

  if (!currentUser) {
    navigate("/");
    return null;
  }

  const handleDownload = () => {
    const doc = new jsPDF("p", "pt", "a4");
    const margin = 40;
    let currentY = margin;
    const pageWidth = doc.internal.pageSize.getWidth() - margin * 2;

    doc.setFont("helvetica", "bold");
    doc.setFontSize(20);
    doc.text("Experience Certification", margin, currentY);
    currentY += 30;

    doc.setFontSize(14);
    doc.setFont("helvetica", "normal");
    doc.text(`Candidate: ${candidateProfile?.name}`, margin, currentY);
    currentY += 20;
    doc.text(`Role: ${candidateProfile?.Role}`, margin, currentY);
    currentY += 20;
    doc.text(
      `Location: ${candidateProfile?.location} • Norwegian ${candidateProfile?.norwegian} • English ${candidateProfile?.english}`,
      margin,
      currentY
    );
    currentY += 30;

    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.text("Completed Internships", margin, currentY);
    currentY += 24;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);

    completedExperiences.forEach((experience, index) => {
      const lines = doc.splitTextToSize(
        `${experience?.position_overview?.summary}`,
        pageWidth
      );

      if (currentY + lines.length * 14 + 90 > doc.internal.pageSize.getHeight() - margin) {
        doc.addPage();
        currentY = margin;
      }

      doc.setFont("helvetica", "bold");
      doc.text(
        `${index + 1}. ${experience?.position_overview?.title} • ${experience?.company}`,
        margin,
        currentY
      );
      currentY += 18;

      doc.setFont("helvetica", "normal");
      doc.text(
        `Duration: ${experience?.duration?.start_date} – ${experience?.duration?.end_date}`,
        margin,
        currentY
      );
      currentY += 16;

      doc.text(`Commitment: ${experience?.time_commitment}`, margin, currentY);
      currentY += 16;

      lines.forEach((line) => {
        doc.text(line, margin, currentY);
        currentY += 14;
      });

      doc.text(`Contact: ${experience?.contact_email}`, margin, currentY);
      currentY += 24;
    });

    currentY += 20;
    doc.setFont("helvetica", "italic");
    doc.text("Issued by Scale Up Internship Programme", margin, currentY);

    doc.save(`${candidateProfile?.name || "candidate"}-experience.pdf`);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />

      <div className="flex-1 bg-gradient-to-br from-primary-50/70 via-white to-slate-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">My Experience Card 📚</h1>
              <p className="mt-2 text-sm text-slate-600">
                Digital proof of internships you have completed through Scale Up.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => navigate("/candidate/dashboard")}
                className="rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-medium text-slate-600 transition hover:border-slate-300 hover:text-slate-900"
              >
                ← Back to dashboard
              </button>
              {completedExperiences.length > 0 && (
                <button
                  onClick={handleDownload}
                  className="rounded-2xl bg-primary-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-primary-600/30 transition hover:-translate-y-0.5 hover:bg-primary-700"
                >
                  Download certificate (PDF)
                </button>
              )}
            </div>
          </div>

          {completedExperiences.length > 0 ? (
            <ExperienceCertificate candidate={candidateProfile} experiences={completedExperiences} />
          ) : (
            <div className="rounded-3xl bg-white px-12 py-16 text-center shadow-xl ring-1 ring-slate-100">
              <div className="text-6xl mb-4">📝</div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">
                No completed internships yet
              </h3>
              <p className="text-sm text-slate-600 mb-6">
                Once you complete an internship, it will be showcased here automatically.
              </p>
              <button
                onClick={() => navigate("/candidate/internships")}
                className="rounded-2xl bg-primary-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-primary-600/30 transition hover:-translate-y-0.5 hover:bg-primary-700"
              >
                Browse internships
              </button>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}

