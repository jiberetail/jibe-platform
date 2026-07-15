import { useState } from "react";
import { assetUrl } from "../../assetUrl";

type ProductScreen = {
  id: string;
  label: string;
  group: "Role Views" | "Operational Tools";
  src: string;
  width: number;
  height: number;
  alt: string;
  outcome: string;
};

const productScreens: ProductScreen[] = [
  {
    id: "executive",
    label: "Executive View",
    group: "Role Views",
    src: "assets/jibe-pro/screens/executive-performance-report.png",
    width: 1160,
    height: 905,
    alt: "Jibe Pro executive performance report showing weekly NPS, resolution, adoption, interaction volume, and prediction accuracy.",
    outcome:
      "Track performance, accuracy, adoption, and customer outcomes in one board-ready scorecard.",
  },
  {
    id: "manager",
    label: "Manager View",
    group: "Role Views",
    src: "assets/jibe-pro/screens/manager-dashboard.png",
    width: 1349,
    height: 728,
    alt: "Jibe Pro manager dashboard showing customer NPS, resolution, prediction accuracy, team rankings, and impact drivers.",
    outcome:
      "Compare teams, spot changing performance, and surface the drivers that need attention.",
  },
  {
    id: "supervisor",
    label: "Supervisor View",
    group: "Role Views",
    src: "assets/jibe-pro/screens/supervisor-dashboard.png",
    width: 1349,
    height: 728,
    alt: "Jibe Pro supervisor dashboard showing team performance, required coaching sessions, agent insights, and impact drivers.",
    outcome:
      "Turn live team signals into a prioritized coaching queue and clear next actions.",
  },
  {
    id: "agent",
    label: "Agent View",
    group: "Role Views",
    src: "assets/jibe-pro/screens/agent-dashboard.png",
    width: 1349,
    height: 747,
    alt: "Jibe Pro agent dashboard showing achievement badges, prediction accuracy, personal performance trends, and improvement insights.",
    outcome:
      "Give every agent a personal view of performance, prediction accuracy, progress, and recognition.",
  },
  {
    id: "reporting",
    label: "Report Builder",
    group: "Operational Tools",
    src: "assets/jibe-pro/screens/reporting-metric-builder.png",
    width: 1503,
    height: 918,
    alt: "Jibe Pro reporting workspace with configurable KPI cards, performance trends, and metric controls.",
    outcome:
      "Build the KPI view each stakeholder needs and compare performance trends on demand.",
  },
  {
    id: "quality-assurance",
    label: "Quality Assurance",
    group: "Operational Tools",
    src: "assets/jibe-pro/screens/qa-productivity-dashboard.png",
    width: 1355,
    height: 803,
    alt: "Jibe Pro quality assurance dashboard showing audit productivity, QA scores, suggested audits, and work prioritization.",
    outcome:
      "Focus QA effort where it matters, balance productivity, and track quality over time.",
  },
  {
    id: "coaching-impact",
    label: "Coaching Impact",
    group: "Operational Tools",
    src: "assets/jibe-pro/screens/coaching-impact-dashboard.png",
    width: 1355,
    height: 679,
    alt: "Jibe Pro coaching dashboard showing session completion, delivery speed, success rate, and post-coaching performance changes.",
    outcome:
      "Connect completed coaching to measurable changes in NPS, resolution, and handle time.",
  },
];

const screenGroups = ["Role Views", "Operational Tools"] as const;

