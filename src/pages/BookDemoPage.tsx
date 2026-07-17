import { useEffect } from "react";
import { CalendarDays, Check, ExternalLink } from "lucide-react";

const salesCalendarUrl =
  "https://www.smsreminder.co/book/miG2PPrRWLNpOPVx/jake-raska";

const schedulingSteps = [
  "Choose the time that works for you",
  "Add your contact details",
  "Receive an immediate confirmation",
];

export default function BookDemoPage() {
  useEffect(() => {
    const previousTitle = document.title;
    const description = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    const previousDescription = description?.content;

    document.title = "Schedule a conversation | Jibe";
    if (description) {
      description.content =
        "Choose a time and schedule a conversation with Jibe sales.";
    }

    return () => {
      document.title = previousTitle;
      if (description && previousDescription) description.content = previousDescription;
    };
  }, []);

  return (
    <main className="min-h-screen bg-white px-5 pb-24 pt-32 sm:px-6 lg:px-10 lg:pb-32 lg:pt-40">
      <div className="mx-auto grid max-w-[1320px] gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:items-start lg:gap-20">
        <div className="lg:sticky lg:top-32">
          <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-[#0076CE]">
            Schedule a conversation
          </p>
          <h1 className="mt-6 max-w-[560px] font-['Instrument_Serif'] text-[54px] leading-[0.94] tracking-[-0.025em] text-[#2F2F2F] sm:text-[72px]">
            Choose a time. Start the conversation.
          </h1>
          <p className="mt-7 max-w-[500px] text-[16px] leading-[1.75] text-[#5F5F5F]">
            Schedule directly with Jibe sales. Pick an available time, add your details, and the meeting will be placed on the calendar.
          </p>

          <ol className="mt-9 border-y border-[#D9D9D9] py-3">
            {schedulingSteps.map((step, index) => (
              <li
                key={step}
                className="flex min-h-12 items-center gap-4 border-b border-[#E2E2E2] py-3 last:border-b-0"
              >
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#EAF3FB] text-[#0076CE]">
                  {index === 2 ? (
                    <Check aria-hidden="true" size={13} strokeWidth={2.2} />
                  ) : (
                    <span className="font-mono text-[9px] font-semibold">0{index + 1}</span>
                  )}
                </span>
                <span className="text-[13px] font-medium text-[#394957]">{step}</span>
              </li>
            ))}
          </ol>

          <a
            href={salesCalendarUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-7 inline-flex min-h-12 items-center gap-2 rounded-lg border border-[#B8C3CC] px-5 text-[13px] font-semibold text-[#26364A] transition-colors hover:border-[#0076CE] hover:text-[#0076CE] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#0076CE]"
          >
            Open Jake's calendar in a new tab
            <ExternalLink aria-hidden="true" size={14} />
          </a>
        </div>

        <section
          aria-labelledby="sales-calendar-heading"
          className="overflow-hidden rounded-2xl border border-[#CDD6DE] bg-white shadow-[0_24px_70px_rgba(20,43,65,0.09)]"
        >
          <div className="flex flex-col gap-3 border-b border-[#D9E0E6] px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-7">
            <div>
              <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#0076CE]">
                Jibe sales calendar
              </p>
              <h2
                id="sales-calendar-heading"
                className="mt-1.5 text-[20px] font-semibold tracking-[-0.02em] text-[#26364A]"
              >
                Select an available meeting time
              </h2>
            </div>
            <CalendarDays aria-hidden="true" className="text-[#0076CE]" size={24} />
          </div>

          <iframe
            src={salesCalendarUrl}
            title="Schedule a meeting with Jake Raska"
            className="block min-h-[820px] w-full border-0 bg-white sm:min-h-[900px]"
            loading="eager"
            referrerPolicy="strict-origin-when-cross-origin"
          />

          <div className="border-t border-[#D9E0E6] px-5 py-4 text-[11px] leading-[1.55] text-[#697078] sm:px-7">
            If the scheduler does not load, use the “Open calendar in a new tab” link.
          </div>
        </section>
      </div>
    </main>
  );
}
