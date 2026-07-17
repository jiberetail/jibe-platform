import { FormEvent, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { addDays, format, isSameDay, startOfDay } from "date-fns";
import { parsePhoneNumberFromString } from "libphonenumber-js";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Check,
  ChevronLeft,
  ChevronRight,
  Clock3,
  ExternalLink,
  LoaderCircle,
  Mail,
  MessageSquareText,
  Phone,
  UserRound,
} from "lucide-react";
import { Link, useSearchParams } from "react-router";

const providerId = "usr_miG2PPrRWLNpOPVx";
const providerRouteId = "miG2PPrRWLNpOPVx";
const providerSlug = "jake-raska";
const bookingApiBase = "https://go-interactive.herokuapp.com/v1";
const schedulingFallbackUrl =
  "https://www.smsreminder.co/book/miG2PPrRWLNpOPVx/jake-raska";

const productNames: Record<string, string> = {
  pro: "Jibe Pro",
  retail: "Jibe Retail",
  ai: "Jibe AI",
};

type Stage = "schedule" | "details" | "confirmed";

type ProviderDetails = {
  id: string;
  full_name: string;
};

type AppointmentType = {
  id: string;
  name: string;
  duration_minutes: number;
  is_default?: boolean;
};

type AvailabilitySlot = {
  start_time_utc: string;
  end_time_utc: string;
  is_free: boolean;
};

type AvailabilityResponse = {
  slots: AvailabilitySlot[];
  summary?: {
    customerDate?: string;
    date?: string;
  };
};

type ContactDetails = {
  fullName: string;
  email: string;
  phone: string;
  message: string;
};

type ContactErrors = Partial<Record<keyof ContactDetails, string>>;

const emptyContactDetails: ContactDetails = {
  fullName: "",
  email: "",
  phone: "",
  message: "",
};

function parseLocalDate(dateIso: string) {
  return new Date(`${dateIso}T12:00:00`);
}

function dateToIso(date: Date) {
  return format(date, "yyyy-MM-dd");
}

function extractApiError(payload: unknown, fallback: string) {
  if (payload && typeof payload === "object") {
    const body = payload as { message?: unknown; error?: unknown };
    if (typeof body.message === "string") return body.message;
    if (typeof body.error === "string") return body.error;
  }
  return fallback;
}

class BookingApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "BookingApiError";
    this.status = status;
  }
}

async function bookingApiRequest<T>(path: string, init?: RequestInit) {
  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), 12000);

  try {
    const response = await fetch(`${bookingApiBase}${path}`, {
      ...init,
      credentials: "omit",
      signal: controller.signal,
      headers: {
        Accept: "application/json",
        ...(init?.body ? { "Content-Type": "application/json" } : {}),
        ...init?.headers,
      },
    });
    const payload = await response.json().catch(() => null);
    if (!response.ok) {
      throw new BookingApiError(
        extractApiError(payload, "The scheduling service could not complete that request."),
        response.status,
      );
    }
    return payload as T;
  } finally {
    window.clearTimeout(timeout);
  }
}

function getAppointmentTypes() {
  return bookingApiRequest<AppointmentType[]>(`/appointment-types/${providerId}`);
}

function getProviderDetails() {
  return bookingApiRequest<ProviderDetails>(`/bookings/${providerId}/provider-details`);
}

function sanitizeAvailability(payload: unknown): AvailabilityResponse {
  if (!payload || typeof payload !== "object") {
    throw new Error("The scheduling service returned an invalid availability response.");
  }

  const body = payload as { slots?: unknown; summary?: unknown };
  if (!Array.isArray(body.slots)) {
    throw new Error("The scheduling service returned an invalid availability response.");
  }

  const slots = body.slots.flatMap((candidate): AvailabilitySlot[] => {
    if (!candidate || typeof candidate !== "object") return [];
    const slot = candidate as Record<string, unknown>;
    if (
      typeof slot.start_time_utc !== "string" ||
      typeof slot.end_time_utc !== "string" ||
      typeof slot.is_free !== "boolean" ||
      Number.isNaN(Date.parse(slot.start_time_utc)) ||
      Number.isNaN(Date.parse(slot.end_time_utc))
    ) {
      return [];
    }
    return [
      {
        start_time_utc: slot.start_time_utc,
        end_time_utc: slot.end_time_utc,
        is_free: slot.is_free,
      },
    ];
  });

  const rawSummary =
    body.summary && typeof body.summary === "object"
      ? (body.summary as Record<string, unknown>)
      : null;
  const customerDate =
    typeof rawSummary?.customerDate === "string" ? rawSummary.customerDate : undefined;
  const date = typeof rawSummary?.date === "string" ? rawSummary.date : undefined;

  return {
    slots,
    summary: customerDate || date ? { customerDate, date } : undefined,
  };
}