export default function ProductTour() {
  const [activeId, setActiveId] = useState("executive");
  const activeScreen =
    productScreens.find((screen) => screen.id === activeId) ?? productScreens[0];
  const activeImageUrl = assetUrl(activeScreen.src);

  return (
    <section
      id="product-tour"
      className="scroll-mt-24 border-y border-[#D9D9D5] bg-white py-24 lg:py-32"
    >
      <div className="mx-auto max-w-[1320px] px-6 lg:px-10">
        <div className="mx-auto mb-14 max-w-[980px] text-center lg:mb-16">
          <span className="mb-4 block font-mono text-[11px] uppercase tracking-[0.2em] text-[#686A6D]">
            Inside Jibe Pro
          </span>
          <h2 className="font-['Instrument_Serif'] text-[42px] leading-[1] text-[#2F2F2F] md:text-[56px] lg:text-[64px]">
            One platform. The right view for every role.
          </h2>
          <p className="mx-auto mt-6 max-w-[760px] text-[16px] leading-7 text-[#686A6D] md:text-[18px]">
            From the executive scorecard to the next coaching conversation, every team works
            from the same customer signal.
          </p>
        </div>

        <div className="rounded-[24px] border border-[#D9D9D5] bg-[#F7F7F4] p-3 shadow-[0_24px_70px_rgba(23,35,48,0.12)] sm:p-5 lg:p-7">
          <div className="mb-5 overflow-x-auto pb-2 [scrollbar-width:thin] lg:mb-7">
            <div className="flex min-w-max gap-6 pr-3 lg:gap-10">
              {screenGroups.map((group) => (
                <div key={group}>
                  <p className="mb-2.5 font-mono text-[9px] uppercase tracking-[0.18em] text-[#686A6D]">
                    {group}
                  </p>
                  <div className="flex gap-2">
                    {productScreens
                      .filter((screen) => screen.group === group)
                      .map((screen) => {
                        const isActive = screen.id === activeScreen.id;

                        return (
                          <button
                            key={screen.id}
                            type="button"
                            aria-pressed={isActive}
                            onClick={() => setActiveId(screen.id)}
                            className={`rounded-full border px-4 py-2.5 text-[12px] font-medium whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0076CE] focus-visible:ring-offset-2 sm:text-[13px] ${
                              isActive
                                ? "border-[#0076CE] bg-[#0076CE] text-white"
                                : "border-[#D9D9D5] bg-white text-[#53565A] hover:border-[#0076CE] hover:text-[#0076CE]"
                            }`}
                          >
                            {screen.label}
                          </button>
                        );
                      })}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="overflow-hidden rounded-[18px] border border-[#D9D9D5] bg-white">
            <div className="flex flex-col gap-4 border-b border-[#EBEBEB] px-5 py-5 sm:px-7 lg:flex-row lg:items-end lg:justify-between lg:gap-8 lg:px-8">
              <div className="max-w-[760px]">
                <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.18em] text-[#0076CE]">
                  {activeScreen.group}
                </p>
                <h3 className="text-[22px] font-semibold tracking-[-0.02em] text-[#2F2F2F] sm:text-[26px]">
                  {activeScreen.label}
                </h3>
                <p className="mt-2 text-[14px] leading-6 text-[#686A6D] sm:text-[15px]">
                  {activeScreen.outcome}
                </p>
              </div>
              <a
                href={activeImageUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex shrink-0 items-center gap-2 self-start font-mono text-[10px] uppercase tracking-[0.14em] text-[#0076CE] underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0076CE] focus-visible:ring-offset-4 lg:self-auto"
                aria-label={`Open the full ${activeScreen.label} interface image in a new tab`}
              >
                Open full screen
                <span aria-hidden="true">↗</span>
              </a>
            </div>

            <a
              href={activeImageUrl}
              target="_blank"
              rel="noreferrer"
              className="block bg-[#EBEBEB] p-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#0076CE] sm:p-3 lg:p-4"
              aria-label={`Open the full ${activeScreen.label} interface image in a new tab`}
            >
              <img
                key={activeScreen.id}
                src={activeImageUrl}
                alt={activeScreen.alt}
                width={activeScreen.width}
                height={activeScreen.height}
                className="mx-auto h-auto max-h-[820px] w-full rounded-[10px] bg-white object-contain shadow-[0_8px_28px_rgba(23,35,48,0.1)]"
                loading="lazy"
                decoding="async"
              />
            </a>

            <div className="border-t border-[#EBEBEB] bg-[#F7F7F4] px-5 py-3.5 sm:px-7 lg:px-8">
              <p className="font-mono text-[9px] leading-4 text-[#686A6D] sm:text-[10px]">
                Product interface shown with demonstration data. Configurations and metrics vary by program.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
