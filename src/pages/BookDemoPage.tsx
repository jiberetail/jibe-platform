import { useMemo, useState } from "react";
import { ArrowRight, Check, Mail, Phone } from "lucide-react";
import { useSearchParams } from "react-router";

const productOptions = [
  { value: "all", label: "Help me choose", description: "A guided look across the Jibe portfolio" },
  { value: "pro", label: "Jibe Pro", description: "Customer experience and frontline performance" },
  { value: "retail", label: "Jibe Retail", description: "Missed demand, fulfillment, and retail intelligence" },
  { value: "ai", label: "Jibe AI", description: "Interaction intelligence, prediction, and action" },
];

const initialForm = {
  firstName: "",
  lastName: "",
  email: "",
  company: "",
  title: "",
  message: "",
};

type FormKey = keyof typeof initialForm;

export default function BookDemoPage() {
  const [searchParams] = useSearchParams();
  const requestedProduct = searchParams.get("product") ?? "all";
  const initialProduct = productOptions.some((option) => option.value === requestedProduct) ? requestedProduct : "all";
  const [product, setProduct] = useState(initialProduct);
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState<Partial<Record<FormKey, string>>>({});
  const [emailPrepared, setEmailPrepared] = useState(false);

  const selectedProduct = useMemo(
    () => productOptions.find((option) => option.value === product) ?? productOptions[0],
    [product],
  );

  const setField = (key: FormKey, value: string) => {
    setForm((current) => ({ ...current, [key]: value }));
    if (errors[key]) setErrors((current) => ({ ...current, [key]: undefined }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors: Partial<Record<FormKey, string>> = {};
    if (!form.firstName.trim()) nextErrors.firstName = "Please enter your first name.";
    if (!form.lastName.trim()) nextErrors.lastName = "Please enter your last name.";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) nextErrors.email = "Please enter a valid work email.";
    if (!form.company.trim()) nextErrors.company = "Please enter your company.";

    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      return;
    }

    const subject = `Jibe demo request — ${selectedProduct.label}`;
    const body = [
      `Product interest: ${selectedProduct.label}`,
      `Name: ${form.firstName} ${form.lastName}`,
      `Work email: ${form.email}`,
      `Company: ${form.company}`,
      `Title: ${form.title || "Not provided"}`,
      "",
      "What we would like to explore:",
      form.message || "Please contact me to arrange a tailored demo.",
    ].join("\n");

    setEmailPrepared(true);
    window.location.href = `mailto:info@zacoustic.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <main className="jibe-demo-page min-h-screen bg-[#F7F7F4] px-6 pb-24 pt-36 lg:px-10 lg:pb-32 lg:pt-44">
      <div className="mx-auto grid max-w-[1240px] gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
        <div className="jibe-demo-intro">
          <p className="jibe-ui-eyebrow inline-flex">Book a demo</p>
          <h1 className="mt-6 font-['Inter'] text-[46px] font-semibold leading-[1] tracking-[-0.04em] text-[#2F2F2F] sm:text-[62px]">
            Let&apos;s make every interaction count.
          </h1>
          <p className="mt-7 max-w-[500px] text-[16px] leading-[1.7] text-[#686A6D]">
            Tell us what you want to improve. We&apos;ll shape the conversation around the right Jibe product, your environment, and the outcomes that matter.
          </p>

          <div className="mt-10 space-y-3">
            {["A focused 30-minute conversation", "A product walkthrough tailored to your use case", "Clear next steps—without a generic sales script"].map((item) => (
              <div key={item} className="flex items-center gap-3 text-[14px] text-[#4E504D]">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#EAF5FC] text-[#0076CE]"><Check size={13} /></span>
                {item}
              </div>
            ))}
          </div>

          <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
            <a href="mailto:info@zacoustic.com" className="rounded-2xl border border-[#D9D9D5] bg-white p-5 transition-colors hover:border-[#0076CE]">
              <Mail size={18} className="text-[#0076CE]" />
              <span className="mt-4 block font-mono text-[9px] uppercase tracking-[0.18em] text-[#8B8D89]">Email</span>
              <span className="mt-1 block text-[13px] font-semibold text-[#2F2F2F]">info@zacoustic.com</span>
            </a>
            <a href="tel:+18777342473" className="rounded-2xl border border-[#D9D9D5] bg-white p-5 transition-colors hover:border-[#0076CE]">
              <Phone size={18} className="text-[#0076CE]" />
              <span className="mt-4 block font-mono text-[9px] uppercase tracking-[0.18em] text-[#8B8D89]">Phone</span>
              <span className="mt-1 block text-[13px] font-semibold text-[#2F2F2F]">(877) 734-2473</span>
            </a>
          </div>
        </div>

        <div className="jibe-ui-panel rounded-[28px] border border-[#D9D9D5] border-l-4 border-l-[#0076CE] bg-white p-6 shadow-[0_24px_70px_rgba(25,31,38,0.09)] sm:p-8 lg:p-10">
          <div className="border-b border-[#E1E3DF] pb-7">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#777976]">Choose your conversation</p>
            <div className="mt-4 grid gap-2 sm:grid-cols-2">
              {productOptions.map((option) => (
                <button
                  type="button"
                  key={option.value}
                  onClick={() => setProduct(option.value)}
                  aria-pressed={product === option.value}
                  className={`rounded-lg border p-4 text-left transition-all focus-visible:outline-2 focus-visible:outline-[#0076CE] ${
                    product === option.value ? "border-[#0076CE] bg-[#EDF7FD]" : "border-[#D9D9D5] bg-white hover:border-[#9FCFEB]"
                  }`}
                >
                  <span className={`block text-[13px] font-semibold ${product === option.value ? "text-[#0076CE]" : "text-[#2F2F2F]"}`}>{option.label}</span>
                  <span className="mt-1 block text-[11px] leading-relaxed text-[#777976]">{option.description}</span>
                </button>
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit} noValidate className="mt-7 space-y-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <Field id="firstName" label="First name" error={errors.firstName} required>
                <input id="firstName" autoComplete="given-name" value={form.firstName} onChange={(event) => setField("firstName", event.target.value)} className={fieldClass(Boolean(errors.firstName))} aria-invalid={Boolean(errors.firstName)} aria-describedby={errors.firstName ? "firstName-error" : undefined} />
              </Field>
              <Field id="lastName" label="Last name" error={errors.lastName} required>
                <input id="lastName" autoComplete="family-name" value={form.lastName} onChange={(event) => setField("lastName", event.target.value)} className={fieldClass(Boolean(errors.lastName))} aria-invalid={Boolean(errors.lastName)} aria-describedby={errors.lastName ? "lastName-error" : undefined} />
              </Field>
            </div>

            <Field id="email" label="Work email" error={errors.email} required>
              <input id="email" type="email" autoComplete="email" value={form.email} onChange={(event) => setField("email", event.target.value)} className={fieldClass(Boolean(errors.email))} aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? "email-error" : undefined} />
            </Field>

            <div className="grid gap-5 sm:grid-cols-2">
              <Field id="company" label="Company" error={errors.company} required>
                <input id="company" autoComplete="organization" value={form.company} onChange={(event) => setField("company", event.target.value)} className={fieldClass(Boolean(errors.company))} aria-invalid={Boolean(errors.company)} aria-describedby={errors.company ? "company-error" : undefined} />
              </Field>
              <Field id="title" label="Role">
                <input id="title" autoComplete="organization-title" value={form.title} onChange={(event) => setField("title", event.target.value)} className={fieldClass(false)} />
              </Field>
            </div>

            <Field id="message" label="What would you like to improve?">
              <textarea id="message" value={form.message} onChange={(event) => setField("message", event.target.value)} className={`${fieldClass(false)} min-h-[120px] resize-y`} placeholder="Tell us about the challenge, team, or customer journey you want to explore." />
            </Field>

            <button type="submit" className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#0076CE] px-6 py-4 text-[15px] font-semibold text-white transition-colors hover:bg-[#005FA7] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0076CE]">
              Prepare My Demo Request
              <ArrowRight size={16} />
            </button>

            <p className="text-center text-[11px] leading-relaxed text-[#8B8D89]">
              Your email app will open with your request ready to send. Jibe does not store this form data on the site.
            </p>

            {emailPrepared && (
              <div role="status" className="rounded-xl border border-[#B9DDF4] bg-[#EDF7FD] p-4 text-[12px] leading-relaxed text-[#005A9C]">
                Your demo request is ready in your email app. If it did not open, email <a className="font-semibold underline" href="mailto:info@zacoustic.com">info@zacoustic.com</a>.
              </div>
            )}
          </form>
        </div>
      </div>
    </main>
  );
}

function Field({ id, label, error, required, children }: { id: string; label: string; error?: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block font-mono text-[10px] uppercase tracking-[0.16em] text-[#6D6D69]">
        {label}{required && <span className="ml-1 text-[#0076CE]">*</span>}
      </label>
      {children}
      {error && <p id={`${id}-error`} className="mt-1.5 text-[11px] text-[#A13B34]">{error}</p>}
    </div>
  );
}

function fieldClass(invalid: boolean) {
  return `w-full rounded-lg border bg-white px-4 py-3.5 text-[14px] text-[#2F2F2F] outline-none transition-all placeholder:text-[#A7AAA5] focus:border-[#0076CE] focus:ring-4 focus:ring-[#0076CE]/10 ${invalid ? "border-[#B85A50]" : "border-[#D2D4D0]"}`;
}
