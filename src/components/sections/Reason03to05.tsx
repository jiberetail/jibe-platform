import { useState, useEffect, useRef } from "react";
import { CheckCircle } from "lucide-react";

// ── Reason 03: Dot-field — 100% slower, refill every 15s ─────────────────────
const TOTAL = 600;
const SURVEY_COUNT = 96;

function DotField({ lit, total, color }: { lit: number; total: number; color: string }) {
  return (
    <div className="grid gap-[3px]" style={{ gridTemplateColumns: `repeat(30, 1fr)` }} aria-hidden>
      {Array.from({ length: total }).map((_, i) => (
        <div key={i} className="rounded-[1px]" style={{
          width: 5, height: 5,
          background: i < lit ? color : "rgba(45,45,45,0.12)",
          opacity: i < lit ? 1 : 0.6,
        }} />
      ))}
    </div>
  );
}

function Reason03() {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);
  const [jibeLit, setJibeLit] = useState(SURVEY_COUNT);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVis(true); setRunning(true); }
    }, { threshold: 0.2 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!running) return;
    let frame: number;
    let start: number | null = null;
    const dur = 4400; // 100% slower

    const tick = (ts: number) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 2.5);
      setJibeLit(Math.floor(eased * TOTAL));
      if (p < 1) {
        frame = requestAnimationFrame(tick);
      } else {
        setTimeout(() => {
          setJibeLit(SURVEY_COUNT);
          setTimeout(() => { start = null; setRunning(false); setTimeout(() => setRunning(true), 50); }, 300);
        }, 15000); // 15 second hold
      }
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [running]);

  return (
    <section id="reason-03" ref={ref} className="py-28 lg:py-40 border-b" style={{ background: "#FFFFFF", borderColor: "#D9D9D5" }}>
      <div className="max-w-[1320px] mx-auto px-6 lg:px-10">
        <div className="font-['Instrument_Serif'] leading-none mb-10 transition-all duration-700"
          style={{ fontSize: "clamp(72px, 8vw, 110px)", color: "#0076CE", letterSpacing: "-0.03em", opacity: vis ? 1 : 0 }}>
          03
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-16 items-start">
          <div className={`transition-all duration-700 ${vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`} style={{ transitionDelay: "100ms" }}>
            <h2 className="font-['Instrument_Serif'] leading-[1.04] mb-6" style={{ fontSize: "clamp(32px, 3.6vw, 52px)", color: "#2F2F2F", letterSpacing: "-0.02em" }}>
              See beyond the customers who answer.
            </h2>
            <p className="text-[16px] leading-[1.65] mb-8" style={{ color: "#6D6D69", maxWidth: 440 }}>
              Survey results are valuable, but response volume leaves most interactions unseen. Jibe Pro adds structured frontline predictions to survey and operational data, giving leaders a broader view of customer experience.
            </p>
            <div className="flex items-start gap-3 p-4 rounded-xl border" style={{ borderColor: "#B9DDF4", background: "#E8F4FC" }}>
              <div className="w-2 h-2 rounded-full mt-1 shrink-0" style={{ background: "#0076CE" }} />
              <p className="text-[13px] leading-relaxed" style={{ color: "#004F8C" }}>
                <strong>Outcome:</strong> Understand more interactions. Reduce dependence on survey response volume.
              </p>
            </div>
          </div>
          <div className={`transition-all duration-700 ${vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`} style={{ transitionDelay: "200ms" }}>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <div className="overflow-hidden rounded-lg mb-4"><DotField lit={SURVEY_COUNT} total={TOTAL} color="#6D6D69" /></div>
                <div className="font-mono text-[9px] tracking-[0.2em] uppercase mb-0.5" style={{ color: "#6D6D69" }}>Survey Responses</div>
                <div className="font-mono text-[11px] font-medium" style={{ color: "#2F2F2F" }}>16% of interactions</div>
              </div>
              <div>
                <div className="overflow-hidden rounded-lg mb-4"><DotField lit={jibeLit} total={TOTAL} color="#0076CE" /></div>
                <div className="font-mono text-[9px] tracking-[0.2em] uppercase mb-0.5" style={{ color: "#0076CE" }}>Jibe Signal Coverage</div>
                <div className="font-mono text-[11px] font-medium" style={{ color: "#2F2F2F" }}>Predictions + Surveys + Ops</div>
              </div>
            </div>
            <p className="mt-4 font-mono text-[10px]" style={{ color: "#D9D9D5" }}>Sample — {TOTAL} interactions illustrated</p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Reason 04: Form auto-fills Positive/Resolved/High, prompts user to submit ──
type Sat  = "Positive" | "Neutral"  | "Negative"  | null;
type Res  = "Resolved" | "Partially resolved" | "Not resolved" | null;
type Conf = "High" | "Medium" | "Low" | null;

function Reason04() {
  const [sat,       setSat]       = useState<Sat>(null);
  const [res,       setRes]       = useState<Res>(null);
  const [conf,      setConf]      = useState<Conf>(null);
  const [pulseBtn,  setPulseBtn]  = useState(false);
  const [submitting,setSubmitting]= useState(false);
  const [submitted, setSubmitted] = useState(false);
  const cycleRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const startCycle = () => {
    setSat(null); setRes(null); setConf(null);
    setPulseBtn(false); setSubmitted(false); setSubmitting(false);
    const t1 = setTimeout(() => setSat("Positive"), 1400);
    const t2 = setTimeout(() => setRes("Resolved"),  2800);
    const t3 = setTimeout(() => setConf("High"),     4200);
    const t4 = setTimeout(() => setPulseBtn(true),   5000);
    return [t1,t2,t3,t4];
  };

  useEffect(() => {
    const timers = startCycle();
    return () => timers.forEach(clearTimeout);
  }, []);

  const handleSubmit = () => {
    if (!(sat && res && conf) || submitting) return;
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      // Reset and restart after 4s
      cycleRef.current = setTimeout(() => startCycle(), 4000);
    }, 900);
  };

  return (
    <section id="reason-04" className="py-28 lg:py-40 border-b" style={{ background: "#EBEBEB", borderColor: "#D9D9D5" }}>
      <div className="max-w-[1320px] mx-auto px-6 lg:px-10">
        <div className="font-['Instrument_Serif'] leading-none mb-10" style={{ fontSize: "clamp(72px, 8vw, 110px)", color: "#0076CE", letterSpacing: "-0.03em" }}>04</div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div>
            <h2 className="font-['Instrument_Serif'] leading-[1.04] mb-6" style={{ fontSize: "clamp(32px, 3.6vw, 52px)", color: "#2F2F2F", letterSpacing: "-0.02em" }}>
              Capture the outcome while it is still fresh.
            </h2>
            <p className="text-[16px] leading-[1.65]" style={{ color: "#6D6D69", maxWidth: 420 }}>
              Immediately after an interaction, the agent records a fast prediction of customer satisfaction and resolution. The signal is structured, consistent, and captured inside the existing workflow.
            </p>
          </div>
          <div>
            <div className="rounded-2xl overflow-hidden border shadow-lg" style={{ borderColor: "#D9D9D5", background: "white" }}>
              <div className="flex items-center gap-2 px-4 py-3 border-b" style={{ background: "#EBEBEB", borderColor: "#D9D9D5" }}>
                <div className="flex gap-1.5">{["#D9D9D5","#D9D9D5","#D9D9D5"].map((c,i)=><div key={i} className="w-2.5 h-2.5 rounded-full" style={{background:c}}/>)}</div>
                <span className="ml-2 font-mono text-[10px]" style={{ color: "#6D6D69" }}>Jibe Pro — Outcome Capture</span>
              </div>
              {!submitted ? (
              <div className="p-6 space-y-5">
                <div className="pb-5 border-b" style={{ borderColor: "#EBEBEB" }}>
                  <div className="font-mono text-[10px] tracking-wide uppercase mb-1" style={{ color: "#0076CE" }}>Interaction complete</div>
                  <div className="flex gap-4 text-[12px]" style={{ color: "#6D6D69" }}><span>Case CAS-29483</span><span>·</span><span>Phone</span><span>·</span><span>6m 14s</span></div>
                </div>
                <div className="text-[15px] font-medium" style={{ color: "#2F2F2F" }}>How did this interaction go?</div>
                <FG label="Customer satisfaction">
                  <div className="flex gap-2">{(["Positive","Neutral","Negative"] as Sat[]).map(v=><TB key={v!} label={v!} selected={sat===v} onClick={()=>setSat(v)}/>)}</div>
                </FG>
                <FG label="Was the issue resolved?">
                  <div className="flex gap-2 flex-wrap">{(["Resolved","Partially resolved","Not resolved"] as Res[]).map(v=><TB key={v!} label={v!} selected={res===v} onClick={()=>setRes(v)}/>)}</div>
                </FG>
                <FG label="Prediction confidence">
                  <div className="flex gap-2">{(["High","Medium","Low"] as Conf[]).map(v=><TB key={v!} label={v!} selected={conf===v} onClick={()=>setConf(v)}/>)}</div>
                </FG>
                <button
                  onClick={handleSubmit}
                  className="w-full py-3.5 font-semibold text-[13px] rounded-lg transition-all cursor-pointer"
                  style={{
                    background: (sat&&res&&conf) ? "#0076CE" : "#EBEBEB",
                    color: (sat&&res&&conf) ? "white" : "#D9D9D5",
                    boxShadow: pulseBtn && (sat&&res&&conf) ? "0 0 0 4px rgba(0,118,206,0.2)" : "none",
                    transform: pulseBtn && (sat&&res&&conf) ? "scale(1.01)" : "scale(1)",
                  }}
                >
                  {submitting ? <span className="flex items-center justify-center gap-2"><span className="w-4 h-4 border-2 rounded-full animate-spin" style={{borderColor:"rgba(255,255,255,0.3)",borderTopColor:"white"}}/>Submitting…</span>
                    : pulseBtn && (sat&&res&&conf) ? "↑ Submit prediction" : "Submit prediction"}
                </button>
                {pulseBtn && (sat&&res&&conf) && !submitting && (
                  <p className="text-center font-mono text-[10px]" style={{ color: "#0076CE" }}>
                    Click to record this prediction signal
                  </p>
                )}
              </div>
              ) : (
              <div className="p-8 text-center">
                <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: "#E8F4FC" }}>
                  <div className="w-5 h-5 rounded-full" style={{ background: "#0076CE" }} />
                </div>
                <div className="font-medium text-[15px] mb-1" style={{ color: "#2F2F2F" }}>Signal recorded</div>
                <div className="text-[13px]" style={{ color: "#6D6D69" }}>Positive · Resolved · High confidence</div>
              </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FG({ label, children }: { label: string; children: React.ReactNode }) {
  return <div><div className="font-mono text-[10px] tracking-wide uppercase mb-2" style={{ color: "#6D6D69" }}>{label}</div>{children}</div>;
}
function TB({ label, selected, onClick }: { label: string; selected: boolean; onClick: () => void }) {
  return (
    <button onClick={onClick} className="px-3.5 py-2 rounded-lg text-[12px] font-medium border transition-all" style={{ borderColor: selected?"#0076CE":"#D9D9D5", background: selected?"#E8F4FC":"white", color: selected?"#0076CE":"#6D6D69" }}>
      {label}
    </button>
  );
}

// ── Reason 05: Sequential NPS bars, hold 15s ──────────────────────────────────
const NPS_DATA = [31, 35, 33, 38, 41, 40, 44, 43, 47, 50];

function Reason05() {
  const [planCreated, setPlanCreated] = useState(false);
  const [visibleBars, setVisibleBars] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);
  const maxNPS = Math.max(...NPS_DATA);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => e.isIntersecting && setVis(true), { threshold: 0.2 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!vis) return;
    let timers: ReturnType<typeof setTimeout>[] = [];

    const runCycle = () => {
      setVisibleBars(0);
      // Reveal one bar every 280ms
      NPS_DATA.forEach((_, i) => {
        const t = setTimeout(() => setVisibleBars(i + 1), 600 + i * 280);
        timers.push(t);
      });
      // After all bars shown, hold 15s then restart
      const hold = setTimeout(() => {
        timers = [];
        runCycle();
      }, 600 + NPS_DATA.length * 280 + 15000);
      timers.push(hold);
    };

    const start = setTimeout(runCycle, 500);
    timers.push(start);
    return () => timers.forEach(clearTimeout);
  }, [vis]);

  return (
    <section id="reason-05" ref={ref} className="py-28 lg:py-40 border-b" style={{ background: "#FFFFFF", borderColor: "#D9D9D5" }}>
      <div className="max-w-[1320px] mx-auto px-6 lg:px-10">
        <div className="font-['Instrument_Serif'] leading-none mb-10" style={{ fontSize: "clamp(72px, 8vw, 110px)", color: "#0076CE", letterSpacing: "-0.03em" }}>05</div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div>
            <h2 className="font-['Instrument_Serif'] leading-[1.04] mb-6" style={{ fontSize: "clamp(32px, 3.6vw, 52px)", color: "#2F2F2F", letterSpacing: "-0.02em" }}>
              Coach with evidence.
            </h2>
            <p className="text-[16px] leading-[1.65]" style={{ color: "#6D6D69", maxWidth: 420 }}>
              Jibe Pro gives supervisors a structured view of agent behavior, customer outcomes, prediction accuracy, participation, and performance over time. Coaching becomes specific, measurable, and tied to actual results.
            </p>
          </div>
          <div className="border rounded-2xl overflow-hidden bg-white" style={{ borderColor: "#D9D9D5" }}>
            <div className="flex items-center gap-4 px-6 py-5 border-b" style={{ borderColor: "#EBEBEB" }}>
              <div className="w-12 h-12 rounded-full flex items-center justify-center font-semibold text-white text-[15px]" style={{ background: "#0076CE" }}>SR</div>
              <div>
                <div className="font-semibold text-[15px]" style={{ color: "#2F2F2F" }}>S. Reyes</div>
                <div className="text-[12px]" style={{ color: "#6D6D69" }}>Team Alpha · Phoenix · 18 months</div>
              </div>
              <span className="ml-auto font-mono text-[10px] px-2.5 py-1 rounded-full border" style={{ borderColor: "#D9D9D5", color: "#6D6D69" }}>Active</span>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-3 gap-3 mb-5">
                {[{l:"Participation",v:"96%",b:true},{l:"Accuracy",v:"89%",b:true},{l:"NPS Score",v:"47",b:false},{l:"Match Rate",v:"87%",b:false},{l:"Surveys",v:"142",b:false},{l:"FCR",v:"75%",b:false}].map(({l,v,b})=>(
                  <div key={l} className="border rounded-xl px-3 py-3" style={{ borderColor: "#EBEBEB" }}>
                    <div className="font-mono text-[9px] uppercase tracking-wide mb-0.5" style={{ color: "#6D6D69" }}>{l}</div>
                    <div className="font-semibold text-[18px]" style={{ color: b?"#0076CE":"#2F2F2F" }}>{v}</div>
                  </div>
                ))}
              </div>
              {/* Sequential NPS bar chart */}
              <div className="border rounded-xl p-4 mb-4" style={{ borderColor: "#EBEBEB" }}>
                <div className="flex items-center justify-between mb-3">
                  <div className="font-mono text-[10px] uppercase tracking-wide" style={{ color: "#6D6D69" }}>30-Day NPS</div>
                  <div className="font-mono text-[11px]" style={{ color: "#0076CE" }}>
                    {visibleBars >= NPS_DATA.length ? `+${NPS_DATA[NPS_DATA.length-1] - NPS_DATA[0]} pts` : "…"}
                  </div>
                </div>
                <div className="flex items-end gap-1.5 h-14">
                  {NPS_DATA.map((v, i) => (
                    <div key={i} className="flex-1 rounded-t"
                      style={{
                        height: i < visibleBars ? `${(v / maxNPS) * 56}px` : "0px",
                        background: i >= NPS_DATA.length - 3 ? "#0076CE" : "#D9D9D5",
                        transition: "height 0.22s cubic-bezier(0.34,1.56,0.64,1)",
                      }}
                    />
                  ))}
                </div>
                <div className="flex justify-between mt-1">
                  <span className="font-mono text-[9px]" style={{ color: "#D9D9D5" }}>Day 1</span>
                  <span className="font-mono text-[9px]" style={{ color: "#D9D9D5" }}>Day 30</span>
                </div>
              </div>
              <div className="mb-5">
                <div className="font-mono text-[10px] uppercase tracking-wide mb-2.5" style={{ color: "#6D6D69" }}>Coaching Opportunities</div>
                {["Billing dissatisfaction rate elevated vs. team","Negative prediction volume increasing","AHT above team avg on technical contacts"].map(s=>(
                  <div key={s} className="flex items-start gap-2.5 mb-1.5">
                    <div className="w-1 h-1 rounded-full mt-1.5 shrink-0" style={{background:"#D9D9D5"}}/>
                    <span className="text-[13px]" style={{color:"#6D6D69"}}>{s}</span>
                  </div>
                ))}
              </div>
              {!planCreated ? (
                <button onClick={()=>setPlanCreated(true)} className="w-full py-3 rounded-xl font-semibold text-[13px] border transition-colors" style={{borderColor:"#0076CE",color:"#0076CE"}}>
                  + Create coaching plan
                </button>
              ) : (
                <div className="p-4 rounded-xl border" style={{borderColor:"#B9DDF4",background:"#E8F4FC"}}>
                  <div className="font-mono text-[10px] uppercase mb-2" style={{color:"#0076CE"}}>Plan created</div>
                  <div className="text-[13px]" style={{color:"#004F8C"}}>Focus: billing dissatisfaction. Review 3 interactions/week. Check-in in 2 weeks.</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Reason03to05() {
  return (<><Reason03 /><Reason04 /><Reason05 /></>);
}
