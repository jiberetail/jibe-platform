import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { ArrowLeft, Check, Copy, Download, ExternalLink, Phone, Share2 } from "lucide-react";
import { useSearchParams } from "react-router";

const productOptions = [
  { value: "all", label: "Help me choose", description: "Find the right starting point across the Jibe portfolio" },
  { value: "pro", label: "Jibe Pro", description: "Frontline predictions, customer feedback, QA, and coaching" },
  { value: "retail", label: "Jibe Retail", description: "In-venue ecommerce, surveys, or both" },
  { value: "ai", label: "Jibe AI", description: "AI-generated structured survey predictions and evidence" },
] as const;

const conversationOptions = [
  { value: "fit", label: "Explore product fit" },
  { value: "walkthrough", label: "Request a product walkthrough" },
  { value: "deployment", label: "Discuss deployment" },
  { value: "question", label: "Ask a product question" },
] as const;

type ProductValue = (typeof productOptions)[number]["value"];
type ConversationValue = (typeof conversationOptions)[number]["value"];
type FieldName = "name" | "organization" | "email" | "role" | "conversation" | "challenge";

type ConversationFields = {
  name: string;
  organization: string;
  email: string;
  role: string;
  conversation: ConversationValue | "";
  challenge: string;
};

type FormErrors = Partial<Record<FieldName, string>>;

const emptyFields: ConversationFields = {
  name: "",
  organization: "",
  email: "",
  role: "",
  conversation: "",
  challenge: "",
};

const fieldClass =
  "mt-2 min-h-12 w-full rounded-lg border border-[#C8D0D8] bg-white px-3.5 py-3 text-[14px] text-[#26364A] outline-none transition-colors placeholder:text-[#8A8D91] hover:border-[#7F9AB3] focus:border-[#0076CE] focus:ring-2 focus:ring-[#0076CE]/20";

const currentMessageForm = "https://jiberetail.com/ola/services/jibe-retail-product-demo";

const isProductValue = (value: string): value is ProductValue =>
  productOptions.some((option) => option.value === value);

function validateFields(fields: ConversationFields): FormErrors {
  const errors: FormErrors = {};
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (fields.name.trim().length < 2) errors.name = "Enter your name.";
  if (fields.organization.trim().length < 2) errors.organization = "Enter your organization.";
  if (!emailPattern.test(fields.email.trim())) errors.email = "Enter a valid work email address.";
  if (!fields.conversation) errors.conversation = "Choose what you would like to do.";
  if (fields.challenge.trim().length < 20) {
    errors.challenge = "Add at least 20 characters so the conversation has a useful starting point.";
  }

  return errors;
}

function copyWithFallback(text: string) {
  if (navigator.clipboard?.writeText) return navigator.clipboard.writeText(text);

  const textArea = document.createElement("textarea");
  textArea.value = text;
  textArea.style.position = "fixed";
  textArea.style.opacity = "0";
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  const copied = document.execCommand("copy");
  textArea.remove();
  return copied ? Promise.resolve() : Promise.reject(new Error("Copy failed"));
}

