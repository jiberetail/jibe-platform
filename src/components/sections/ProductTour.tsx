import { useState } from "react";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts";

const tabs = ["Overview", "Teams", "Agents", "QA", "Drivers", "Reporting", "Admin"] as const;
type Tab = typeof tabs[number];

const weeklyData = [
  { week: "W1", sat: 78, pred: 76 },
  { week: "W2", sat: 79, pred: 77 },
  { week: "W3", sat: 77, pred: 76 },
  { week: "W4", sat: 81, pred: 79 },
  { week: "W5", sat: 82, pred: 80 },
  { week: "W6", sat: 80, pred: 81 },
  { week: "W7", sat: 83, pred: 82 },
  { week: "W8", sat: 84, pred: 83 },
];

const teams = [
  { name: "Team Alpha", site: "Phoenix", supervisor: "D. Chen", headcount: 22, part: "94%", acc: "91%", sat: "83%", res: "79%", aht: "4:18", trend: "↑" },
  { name: "Team Beta", site: "Phoenix", supervisor: "M. Lopez", headcount: 19, part: "87%", acc: "88%", sat: "79%", res: "76%", aht: "4:42", trend: "↑" },
  { name: "Team Gamma", site: "Dallas", supervisor: "R. Parks", headcount: 24, part: "91%", acc: "85%", sat: "76%", res: "74%", aht: "5:01", trend: "→" },
  { name: "Team Delta", site: "Dallas", supervisor: "L. Adams", headcount: 17, part: "79%", acc: "72%", sat: "70%", res: "68%", aht: "5:22", trend: "↓" },
  { name: "Team Epsilon", site: "Tampa", supervisor: "J. Brown", headcount: 21, part: "96%", acc: "93%", sat: "86%", res: "82%", aht: "4:05", trend: "↑" },
];

const agents = [
  { name: "S. Reyes", team: "Alpha", part: "96%", acc: "89%", surveys: 142, pos: 68, neg: 18, match: "87%", trend: "↑", status: "Active" },
  { name: "J. Patel", team: "Beta", part: "92%", acc: "91%", surveys: 128, pos: 71, neg: 14, match: "91%", trend: "↑", status: "Coaching" },
  { name: "A. Kim", team: "Gamma", part: "88%", acc: "82%", surveys: 98, pos: 55, neg: 28, match: "78%", trend: "→", status: "Review" },
  { name: "R. Okonkwo", team: "Delta", part: "79%", acc: "74%", surveys: 87, pos: 42, neg: 32, match: "72%", trend: "↓", status: "Coaching" },
  { name: "C. Nguyen", team: "Epsilon", part: "98%", acc: "94%", surveys: 156, pos: 82, neg: 12, match: "93%", trend: "↑", status: "Active" },
];

const reportMetrics = ["NPS", "CSAT", "Predicted Satisfaction", "Resolution", "FCR", "AHT", "Survey Participation", "Prediction Participation", "Jibe Accuracy"];
const groupByOptions = ["Team", "Site", "Channel", "Agent Tenure", "Contact Reason"];