async function getAvailability(appointmentTypeId: string, timezone: string, date?: Date) {
  const query = new URLSearchParams({
    providerId,
    appointmentTypeId,
    customerTz: timezone,
  });
  if (date) query.set("customerDateISO", dateToIso(date));
  const payload = await bookingApiRequest<unknown>(
    `/availability-slots/compute-slots-for-customer-day?${query.toString()}`,
  );
  return sanitizeAvailability(payload);
}

function normalizePhone(value: string) {
  const parsed = parsePhoneNumberFromString(value.trim(), "US");
  return parsed?.isValid() ? parsed.number : null;
}

function validateContact(details: ContactDetails) {
  const errors: ContactErrors = {};
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (details.fullName.trim().length < 5) errors.fullName = "Enter your full name.";
  if (!emailPattern.test(details.email.trim())) errors.email = "Enter a valid work email.";
  if (!normalizePhone(details.phone)) {
    errors.phone = "Enter a valid phone number. Include + and the country code outside the U.S.";
  }
  if (details.message.length > 240) errors.message = "Keep the note under 240 characters.";
  return errors;
}

function bookingIdFromPayload(payload: unknown) {
  if (!payload || typeof payload !== "object") return null;
  const body = payload as { id?: unknown; data?: unknown };
  if (typeof body.id === "string" && body.id.trim()) return body.id;
  if (body.data && typeof body.data === "object") {
    const nestedId = (body.data as { id?: unknown }).id;
    if (typeof nestedId === "string" && nestedId.trim()) return nestedId;
  }
  return null;
}

function compactGoogleDate(dateIso: string) {
  return new Date(dateIso).toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
}

function googleCalendarUrl(slot: AvailabilitySlot) {
  const query = new URLSearchParams({
    action: "TEMPLATE",
    text: "Jibe conversation",
    dates: `${compactGoogleDate(slot.start_time_utc)}/${compactGoogleDate(slot.end_time_utc)}`,
    details: "Conversation with Jibe sales.",
  });
  return `https://calendar.google.com/calendar/render?${query.toString()}`;
}