export default function BookDemoPage() {
  const [searchParams] = useSearchParams();
  const requestedProduct = searchParams.get("product") ?? "all";
  const initialProduct: ProductValue = isProductValue(requestedProduct) ? requestedProduct : "all";
  const [product, setProduct] = useState<ProductValue>(initialProduct);
  const [fields, setFields] = useState<ConversationFields>(emptyFields);
  const [errors, setErrors] = useState<FormErrors>({});
  const [completedFields, setCompletedFields] = useState<ConversationFields | null>(null);
  const [completedProduct, setCompletedProduct] = useState<ProductValue>(initialProduct);
  const [actionMessage, setActionMessage] = useState("");
  const [actionError, setActionError] = useState(false);
  const [shareAvailable, setShareAvailable] = useState(false);
  const formHeadingRef = useRef<HTMLHeadingElement>(null);
  const readyHeadingRef = useRef<HTMLHeadingElement>(null);

  const selectedProduct = useMemo(
    () => productOptions.find((option) => option.value === product) ?? productOptions[0],
    [product],
  );
  const completedProductDetails = useMemo(
    () => productOptions.find((option) => option.value === completedProduct) ?? productOptions[0],
    [completedProduct],
  );

  useEffect(() => {
    if (isProductValue(requestedProduct)) setProduct(requestedProduct);
  }, [requestedProduct]);

  useEffect(() => {
    setShareAvailable(typeof navigator.share === "function");
    const previousTitle = document.title;
    const description = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    const previousDescription = description?.content;

    document.title = "Start a conversation | Jibe";
    if (description) {
      description.content = "Prepare a concise conversation brief and explore which Jibe product fits your operation.";
    }

    return () => {
      document.title = previousTitle;
      if (description && previousDescription) description.content = previousDescription;
    };
  }, []);

  const updateField = <Key extends keyof ConversationFields>(key: Key, value: ConversationFields[Key]) => {
    setFields((current) => ({ ...current, [key]: value }));
    if (errors[key]) setErrors((current) => ({ ...current, [key]: undefined }));
  };

  const createBrief = (details: ConversationFields, productValue: ProductValue) => {
    const productDetails = productOptions.find((option) => option.value === productValue) ?? productOptions[0];
    const conversationDetails = conversationOptions.find((option) => option.value === details.conversation);

    return [
      "JIBE CONVERSATION BRIEF",
      "",
      `Product: ${productDetails.label}`,
      `Conversation: ${conversationDetails?.label ?? "General product conversation"}`,
      "",
      `Name: ${details.name.trim()}`,
      `Organization: ${details.organization.trim()}`,
      ...(details.role.trim() ? [`Role: ${details.role.trim()}`] : []),
      `Work email: ${details.email.trim()}`,
      "",
      "CHALLENGE OR QUESTION",
      details.challenge.trim(),
    ].join("\n");
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validateFields(fields);
    setErrors(nextErrors);
    setActionMessage("");

    const firstInvalidField = (Object.keys(nextErrors) as FieldName[])[0];
    if (firstInvalidField) {
      window.requestAnimationFrame(() => {
        document.querySelector<HTMLElement>(`[name="${firstInvalidField}"]`)?.focus();
      });
      return;
    }

    setCompletedFields({
      ...fields,
      name: fields.name.trim(),
      organization: fields.organization.trim(),
      email: fields.email.trim(),
      role: fields.role.trim(),
      challenge: fields.challenge.trim(),
    });
    setCompletedProduct(product);
    window.requestAnimationFrame(() => readyHeadingRef.current?.focus());
  };

  const handleCopy = async () => {
    if (!completedFields) return;
    try {
      await copyWithFallback(createBrief(completedFields, completedProduct));
      setActionError(false);
      setActionMessage("Conversation brief copied. Paste it into the channel you use to communicate with Jibe.");
    } catch {
      setActionError(true);
      setActionMessage("The brief could not be copied. Download it instead.");
    }
  };

  const handleDownload = () => {
    if (!completedFields) return;
    try {
      const file = new Blob([createBrief(completedFields, completedProduct)], { type: "text/plain;charset=utf-8" });
      const url = URL.createObjectURL(file);
      const link = document.createElement("a");
      link.href = url;
      link.download = "jibe-conversation-brief.txt";
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(url);
      setActionError(false);
      setActionMessage("Conversation brief downloaded.");
    } catch {
      setActionError(true);
      setActionMessage("The brief could not be downloaded. Copy it instead.");
    }
  };

  const handleShare = async () => {
    if (!completedFields || typeof navigator.share !== "function") return;
    try {
      await navigator.share({
        title: "Jibe conversation brief",
        text: createBrief(completedFields, completedProduct),
      });
      setActionError(false);
      setActionMessage("Conversation brief shared from your device.");
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") return;
      setActionError(true);
      setActionMessage("The brief could not be shared. Copy or download it instead.");
    }
  };

  const handleOpenMessageForm = async () => {
    if (!completedFields) return;
    try {
      await copyWithFallback(createBrief(completedFields, completedProduct));
      setActionError(false);
      setActionMessage("Conversation brief copied. Paste it into the Jibe message form.");
    } catch {
      setActionError(true);
      setActionMessage("The brief could not be copied. You can return and download it after contacting Jibe.");
    }
    window.location.assign(currentMessageForm);
  };

  const handleEdit = () => {
    setCompletedFields(null);
    setActionMessage("");
    setActionError(false);
    window.requestAnimationFrame(() => formHeadingRef.current?.focus());
  };

  return (
    <main className="min-h-screen bg-[#F5F5F5] px-5 pb-24 pt-32 sm:px-6 lg:px-10 lg:pb-32 lg:pt-40">
      <div className="mx-auto grid max-w-[1240px] gap-12 lg:grid-cols-[0.78fr_1.22fr] lg:gap-20">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-[#0076CE]">Start a conversation</p>
          <h1 className="mt-6 font-['Instrument_Serif'] text-[52px] leading-[0.96] tracking-[-0.025em] text-[#243443] sm:text-[68px]">
            Give us the context. Keep the next step simple.
          </h1>
          <p className="mt-7 max-w-[500px] text-[16px] leading-[1.7] text-[#686A6D]">
            Build a concise brief around the product, question, and outcome you want to discuss.
          </p>

          <div className="mt-9 border-y border-[#D3D7DB] py-5">
            {[
              ["01", "Choose the product"],
              ["02", "Describe the challenge"],
              ["03", "Message, call, copy, or share"],
            ].map(([number, label]) => (
              <div key={number} className="flex items-center gap-4 py-2 text-[13px] text-[#4E5964]">
                <span className="font-mono text-[9px] tracking-[0.16em] text-[#0076CE]">{number}</span>
                <span>{label}</span>
              </div>
            ))}
          </div>

          <p className="mt-5 max-w-[500px] text-[12px] leading-[1.65] text-[#686A6D]">
            Your entries stay in this browser. Use the message form, phone line, or share actions to contact Jibe when you are ready.
          </p>

          <div className="mt-7 rounded-xl border border-[#CED7DF] bg-white p-5">
            <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-[#0076CE]">Ready to connect?</p>
            <p className="mt-2 text-[12px] leading-[1.6] text-[#5D656C]">Message Jibe or call the current contact line now.</p>
            <div className="mt-4 flex flex-wrap gap-3">
              <a
                href={currentMessageForm}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-[#0076CE] px-4 text-[12px] font-semibold text-white transition-colors hover:bg-[#005FA7] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#0076CE]"
              >
                Send a message <ExternalLink aria-hidden="true" size={13} />
              </a>
              <a
                href="tel:+15124847058"
                className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-[#AEBBC7] bg-white px-4 text-[12px] font-semibold text-[#26364A] transition-colors hover:border-[#0076CE] hover:text-[#0076CE] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#0076CE]"
              >
                <Phone aria-hidden="true" size={13} /> (512) 484-7058
              </a>
            </div>
          </div>
        </div>

        <section aria-labelledby="conversation-form-heading" className="overflow-hidden rounded-2xl border border-[#CDD6DE] bg-white shadow-[0_24px_70px_rgba(20,43,65,0.08)]">
          {completedFields ? (
            <div className="p-6 sm:p-9 lg:p-11">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#EAF3FB] text-[#0076CE]">
                <Check aria-hidden="true" size={20} />
              </div>
              <p className="mt-7 font-mono text-[10px] uppercase tracking-[0.2em] text-[#0076CE]">Brief ready</p>
              <h2
                id="conversation-form-heading"
                ref={readyHeadingRef}
                tabIndex={-1}
                className="mt-3 text-[34px] font-semibold leading-[1.08] tracking-[-0.035em] text-[#26364A] outline-none sm:text-[42px]"
              >
                Your conversation has a clear starting point.
              </h2>
              <p className="mt-4 max-w-[650px] text-[14px] leading-[1.7] text-[#62666A]">
                Nothing has been sent automatically. Use one of the actions below to take this brief into your preferred communication channel.
              </p>

              <div className="mt-8 rounded-xl border border-[#D4DCE3] bg-[#F7F9FB] p-5 sm:p-6">
                <dl className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <dt className="font-mono text-[9px] uppercase tracking-[0.16em] text-[#737A81]">Product</dt>
                    <dd className="mt-1.5 text-[14px] font-semibold text-[#26364A]">{completedProductDetails.label}</dd>
                  </div>
                  <div>
                    <dt className="font-mono text-[9px] uppercase tracking-[0.16em] text-[#737A81]">Organization</dt>
                    <dd className="mt-1.5 text-[14px] font-semibold text-[#26364A]">{completedFields.organization}</dd>
                  </div>
                  <div className="sm:col-span-2">
                    <dt className="font-mono text-[9px] uppercase tracking-[0.16em] text-[#737A81]">Challenge or question</dt>
                    <dd className="mt-2 whitespace-pre-wrap text-[14px] leading-[1.65] text-[#3F4B56]">{completedFields.challenge}</dd>
                  </div>
                </dl>
              </div>

              <div className="mt-7 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={handleOpenMessageForm}
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-[#0076CE] px-5 text-[13px] font-semibold text-white transition-colors hover:bg-[#005FA7] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0076CE]"
                >
                  Copy brief &amp; message Jibe
                  <ExternalLink aria-hidden="true" size={15} />
                </button>
                <button
                  type="button"
                  onClick={handleCopy}
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-[#AEBBC7] bg-white px-5 text-[13px] font-semibold text-[#26364A] transition-colors hover:border-[#0076CE] hover:text-[#0076CE] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0076CE]"
                >
                  <Copy aria-hidden="true" size={16} />
                  Copy brief
                </button>
                {shareAvailable && (
                  <button
                    type="button"
                    onClick={handleShare}
                    className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-[#AEBBC7] bg-white px-5 text-[13px] font-semibold text-[#26364A] transition-colors hover:border-[#0076CE] hover:text-[#0076CE] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0076CE]"
                  >
                    <Share2 aria-hidden="true" size={16} />
                    Share from device
                  </button>
                )}
                <button
                  type="button"
                  onClick={handleDownload}
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-[#AEBBC7] bg-white px-5 text-[13px] font-semibold text-[#26364A] transition-colors hover:border-[#0076CE] hover:text-[#0076CE] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0076CE]"
                >
                  <Download aria-hidden="true" size={16} />
                  Download brief
                </button>
                <a
                  href="tel:+15124847058"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-[#AEBBC7] bg-white px-5 text-[13px] font-semibold text-[#26364A] transition-colors hover:border-[#0076CE] hover:text-[#0076CE] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0076CE]"
                >
                  <Phone aria-hidden="true" size={15} />
                  Call Jibe
                </a>
              </div>

              <p className="mt-4 text-[11px] leading-[1.55] text-[#737A80]">
                The blue button copies your brief and opens Jibe&apos;s current message form so you can paste and send it.
              </p>

              {actionMessage && (
                <p
                  className={`mt-5 rounded-lg px-4 py-3 text-[13px] leading-[1.5] ${
                    actionError ? "bg-[#FFF0F0] text-[#A02828]" : "bg-[#EAF3FB] text-[#245A84]"
                  }`}
                  role={actionError ? "alert" : "status"}
                  aria-live="polite"
                >
                  {actionMessage}
                </p>
              )}

              <button
                type="button"
                onClick={handleEdit}
                className="mt-7 inline-flex min-h-11 items-center gap-2 text-[13px] font-semibold text-[#4D5965] hover:text-[#0076CE] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0076CE]"
              >
                <ArrowLeft aria-hidden="true" size={15} />
                Edit details
              </button>
            </div>
          ) : (
            <form noValidate onSubmit={handleSubmit} className="p-6 sm:p-9 lg:p-11">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#0076CE]">Conversation builder</p>
              <h2
                id="conversation-form-heading"
                ref={formHeadingRef}
                tabIndex={-1}
                className="mt-3 text-[30px] font-semibold leading-[1.1] tracking-[-0.03em] text-[#26364A] outline-none sm:text-[38px]"
              >
                What should we understand first?
              </h2>

              <fieldset className="mt-9">
                <legend className="text-[13px] font-semibold text-[#26364A]">Choose a product</legend>
                <p id="product-help" className="mt-1 text-[12px] leading-[1.5] text-[#72767A]">Use the arrow keys to move between choices.</p>
                <div className="mt-4 grid gap-2 sm:grid-cols-2">
                  {productOptions.map((option) => (
                    <label key={option.value} className="relative cursor-pointer">
                      <input
                        className="peer sr-only"
                        type="radio"
                        name="product"
                        value={option.value}
                        checked={product === option.value}
                        onChange={() => setProduct(option.value)}
                        aria-describedby="product-help"
                      />
                      <span className="flex min-h-24 rounded-xl border border-[#D2D9DF] bg-white p-4 transition-colors hover:border-[#8AA8C1] peer-checked:border-[#0076CE] peer-checked:bg-[#F1F7FC] peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-[#0076CE]">
                        <span>
                          <span className={`block text-[13px] font-semibold ${product === option.value ? "text-[#0076CE]" : "text-[#2F3D49]"}`}>
                            {option.label}
                          </span>
                          <span className="mt-1 block text-[11px] leading-[1.55] text-[#686E73]">{option.description}</span>
                        </span>
                      </span>
                    </label>
                  ))}
                </div>
              </fieldset>

              <div className="mt-9 grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="conversation-name" className="text-[13px] font-semibold text-[#26364A]">Name</label>
                  <input
                    id="conversation-name"
                    name="name"
                    required
                    autoComplete="name"
                    value={fields.name}
                    onChange={(event) => updateField("name", event.target.value)}
                    className={fieldClass}
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={errors.name ? "conversation-name-error" : undefined}
                  />
                  {errors.name && <p id="conversation-name-error" className="mt-1.5 text-[12px] text-[#A02828]">{errors.name}</p>}
                </div>
                <div>
                  <label htmlFor="conversation-organization" className="text-[13px] font-semibold text-[#26364A]">Organization</label>
                  <input
                    id="conversation-organization"
                    name="organization"
                    required
                    autoComplete="organization"
                    value={fields.organization}
                    onChange={(event) => updateField("organization", event.target.value)}
                    className={fieldClass}
                    aria-invalid={Boolean(errors.organization)}
                    aria-describedby={errors.organization ? "conversation-organization-error" : undefined}
                  />
                  {errors.organization && <p id="conversation-organization-error" className="mt-1.5 text-[12px] text-[#A02828]">{errors.organization}</p>}
                </div>
                <div>
                  <label htmlFor="conversation-email" className="text-[13px] font-semibold text-[#26364A]">Work email</label>
                  <input
                    id="conversation-email"
                    name="email"
                    type="email"
                    required
                    inputMode="email"
                    autoComplete="email"
                    value={fields.email}
                    onChange={(event) => updateField("email", event.target.value)}
                    className={fieldClass}
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={errors.email ? "conversation-email-help conversation-email-error" : "conversation-email-help"}
                  />
                  <p id="conversation-email-help" className="mt-1.5 text-[11px] leading-[1.45] text-[#777C80]">Included in your brief so the recipient can respond.</p>
                  {errors.email && <p id="conversation-email-error" className="mt-1.5 text-[12px] text-[#A02828]">{errors.email}</p>}
                </div>
                <div>
                  <label htmlFor="conversation-role" className="text-[13px] font-semibold text-[#26364A]">Role <span className="font-normal text-[#777C80]">(optional)</span></label>
                  <input
                    id="conversation-role"
                    name="role"
                    autoComplete="organization-title"
                    value={fields.role}
                    onChange={(event) => updateField("role", event.target.value)}
                    className={fieldClass}
                  />
                </div>
              </div>

              <div className="mt-5">
                <label htmlFor="conversation-type" className="text-[13px] font-semibold text-[#26364A]">What would you like to do?</label>
                <select
                  id="conversation-type"
                  name="conversation"
                  required
                  value={fields.conversation}
                  onChange={(event) => updateField("conversation", event.target.value as ConversationValue | "")}
                  className={fieldClass}
                  aria-invalid={Boolean(errors.conversation)}
                  aria-describedby={errors.conversation ? "conversation-type-error" : undefined}
                >
                  <option value="">Select one</option>
                  {conversationOptions.map((option) => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
                {errors.conversation && <p id="conversation-type-error" className="mt-1.5 text-[12px] text-[#A02828]">{errors.conversation}</p>}
              </div>

              <div className="mt-5">
                <div className="flex items-end justify-between gap-4">
                  <label htmlFor="conversation-challenge" className="text-[13px] font-semibold text-[#26364A]">Challenge or question</label>
                  <span className="text-[11px] text-[#777C80]" aria-hidden="true">{fields.challenge.length}/1000</span>
                </div>
                <textarea
                  id="conversation-challenge"
                  name="challenge"
                  required
                  rows={6}
                  maxLength={1000}
                  value={fields.challenge}
                  onChange={(event) => updateField("challenge", event.target.value)}
                  placeholder={`Tell us what you want to understand about ${selectedProduct.label}.`}
                  className={`${fieldClass} resize-y`}
                  aria-invalid={Boolean(errors.challenge)}
                  aria-describedby={errors.challenge ? "conversation-challenge-help conversation-challenge-error" : "conversation-challenge-help"}
                />
                <p id="conversation-challenge-help" className="mt-1.5 text-[11px] leading-[1.45] text-[#777C80]">Include the outcome you want, the current friction, or the decision you need to make.</p>
                {errors.challenge && <p id="conversation-challenge-error" className="mt-1.5 text-[12px] text-[#A02828]">{errors.challenge}</p>}
              </div>

              <div className="mt-8 border-t border-[#D7DDE2] pt-6">
                <button
                  type="submit"
                  className="inline-flex min-h-12 w-full items-center justify-center rounded-lg bg-[#0076CE] px-6 text-[14px] font-semibold text-white transition-colors hover:bg-[#005FA7] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0076CE] sm:w-auto"
                >
                  Prepare my conversation brief
                </button>
                <p className="mt-3 text-[11px] leading-[1.5] text-[#777C80]">
                  This creates a brief on your device. It does not submit your information to Jibe.
                </p>
              </div>
            </form>
          )}
        </section>
      </div>
    </main>
  );
}
