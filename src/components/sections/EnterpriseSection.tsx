const pillars = [
  { label: "Configurable Measurement", desc: "KPI definitions, thresholds, rolling windows, and measurement periods adapt to your program design and operational requirements." },
  { label: "Role-Based Views", desc: "Executives, operations leaders, supervisors, and QA analysts each see the level of detail relevant to their responsibilities." },
  { label: "Multi-Site Reporting", desc: "Performance visibility that spans geographic regions, contact centers, and sites within a single operating view." },
  { label: "Data-Quality Visibility", desc: "Jibe Pro surfaces participation gaps, prediction coverage, and data completeness so leaders know when to trust the signal." },
  { label: "Flexible Filters", desc: "Slice performance by site, team, channel, contact reason, agent tenure, date range, and custom dimensions." },
  { label: "Executive Reporting", desc: "Scheduled report delivery, export options, and executive-ready dashboards built for board-level and leadership-team review." },
  { label: "Implementation Support", desc: "Jibe works directly with your team to design the measurement framework, configure the platform, and structure the pilot from the start." },
  { label: "Scalable Program Governance", desc: "Cohort assignment, access controls, audit trails, and team hierarchy management support structured rollout and ongoing governance." },
];

export default function EnterpriseSection() {
  return (
    <section id="enterprise" className="scroll-mt-24 py-24 lg:py-32 border-t border-b" style={{ background: "#F7F7F7", borderColor: "#D9D9D9" }}>
      <div className="max-w-[1320px] mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-16">
          <div className="lg:col-span-5">
            <span className="font-mono text-[11px] tracking-[0.25em] uppercase block mb-6" style={{ color: "#6D6D6D" }}>
              Built for Enterprise Operations
            </span>
            <h2
              className="font-['Instrument_Serif'] leading-[1.0] mb-6"
              style={{ fontSize: "clamp(36px, 4.2vw, 56px)", color: "#2F2F2F", letterSpacing: "-0.02em" }}
            >
              Clear enough for executives. Detailed enough for operators.
            </h2>
            <p className="text-[16px] leading-relaxed" style={{ color: "#6D6D6D" }}>
              Jibe Pro is designed for the complexity of enterprise contact-center operations — multi-site, multi-team, multi-channel, with the performance governance and reporting depth that large organizations require.
            </p>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-3">
            {pillars.map(({ label, desc }) => (
              <div
                key={label}
                className="border rounded-2xl p-5 hover:border-[#0076CE] transition-colors"
                style={{ borderColor: "#D9D9D9", background: "#FFFFFF" }}
              >
                <div className="w-6 h-px mb-4" style={{ background: "#0076CE" }} />
                <div className="font-semibold text-[14px] mb-2" style={{ color: "#2F2F2F" }}>{label}</div>
                <div className="text-[13px] leading-relaxed" style={{ color: "#6D6D6D" }}>{desc}</div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