function OverviewTab() {
  const kpis = [
    { l: "NPS", v: "47", d: "+3", up: true },
    { l: "CSAT", v: "82%", d: "+1.2%", up: true },
    { l: "Pred. Sat.", v: "79%", d: "-0.8%", up: false },
    { l: "Resolution", v: "74%", d: "+2.1%", up: true },
    { l: "FCR", v: "68%", d: "+0.5%", up: true },
    { l: "AHT", v: "4:32", d: "-0:12", up: true },
    { l: "Survey Part.", v: "16.4%", d: "-0.3%", up: false },
    { l: "Pred. Part.", v: "91%", d: "+1.1%", up: true },
    { l: "Jibe Acc.", v: "91%", d: "+0.7%", up: true },
  ];

  return (
    <div className="p-5 space-y-5">
      <div className="grid grid-cols-3 md:grid-cols-9 gap-2">
        {kpis.map(({ l, v, d, up }) => (
          <div key={l} className="bg-[#F7F7F4] rounded-xl p-3 border border-[#D8DADC]">
            <div className="font-mono text-[9px] text-[#686A6D] uppercase mb-1 truncate">{l}</div>
            <div className="font-semibold text-[#2F2F2F] text-base leading-none mb-0.5">{v}</div>
            <div className={`font-mono text-[10px] ${up ? "text-[#0076CE]" : "text-[#686A6D]"}`}>{d}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-3">
        <div className="col-span-2 bg-[#F7F7F4] rounded-xl p-4 border border-[#D8DADC]">
          <div className="font-mono text-[10px] text-[#686A6D] uppercase tracking-wide mb-3">Weekly Trend — CSAT vs Predicted</div>
          <ResponsiveContainer width="100%" height={80}>
            <LineChart data={weeklyData}>
              <XAxis dataKey="week" tick={{ fontSize: 9, fontFamily: "IBM Plex Mono" }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ fontSize: 11, fontFamily: "IBM Plex Mono" }} />
              <Line type="monotone" dataKey="sat" stroke="#0076CE" strokeWidth={2} dot={false} name="CSAT" />
              <Line type="monotone" dataKey="pred" stroke="#B9DDF4" strokeWidth={1.5} dot={false} strokeDasharray="4 2" name="Predicted" />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="space-y-3">
          <div className="bg-[#EAF5FC] rounded-xl p-4 border border-[#B9DDF4]">
            <div className="font-mono text-[10px] text-[#0076CE] uppercase mb-1">Top Improving</div>
            <div className="font-semibold text-[#2F2F2F] text-sm">Technical Support</div>
            <div className="font-mono text-[11px] text-[#0076CE]">+4.2 pts CSAT</div>
          </div>
          <div className="bg-[#F7F7F4] rounded-xl p-4 border border-[#D8DADC]">
            <div className="font-mono text-[10px] text-[#686A6D] uppercase mb-1">Highest Risk</div>
            <div className="font-semibold text-[#2F2F2F] text-sm">Billing & Payments</div>
            <div className="font-mono text-[11px] text-[#686A6D]">14 pending reviews</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function TeamsTab() {
  return (
    <div className="p-5">
      <div className="flex items-center gap-3 mb-4">
        <div className="flex gap-2">
          {["All Sites", "Phoenix", "Dallas", "Tampa"].map((s) => (
            <button key={s} className="px-3 py-1.5 text-[11px] rounded-full border border-[#D8DADC] text-[#686A6D] hover:border-[#0076CE] hover:text-[#0076CE] transition-colors">
              {s}
            </button>
          ))}
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-[12px]">
          <thead>
            <tr className="border-b border-[#D8DADC]">
              {["Team", "Site", "Supervisor", "HC", "Part.", "Acc.", "CSAT", "Resolution", "AHT", "Trend"].map((h) => (
                <th key={h} className="px-3 py-2.5 text-left font-mono text-[10px] text-[#686A6D] uppercase tracking-wide whitespace-nowrap">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {teams.map((t) => (
              <tr key={t.name} className="border-b border-[#D8DADC] hover:bg-[#F7F7F4] transition-colors">
                <td className="px-3 py-2.5 font-medium text-[#2F2F2F]">{t.name}</td>
                <td className="px-3 py-2.5 text-[#686A6D]">{t.site}</td>
                <td className="px-3 py-2.5 text-[#686A6D]">{t.supervisor}</td>
                <td className="px-3 py-2.5 font-mono text-[#686A6D]">{t.headcount}</td>
                <td className="px-3 py-2.5 font-mono text-[#0076CE]">{t.part}</td>
                <td className="px-3 py-2.5 font-mono text-[#2F2F2F]">{t.acc}</td>
                <td className="px-3 py-2.5 font-mono text-[#2F2F2F]">{t.sat}</td>
                <td className="px-3 py-2.5 font-mono text-[#2F2F2F]">{t.res}</td>
                <td className="px-3 py-2.5 font-mono text-[#686A6D]">{t.aht}</td>
                <td className="px-3 py-2.5 font-mono text-lg">{t.trend}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function AgentsTab() {
  return (
    <div className="p-5">
      <div className="overflow-x-auto">
        <table className="w-full text-[12px]">
          <thead>
            <tr className="border-b border-[#D8DADC]">
              {["Agent", "Team", "Part.", "Acc.", "Surveys", "Pos.", "Neg.", "Match", "Trend", "Status"].map((h) => (
                <th key={h} className="px-3 py-2.5 text-left font-mono text-[10px] text-[#686A6D] uppercase tracking-wide whitespace-nowrap">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {agents.map((a) => (
              <tr key={a.name} className="border-b border-[#D8DADC] hover:bg-[#F7F7F4] transition-colors">
                <td className="px-3 py-2.5 font-medium text-[#2F2F2F]">{a.name}</td>
                <td className="px-3 py-2.5 text-[#686A6D]">{a.team}</td>
                <td className="px-3 py-2.5 font-mono text-[#0076CE]">{a.part}</td>
                <td className="px-3 py-2.5 font-mono text-[#2F2F2F]">{a.acc}</td>
                <td className="px-3 py-2.5 font-mono text-[#686A6D]">{a.surveys}</td>
                <td className="px-3 py-2.5 font-mono text-[#0076CE]">{a.pos}</td>
                <td className="px-3 py-2.5 font-mono text-[#686A6D]">{a.neg}</td>
                <td className="px-3 py-2.5 font-mono text-[#2F2F2F]">{a.match}</td>
                <td className="px-3 py-2.5 font-mono">{a.trend}</td>
                <td className="px-3 py-2.5">
                  <span className={`font-mono text-[10px] px-2 py-0.5 rounded ${
                    a.status === "Active" ? "bg-[#EAF5FC] text-[#0076CE]" :
                    a.status === "Coaching" ? "bg-[#F7F7F4] text-[#686A6D]" :
                    "border border-[#2F2F2F] text-[#2F2F2F] bg-white"
                  }`}>{a.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function ReportingTab() {
  const [selectedMetrics, setSelectedMetrics] = useState<string[]>(["CSAT", "NPS"]);
  const [groupBy, setGroupBy] = useState("Team");

  const toggleMetric = (m: string) => {
    setSelectedMetrics((prev) =>
      prev.includes(m) ? prev.filter((x) => x !== m) : [...prev, m]
    );
  };

  return (
    <div className="p-5 space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <div className="font-mono text-[10px] text-[#686A6D] uppercase mb-2">Metrics</div>
          <div className="flex flex-wrap gap-1.5">
            {reportMetrics.map((m) => (
              <button
                key={m}
                onClick={() => toggleMetric(m)}
                className="px-2.5 py-1 text-[11px] rounded-full border transition-all"
                style={{
                  borderColor: selectedMetrics.includes(m) ? "#0076CE" : "#D8DADC",
                  background: selectedMetrics.includes(m) ? "#EAF5FC" : "white",
                  color: selectedMetrics.includes(m) ? "#0076CE" : "#686A6D",
                }}
              >
                {m}
              </button>
            ))}
          </div>
        </div>
        <div>
          <div className="font-mono text-[10px] text-[#686A6D] uppercase mb-2">Group By</div>
          <div className="flex flex-wrap gap-1.5">
            {groupByOptions.map((g) => (
              <button
                key={g}
                onClick={() => setGroupBy(g)}
                className="px-2.5 py-1 text-[11px] rounded-full border transition-all"
                style={{
                  borderColor: groupBy === g ? "#0076CE" : "#D8DADC",
                  background: groupBy === g ? "#EAF5FC" : "white",
                  color: groupBy === g ? "#0076CE" : "#686A6D",
                }}
              >
                {g}
              </button>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <button className="px-4 py-2 bg-[#0076CE] text-white rounded-lg text-[12px] font-semibold hover:bg-[#004F8C] transition-colors">
            Run Report
          </button>
          <button className="px-4 py-2 border border-[#D8DADC] text-[#686A6D] rounded-lg text-[12px] font-medium hover:bg-[#F7F7F4] transition-colors">
            Export CSV
          </button>
          <button className="px-4 py-2 border border-[#D8DADC] text-[#686A6D] rounded-lg text-[12px] font-medium hover:bg-[#F7F7F4] transition-colors">
            Schedule Report
          </button>
        </div>
      </div>

      {selectedMetrics.length > 0 && (
        <div className="bg-[#F7F7F4] rounded-xl p-4 border border-[#D8DADC]">
          <div className="font-mono text-[10px] text-[#686A6D] uppercase mb-3">
            Preview — {selectedMetrics.join(", ")} by {groupBy}
          </div>
          <ResponsiveContainer width="100%" height={100}>
            <BarChart data={teams}>
              <XAxis dataKey="name" tick={{ fontSize: 9, fontFamily: "IBM Plex Mono" }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ fontSize: 11 }} />
              {selectedMetrics.slice(0, 2).map((m, i) => (
                <Bar key={m} dataKey="sat" fill={i === 0 ? "#0076CE" : "#B9DDF4"} radius={[3, 3, 0, 0]} name={m} />
              ))}
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}

function AdminTab() {
  const items = [
    { section: "Users & Roles", desc: "Manage user access, roles, and permissions across sites and teams." },
    { section: "Metric Definitions", desc: "Configure KPI calculations, thresholds, and rolling window settings." },
    { section: "Survey Configuration", desc: "Connect survey platforms, map fields, and define match logic." },
    { section: "Prediction Configuration", desc: "Set prediction categories, scale definitions, and required fields." },
    { section: "Data Source Status", desc: "Monitor data pipeline health, latency, and completeness." },
    { section: "Team Hierarchy", desc: "Define organizational structure: enterprise → region → site → team." },
    { section: "Pilot Cohort Assignment", desc: "Assign agents and teams to test and control groups for measurement." },
    { section: "Alerts & Notifications", desc: "Configure threshold alerts, escalation rules, and report delivery." },
  ];

  return (
    <div className="p-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {items.map(({ section, desc }) => (
          <div key={section} className="bg-[#F7F7F4] rounded-xl p-4 border border-[#D8DADC] hover:border-[#0076CE] transition-colors cursor-pointer">
            <div className="font-semibold text-[#2F2F2F] text-[13px] mb-1">{section}</div>
            <div className="text-[12px] text-[#686A6D] leading-relaxed">{desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ProductTour() {
  const [activeTab, setActiveTab] = useState<Tab>("Overview");

  const renderTab = () => {
    switch (activeTab) {
      case "Overview": return <OverviewTab />;
      case "Teams": return <TeamsTab />;
      case "Agents": return <AgentsTab />;
      case "QA": return (
        <div className="p-5">
          <div className="font-mono text-[10px] text-[#686A6D] uppercase mb-3">Risk-Prioritized Queue — 5 interactions shown</div>
          <div className="space-y-2">
            {["INT-00291 · M. Torres · High priority — predicted positive, customer reported negative",
              "INT-00304 · J. Patel · Medium priority — no survey response received",
              "INT-00318 · A. Kim · High priority — unresolved with extended handle time",
              "INT-00325 · R. Okonkwo · Medium priority — repeat contact, third in 14 days",
              "INT-00338 · C. Nguyen · Low priority — prediction mismatch, minor divergence",
            ].map((item) => (
              <div key={item} className="flex items-center gap-3 px-4 py-3 bg-[#F7F7F4] rounded-xl border border-[#D8DADC] hover:border-[#0076CE] transition-colors cursor-pointer text-[12px] text-[#686A6D]">
                {item}
              </div>
            ))}
          </div>
        </div>
      );
      case "Drivers": return (
        <div className="p-5 space-y-3">
          <div className="font-mono text-[10px] text-[#686A6D] uppercase mb-3">Contact Driver Analysis</div>
          {[
            { d: "Billing & Payments", v: 2840, risk: "High" },
            { d: "Account Access", v: 1920, risk: "Medium" },
            { d: "Order Status", v: 1640, risk: "Low" },
            { d: "Technical Support", v: 1310, risk: "High" },
          ].map(({ d, v, risk }) => (
            <div key={d} className="flex items-center gap-4 bg-[#F7F7F4] rounded-xl px-4 py-3 border border-[#D8DADC]">
              <span className="font-medium text-[#2F2F2F] text-[13px] w-40 shrink-0">{d}</span>
              <div className="flex-1 h-2 bg-[#D8DADC] rounded-full overflow-hidden">
                <div className="h-full bg-[#0076CE] rounded-full" style={{ width: `${(v / 2840) * 100}%` }} />
              </div>
              <span className="font-mono text-[11px] text-[#686A6D] w-16 text-right">{v.toLocaleString()}</span>
              <span className={`font-mono text-[10px] px-2 py-0.5 rounded ${risk === "High" ? "bg-[#F7F7F4] text-[#2F2F2F] border border-[#D8DADC]" : risk === "Medium" ? "bg-[#F1F3F4] text-[#686A6D]" : "bg-[#EAF5FC] text-[#0076CE]"}`}>
                {risk}
              </span>
            </div>
          ))}
        </div>
      );
      case "Reporting": return <ReportingTab />;
      case "Admin": return <AdminTab />;
    }
  };

  return (
    <section id="product-tour" className="scroll-mt-24 border-t border-b py-24 lg:py-32" style={{ background: "#FFFFFF", borderColor: "#D9D9D5" }}>
      <div className="max-w-[1320px] mx-auto px-6 lg:px-10">
        <div className="text-center mb-16">
          <span className="font-mono text-[11px] tracking-[0.2em] text-[#686A6D] uppercase block mb-4">Inside Jibe Pro</span>
          <h2 className="font-['Instrument_Serif'] text-[42px] md:text-[56px] lg:text-[64px] leading-[1.0] text-[#2F2F2F]">
            One platform. Multiple views of the same customer experience.
          </h2>
        </div>

        {/* Product window */}
        <div className="bg-white rounded-2xl border border-[#D8DADC] overflow-hidden shadow-xl">
          {/* Window chrome */}
          <div className="flex items-center gap-2 px-5 py-3.5 border-b border-[#D8DADC] bg-[#F7F7F4]">
            <div className="w-3 h-3 rounded-full bg-[#D8DADC]" />
            <div className="w-3 h-3 rounded-full bg-[#D8DADC]" />
            <div className="w-3 h-3 rounded-full bg-[#D8DADC]" />
            <span className="ml-3 font-mono text-[11px] text-[#686A6D]">Jibe Pro</span>
          </div>

          {/* Tab bar */}
          <div className="border-b border-[#D8DADC] overflow-x-auto">
            <div className="flex min-w-max">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-5 py-3.5 text-[13px] font-medium border-b-2 transition-all whitespace-nowrap ${
                    activeTab === tab
                      ? "border-[#0076CE] text-[#0076CE]"
                      : "border-transparent text-[#686A6D] hover:text-[#2F2F2F]"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Tab content */}
          <div className="min-h-[320px]">{renderTab()}</div>

          {/* Sample data footer */}
          <div className="px-5 py-3 border-t border-[#D8DADC] bg-[#F7F7F4]">
            <span className="font-mono text-[10px] text-[#686A6D]">
              All data shown is sample data — fictional teams, agents, and performance values. For demonstration purposes only.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