function SchedulerFallback({ compact = false }: { compact?: boolean }) {
  return (
    <a
      href={schedulingFallbackUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={
        compact
          ? "inline-flex items-center gap-2 text-[12px] font-semibold text-[#51606D] transition-colors hover:text-[#0076CE] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#0076CE]"
          : "inline-flex min-h-12 items-center gap-2 rounded-lg border border-[#B8C3CC] px-5 text-[13px] font-semibold text-[#26364A] transition-colors hover:border-[#0076CE] hover:text-[#0076CE] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#0076CE]"
      }
    >
      Open the backup scheduler
      <ExternalLink aria-hidden="true" size={14} />
    </a>
  );
}

export default function BookDemoPage() {
  const [searchParams] = useSearchParams();
  const requestedProduct = searchParams.get("product") ?? "";
  const productInterest = productNames[requestedProduct];
  const timezone = useMemo(
    () => Intl.DateTimeFormat().resolvedOptions().timeZone || "America/New_York",
    [],
  );
  const earliestDate = useMemo(() => addDays(startOfDay(new Date()), 1), []);
  const [stage, setStage] = useState<Stage>("schedule");
  const [providerName, setProviderName] = useState("Jibe sales");
  const [appointmentType, setAppointmentType] = useState<AppointmentType | null>(null);
  const [availability, setAvailability] = useState<AvailabilityResponse | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<AvailabilitySlot | null>(null);
  const [confirmedSlot, setConfirmedSlot] = useState<AvailabilitySlot | null>(null);
  const [visibleStart, setVisibleStart] = useState(earliestDate);
  const [details, setDetails] = useState<ContactDetails>(emptyContactDetails);
  const [contactErrors, setContactErrors] = useState<ContactErrors>({});
  const [bookingId, setBookingId] = useState("");
  const [initialLoading, setInitialLoading] = useState(true);
  const [slotsLoading, setSlotsLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [bookingOutcomeUnknown, setBookingOutcomeUnknown] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const dayRequestRef = useRef(0);

  const visibleDays = useMemo(
    () => Array.from({ length: 7 }, (_, index) => addDays(visibleStart, index)),
    [visibleStart],
  );
  const availableSlots = useMemo(
    () => availability?.slots.filter((slot) => slot.is_free) ?? [],
    [availability],
  );
  const canMoveBack = visibleStart.getTime() > earliestDate.getTime();

  const formatTime = useCallback(
    (dateIso: string) =>
      new Intl.DateTimeFormat(undefined, {
        hour: "numeric",
        minute: "2-digit",
        timeZone: timezone,
      }).format(new Date(dateIso)),
    [timezone],
  );

  useEffect(() => {
    const previousTitle = document.title;
    const description = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    const previousDescription = description?.content;

    document.title = "Schedule a conversation | Jibe";
    if (description) {
      description.content = "Choose a time and schedule a conversation with Jibe sales.";
    }

    return () => {
      document.title = previousTitle;
      if (description && previousDescription) description.content = previousDescription;
    };
  }, []);

  useEffect(() => {
    let cancelled = false;

    const loadScheduler = async () => {
      setInitialLoading(true);
      setErrorMessage("");
      try {
        const [provider, appointmentTypes] = await Promise.all([
          getProviderDetails(),
          getAppointmentTypes(),
        ]);
        const primaryType =
          appointmentTypes.find((type) => type.is_default) ?? appointmentTypes[0];
        if (!primaryType) throw new Error("No meeting type is currently available.");
        const initialAvailability = await getAvailability(primaryType.id, timezone);
        if (cancelled) return;
        const initialDateIso =
          initialAvailability.summary?.customerDate ?? initialAvailability.summary?.date;
        const initialDate = initialDateIso ? parseLocalDate(initialDateIso) : earliestDate;

        setProviderName(provider.full_name || "Jibe sales");
        setAppointmentType(primaryType);
        setAvailability(initialAvailability);
        setSelectedDate(initialDate);
        setVisibleStart(initialDate);
      } catch (error) {
        if (cancelled) return;
        setErrorMessage(
          error instanceof Error
            ? error.message
            : "The live calendar is temporarily unavailable.",
        );
      } finally {
        if (!cancelled) setInitialLoading(false);
      }
    };

    loadScheduler();
    return () => {
      cancelled = true;
    };
  }, [earliestDate, timezone]);

  const loadDate = useCallback(
    async (date: Date) => {
      if (!appointmentType) return;
      const requestId = dayRequestRef.current + 1;
      dayRequestRef.current = requestId;
      setSelectedDate(date);
      setSelectedSlot(null);
      setSlotsLoading(true);
      setErrorMessage("");

      try {
        const response = await getAvailability(appointmentType.id, timezone, date);
        if (dayRequestRef.current !== requestId) return;
        setAvailability(response);
      } catch (error) {
        if (dayRequestRef.current !== requestId) return;
        setAvailability(null);
        setErrorMessage(
          error instanceof Error ? error.message : "Available times could not be loaded.",
        );
      } finally {
        if (dayRequestRef.current === requestId) setSlotsLoading(false);
      }
    },
    [appointmentType, timezone],
  );

  const updateDetail = (field: keyof ContactDetails, value: string) => {
    setDetails((current) => ({ ...current, [field]: value }));
    if (contactErrors[field]) {
      setContactErrors((current) => ({ ...current, [field]: undefined }));
    }
  };

  const handleDetailsSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!selectedDate || !selectedSlot || !appointmentType || bookingOutcomeUnknown) return;
    const nextErrors = validateContact(details);
    setContactErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;
    const normalizedPhone = normalizePhone(details.phone);
    if (!normalizedPhone) return;

    setSubmitting(true);
    setErrorMessage("");

    let latestAvailability: AvailabilityResponse;
    try {
      latestAvailability = await getAvailability(
        appointmentType.id,
        timezone,
        selectedDate,
      );
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "The selected time could not be checked. Please try again.",
      );
      setSubmitting(false);
      return;
    }

    const latestSlot = latestAvailability.slots.find(
      (slot) => slot.start_time_utc === selectedSlot.start_time_utc && slot.is_free,
    );
    if (!latestSlot) {
      setAvailability(latestAvailability);
      setSelectedSlot(null);
      setStage("schedule");
      setErrorMessage("That time was just booked. Please choose another available time.");
      setSubmitting(false);
      return;
    }

    const customerMessage = [
      productInterest ? `Product interest: ${productInterest}` : "Jibe website conversation",
      `Work email: ${details.email.trim()}`,
      details.message.trim() ? `Message: ${details.message.trim()}` : "",
    ]
      .filter(Boolean)
      .join("\n");

    if (customerMessage.length > 500) {
      setContactErrors((current) => ({
        ...current,
        message: "Shorten this note so the complete message can be sent.",
      }));
      setSubmitting(false);
      return;
    }

    try {
      const bookingPayload = await bookingApiRequest<unknown>("/bookings", {
        method: "POST",
        body: JSON.stringify({
          provider_id: providerId,
          appointment_type_id: appointmentType.id,
          start_time_utc: latestSlot.start_time_utc,
          customer_name: details.fullName.trim(),
          customer_phone: normalizedPhone,
          customer_message: customerMessage,
          customer_tz: timezone,
        }),
      });
      const confirmedBookingId = bookingIdFromPayload(bookingPayload);
      if (!confirmedBookingId) throw new Error("The booking confirmation response was incomplete.");

      setBookingId(confirmedBookingId);
      setConfirmedSlot(latestSlot);
      setStage("confirmed");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (error) {
      if (error instanceof BookingApiError && [409, 422].includes(error.status)) {
        setSelectedSlot(null);
        setStage("schedule");
        try {
          setAvailability(await getAvailability(appointmentType.id, timezone, selectedDate));
        } catch {
          setAvailability(null);
        }
        setErrorMessage("That time is no longer available. Please choose another time.");
      } else if (
        error instanceof BookingApiError &&
        error.status >= 400 &&
        error.status < 500
      ) {
        setErrorMessage(error.message);
      } else {
        setBookingOutcomeUnknown(true);
        setErrorMessage(
          "Your request was sent, but the calendar did not return a clear confirmation. Check your phone for a confirmation message before taking any other action. This form is locked to prevent a duplicate booking.",
        );
      }
    } finally {
      setSubmitting(false);
    }
  };

  const selectedDateLabel = selectedDate
    ? format(selectedDate, "EEEE, MMMM d")
    : "Choose a date";
  const selectedTimeLabel = selectedSlot ? formatTime(selectedSlot.start_time_utc) : "Choose a time";
  const confirmationUrl = bookingId
    ? `https://www.smsreminder.co/booking/${providerRouteId}/${providerSlug}/${bookingId}`
    : schedulingFallbackUrl;

  return (
    <main className="min-h-screen bg-white px-5 pb-24 pt-32 sm:px-6 lg:px-10 lg:pb-32 lg:pt-40">
      <div className="mx-auto max-w-[1320px]">
        <header className="max-w-[920px]">
          <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-[#0076CE]">
            Schedule a conversation
          </p>
          <h1 className="mt-6 font-['Instrument_Serif'] text-[54px] leading-[0.94] tracking-[-0.025em] text-[#2F2F2F] sm:text-[76px] lg:text-[88px]">
            Find a time that works.
          </h1>
          <p className="mt-7 max-w-[700px] text-[16px] leading-[1.75] text-[#5F5F5F] sm:text-[17px]">
            Choose an available time, tell us what you want to explore, and the conversation will be placed directly on the Jibe sales calendar.
          </p>
        </header>

        <div className="mt-14 grid gap-10 border-t border-[#D8E0E7] pt-10 lg:grid-cols-[0.62fr_1.38fr] lg:gap-16">
          <aside className="lg:sticky lg:top-32 lg:self-start">
            <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#66727D]">
              Meeting details
            </p>
            <dl className="mt-5 divide-y divide-[#DFE5EA] border-y border-[#DFE5EA]">
              <div className="flex items-center gap-4 py-4">
                <Clock3 aria-hidden="true" size={18} className="text-[#0076CE]" />
                <div>
                  <dt className="text-[11px] uppercase tracking-[0.12em] text-[#7A838A]">Duration</dt>
                  <dd className="mt-1 text-[14px] font-semibold text-[#2F4050]">
                    {appointmentType?.duration_minutes ?? 30} minutes
                  </dd>
                </div>
              </div>
              <div className="flex items-center gap-4 py-4">
                <CalendarDays aria-hidden="true" size={18} className="text-[#0076CE]" />
                <div>
                  <dt className="text-[11px] uppercase tracking-[0.12em] text-[#7A838A]">Calendar</dt>
                  <dd className="mt-1 text-[14px] font-semibold text-[#2F4050]">
                    Live availability with Jibe sales
                  </dd>
                </div>
              </div>
              {productInterest && (
                <div className="flex items-center gap-4 py-4">
                  <MessageSquareText aria-hidden="true" size={18} className="text-[#0076CE]" />
                  <div>
                    <dt className="text-[11px] uppercase tracking-[0.12em] text-[#7A838A]">Interest</dt>
                    <dd className="mt-1 text-[14px] font-semibold text-[#2F4050]">{productInterest}</dd>
                  </div>
                </div>
              )}
            </dl>
            <p className="mt-6 max-w-[360px] text-[12px] leading-[1.65] text-[#70777D]">
              Times are shown in {timezone.replace(/_/g, " ")}. Your selected time is checked again before the meeting is confirmed.
            </p>
            <div className="mt-6">
              <SchedulerFallback compact />
            </div>
          </aside>

          <section aria-labelledby="scheduler-heading" className="min-w-0">
            <div className="mb-8 flex items-center gap-7 border-b border-[#D8E0E7]" aria-label="Scheduling progress">
              <span
                className={`pb-4 text-[12px] font-semibold transition-colors ${stage === "schedule" ? "border-b-2 border-[#0076CE] text-[#0076CE]" : "text-[#7B858E]"}`}
              >
                Date & time
              </span>
              <span
                className={`pb-4 text-[12px] font-semibold transition-colors ${stage === "details" ? "border-b-2 border-[#0076CE] text-[#0076CE]" : "text-[#7B858E]"}`}
              >
                Your details
              </span>
              <span
                className={`pb-4 text-[12px] font-semibold transition-colors ${stage === "confirmed" ? "border-b-2 border-[#0076CE] text-[#0076CE]" : "text-[#7B858E]"}`}
              >
                Confirmed
              </span>
            </div>

            {initialLoading ? (
              <div className="flex min-h-[520px] items-center justify-center rounded-[28px] bg-[#F5F8FB]">
                <div className="text-center text-[#556572]">
                  <LoaderCircle aria-hidden="true" className="mx-auto animate-spin text-[#0076CE]" size={28} />
                  <p className="mt-4 text-[13px] font-semibold">Loading live availability</p>
                </div>
              </div>
            ) : errorMessage && !appointmentType ? (
              <div className="flex min-h-[440px] flex-col items-start justify-center rounded-[28px] bg-[#F5F8FB] p-8 sm:p-12">
                <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#0076CE]">Calendar unavailable</p>
                <h2 id="scheduler-heading" className="mt-4 max-w-[560px] text-[34px] font-semibold tracking-[-0.035em] text-[#26364A]">
                  The live calendar did not load.
                </h2>
                <p className="mt-4 max-w-[560px] text-[14px] leading-[1.7] text-[#64717C]">{errorMessage}</p>
                <div className="mt-7">
                  <SchedulerFallback />
                </div>
              </div>
            ) : stage === "schedule" ? (
              <div className="rounded-[28px] bg-[#F5F8FB] p-5 sm:p-8 lg:p-10">
                <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#0076CE]">Live calendar</p>
                    <h2 id="scheduler-heading" className="mt-3 text-[32px] font-semibold tracking-[-0.035em] text-[#26364A] sm:text-[38px]">
                      Choose your date and time.
                    </h2>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      aria-label="Show earlier dates"
                      disabled={!canMoveBack}
                      onClick={() =>
                        setVisibleStart((current) => {
                          const previous = addDays(current, -7);
                          return previous < earliestDate ? earliestDate : previous;
                        })
                      }
                      className="flex h-11 w-11 items-center justify-center rounded-full border border-[#C7D2DC] bg-white text-[#2F4050] transition-colors hover:border-[#0076CE] hover:text-[#0076CE] disabled:cursor-not-allowed disabled:opacity-35 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0076CE]"
                    >
                      <ChevronLeft aria-hidden="true" size={18} />
                    </button>
                    <button
                      type="button"
                      aria-label="Show later dates"
                      onClick={() => setVisibleStart((current) => addDays(current, 7))}
                      className="flex h-11 w-11 items-center justify-center rounded-full border border-[#C7D2DC] bg-white text-[#2F4050] transition-colors hover:border-[#0076CE] hover:text-[#0076CE] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0076CE]"
                    >
                      <ChevronRight aria-hidden="true" size={18} />
                    </button>
                  </div>
                </div>

                <p className="mt-8 text-[13px] font-semibold text-[#4B5A67]">{format(visibleStart, "MMMM yyyy")}</p>
                <div className="mt-3 grid grid-cols-4 gap-2 sm:grid-cols-7">
                  {visibleDays.map((date) => {
                    const selected = selectedDate ? isSameDay(date, selectedDate) : false;
                    return (
                      <button
                        key={date.toISOString()}
                        type="button"
                        aria-pressed={selected}
                        aria-label={format(date, "EEEE, MMMM d")}
                        onClick={() => loadDate(date)}
                        className={`min-h-[86px] rounded-xl border px-2 py-3 text-center transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0076CE] ${
                          selected
                            ? "border-[#0076CE] bg-[#0076CE] text-white shadow-[0_10px_24px_rgba(0,118,206,0.16)]"
                            : "border-[#D0D9E1] bg-white text-[#334655] hover:-translate-y-0.5 hover:border-[#7CA8CB]"
                        }`}
                      >
                        <span className={`block text-[10px] font-semibold uppercase tracking-[0.12em] ${selected ? "text-white/72" : "text-[#7B858E]"}`}>
                          {format(date, "EEE")}
                        </span>
                        <span className="mt-2 block text-[24px] font-semibold leading-none">{format(date, "d")}</span>
                      </button>
                    );
                  })}
                </div>

                <div className="mt-9 border-t border-[#D8E0E7] pt-8">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <h3 className="text-[18px] font-semibold text-[#26364A]">Available times</h3>
                    <p className="text-[11px] text-[#75808A]">{selectedDateLabel} · {timezone.replace(/_/g, " ")}</p>
                  </div>

                  <div className="mt-5 min-h-[170px]">
                    {slotsLoading ? (
                      <div className="flex min-h-[150px] items-center justify-center text-[#687580]">
                        <LoaderCircle aria-hidden="true" className="mr-3 animate-spin text-[#0076CE]" size={20} />
                        <span className="text-[13px] font-medium">Checking the calendar</span>
                      </div>
                    ) : availableSlots.length > 0 ? (
                      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
                        {availableSlots.map((slot) => {
                          const selected = selectedSlot?.start_time_utc === slot.start_time_utc;
                          return (
                            <button
                              key={slot.start_time_utc}
                              type="button"
                              aria-pressed={selected}
                              onClick={() => {
                                setSelectedSlot(slot);
                                setErrorMessage("");
                              }}
                              className={`min-h-12 rounded-lg border px-3 text-[13px] font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0076CE] ${
                                selected
                                  ? "border-[#0076CE] bg-[#E5F2FC] text-[#0066B3]"
                                  : "border-[#CBD6DF] bg-white text-[#344857] hover:border-[#0076CE] hover:text-[#0076CE]"
                              }`}
                            >
                              {formatTime(slot.start_time_utc)}
                            </button>
                          );
                        })}
                      </div>
                    ) : (
                      <div className="flex min-h-[150px] flex-col items-start justify-center border-y border-[#D8E0E7] py-5">
                        <p className="text-[14px] font-semibold text-[#344857]">No times are open on this date.</p>
                        <button
                          type="button"
                          onClick={() => setVisibleStart((current) => addDays(current, 7))}
                          className="mt-3 inline-flex items-center gap-2 text-[12px] font-semibold text-[#0076CE] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0076CE]"
                        >
                          Show later dates <ArrowRight aria-hidden="true" size={14} />
                        </button>
                      </div>
                    )}
                  </div>

                  {errorMessage && (
                    <p role="alert" className="mt-4 rounded-lg border border-[#D7E1E9] bg-white px-4 py-3 text-[12px] leading-[1.6] text-[#8A3F3F]">
                      {errorMessage} <SchedulerFallback compact />
                    </p>
                  )}

                  <div className="mt-7 flex flex-col gap-4 border-t border-[#D8E0E7] pt-6 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-[11px] uppercase tracking-[0.11em] text-[#7A838A]">Your selection</p>
                      <p className="mt-1 text-[14px] font-semibold text-[#26364A]">{selectedDateLabel} · {selectedTimeLabel}</p>
                    </div>
                    <button
                      type="button"
                      disabled={!selectedDate || !selectedSlot}
                      onClick={() => setStage("details")}
                      className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-[#0076CE] px-6 text-[13px] font-semibold text-white transition-colors hover:bg-[#005FA7] disabled:cursor-not-allowed disabled:bg-[#AEBCC7] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#0076CE]"
                    >
                      Continue <ArrowRight aria-hidden="true" size={15} />
                    </button>
                  </div>
                </div>
              </div>
            ) : stage === "details" ? (
              <div className="rounded-[28px] bg-[#F5F8FB] p-5 sm:p-8 lg:p-10">
                <button
                  type="button"
                  disabled={submitting || bookingOutcomeUnknown}
                  onClick={() => {
                    setStage("schedule");
                    setErrorMessage("");
                  }}
                  className="inline-flex items-center gap-2 text-[12px] font-semibold text-[#506170] transition-colors hover:text-[#0076CE] disabled:cursor-not-allowed disabled:opacity-45 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0076CE]"
                >
                  <ArrowLeft aria-hidden="true" size={14} /> Back to times
                </button>
                <h2 id="scheduler-heading" className="mt-6 text-[34px] font-semibold tracking-[-0.035em] text-[#26364A] sm:text-[40px]">
                  Tell us who is joining.
                </h2>

                <div className="mt-6 grid gap-3 rounded-2xl border border-[#D1DCE5] bg-white p-5 sm:grid-cols-2">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.12em] text-[#7B858E]">Date</p>
                    <p className="mt-1 text-[14px] font-semibold text-[#2F4050]">{selectedDateLabel}</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.12em] text-[#7B858E]">Time</p>
                    <p className="mt-1 text-[14px] font-semibold text-[#2F4050]">{selectedTimeLabel} · {timezone.replace(/_/g, " ")}</p>
                  </div>
                </div>

                <form className="mt-8" onSubmit={handleDetailsSubmit} noValidate>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <label className="block">
                      <span className="flex items-center gap-2 text-[12px] font-semibold text-[#334655]">
                        <UserRound aria-hidden="true" size={15} className="text-[#0076CE]" /> Full name
                      </span>
                      <input
                        type="text"
                        autoComplete="name"
                        maxLength={120}
                        value={details.fullName}
                        onChange={(event) => updateDetail("fullName", event.target.value)}
                        aria-invalid={Boolean(contactErrors.fullName)}
                        className="mt-2 min-h-12 w-full rounded-lg border border-[#C8D3DC] bg-white px-4 text-[14px] text-[#26364A] outline-none transition-colors placeholder:text-[#9AA4AC] focus:border-[#0076CE] focus:ring-2 focus:ring-[#0076CE]/15"
                        placeholder="Your full name"
                      />
                      {contactErrors.fullName && <span className="mt-1.5 block text-[11px] text-[#9A4444]">{contactErrors.fullName}</span>}
                    </label>

                    <label className="block">
                      <span className="flex items-center gap-2 text-[12px] font-semibold text-[#334655]">
                        <Mail aria-hidden="true" size={15} className="text-[#0076CE]" /> Work email
                      </span>
                      <input
                        type="email"
                        autoComplete="email"
                        maxLength={160}
                        value={details.email}
                        onChange={(event) => updateDetail("email", event.target.value)}
                        aria-invalid={Boolean(contactErrors.email)}
                        className="mt-2 min-h-12 w-full rounded-lg border border-[#C8D3DC] bg-white px-4 text-[14px] text-[#26364A] outline-none transition-colors placeholder:text-[#9AA4AC] focus:border-[#0076CE] focus:ring-2 focus:ring-[#0076CE]/15"
                        placeholder="you@company.com"
                      />
                      {contactErrors.email && <span className="mt-1.5 block text-[11px] text-[#9A4444]">{contactErrors.email}</span>}
                    </label>

                    <label className="block sm:col-span-2">
                      <span className="flex items-center gap-2 text-[12px] font-semibold text-[#334655]">
                        <Phone aria-hidden="true" size={15} className="text-[#0076CE]" /> Mobile number
                      </span>
                      <input
                        type="tel"
                        inputMode="tel"
                        autoComplete="tel"
                        maxLength={24}
                        value={details.phone}
                        onChange={(event) => updateDetail("phone", event.target.value)}
                        aria-invalid={Boolean(contactErrors.phone)}
                        className="mt-2 min-h-12 w-full rounded-lg border border-[#C8D3DC] bg-white px-4 text-[14px] text-[#26364A] outline-none transition-colors placeholder:text-[#9AA4AC] focus:border-[#0076CE] focus:ring-2 focus:ring-[#0076CE]/15"
                        placeholder="+1 555 555 5555"
                      />
                      {contactErrors.phone && <span className="mt-1.5 block text-[11px] text-[#9A4444]">{contactErrors.phone}</span>}
                    </label>

                    <label className="block sm:col-span-2">
                      <span className="flex items-center gap-2 text-[12px] font-semibold text-[#334655]">
                        <MessageSquareText aria-hidden="true" size={15} className="text-[#0076CE]" /> What would you like to discuss? <span className="font-normal text-[#8A949C]">Optional</span>
                      </span>
                      <textarea
                        rows={4}
                        maxLength={240}
                        value={details.message}
                        onChange={(event) => updateDetail("message", event.target.value)}
                        aria-invalid={Boolean(contactErrors.message)}
                        className="mt-2 w-full resize-y rounded-lg border border-[#C8D3DC] bg-white px-4 py-3 text-[14px] leading-[1.6] text-[#26364A] outline-none transition-colors placeholder:text-[#9AA4AC] focus:border-[#0076CE] focus:ring-2 focus:ring-[#0076CE]/15"
                        placeholder={productInterest ? `Tell us what you want to explore with ${productInterest}.` : "Tell us what would make the conversation useful."}
                      />
                      <span className="mt-1.5 flex justify-between text-[10px] text-[#8A949C]">
                        <span>{contactErrors.message ?? ""}</span>
                        <span>{details.message.length}/240</span>
                      </span>
                    </label>
                  </div>

                  {errorMessage && (
                    <p role="alert" className="mt-5 rounded-lg border border-[#D7E1E9] bg-white px-4 py-3 text-[12px] leading-[1.6] text-[#8A3F3F]">
                      {errorMessage}
                    </p>
                  )}

                  <div className="mt-7 flex flex-col gap-4 border-t border-[#D8E0E7] pt-6 sm:flex-row sm:items-center sm:justify-between">
                    <p className="max-w-[510px] text-[11px] leading-[1.65] text-[#76818A]">
                      By confirming, your name, work email, mobile number, and note are shared with{" "}
                      <a
                        href={schedulingFallbackUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-semibold text-[#526779] underline decoration-[#AAB8C3] underline-offset-2 hover:text-[#0076CE]"
                      >
                        SMS Reminder
                      </a>
                      , the scheduling provider connected to Jake&apos;s calendar, to create the meeting and send confirmations and reminders.
                    </p>
                    <button
                      type="submit"
                      disabled={submitting || bookingOutcomeUnknown}
                      className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-[#0076CE] px-6 text-[13px] font-semibold text-white transition-colors hover:bg-[#005FA7] disabled:cursor-not-allowed disabled:bg-[#87AFCC] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#0076CE]"
                    >
                      {submitting ? (
                        <>
                          <LoaderCircle aria-hidden="true" className="animate-spin" size={16} /> Confirming
                        </>
                      ) : bookingOutcomeUnknown ? (
                        <>Check your messages</>
                      ) : (
                        <>
                          Confirm meeting <ArrowRight aria-hidden="true" size={15} />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              <div className="flex min-h-[560px] flex-col justify-center rounded-[28px] bg-[#F5F8FB] p-7 sm:p-12 lg:p-16">
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[#0076CE] text-white">
                  <Check aria-hidden="true" size={25} strokeWidth={2.2} />
                </span>
                <p className="mt-8 font-mono text-[9px] uppercase tracking-[0.2em] text-[#0076CE]">Meeting confirmed</p>
                <h2 id="scheduler-heading" className="mt-4 max-w-[640px] font-['Instrument_Serif'] text-[48px] leading-[0.98] tracking-[-0.025em] text-[#2F2F2F] sm:text-[64px]">
                  The conversation is on the calendar.
                </h2>
                <p className="mt-6 max-w-[620px] text-[15px] leading-[1.75] text-[#5F6A73]">
                  You are scheduled with {providerName}. A confirmation and reminder will be sent to the mobile number you provided.
                </p>

                <div className="mt-8 grid max-w-[680px] gap-4 border-y border-[#D3DCE4] py-6 sm:grid-cols-2">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.12em] text-[#7B858E]">Date</p>
                    <p className="mt-1.5 text-[15px] font-semibold text-[#2F4050]">{selectedDateLabel}</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.12em] text-[#7B858E]">Time</p>
                    <p className="mt-1.5 text-[15px] font-semibold text-[#2F4050]">
                      {confirmedSlot ? formatTime(confirmedSlot.start_time_utc) : selectedTimeLabel} · {timezone.replace(/_/g, " ")}
                    </p>
                  </div>
                </div>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  {confirmedSlot && (
                    <a
                      href={googleCalendarUrl(confirmedSlot)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-[#0076CE] px-6 text-[13px] font-semibold text-white transition-colors hover:bg-[#005FA7] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#0076CE]"
                    >
                      Add to Google Calendar <ExternalLink aria-hidden="true" size={14} />
                    </a>
                  )}
                  <a
                    href={confirmationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-[#B8C3CC] bg-white px-6 text-[13px] font-semibold text-[#26364A] transition-colors hover:border-[#0076CE] hover:text-[#0076CE] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#0076CE]"
                  >
                    View booking details <ExternalLink aria-hidden="true" size={14} />
                  </a>
                </div>

                <Link
                  to="/"
                  className="mt-8 inline-flex w-fit items-center gap-2 text-[12px] font-semibold text-[#596773] transition-colors hover:text-[#0076CE] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#0076CE]"
                >
                  Return to Jibe <ArrowRight aria-hidden="true" size={14} />
                </Link>
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}
