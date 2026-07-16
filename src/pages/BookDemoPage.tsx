import { useEffect, useMemo, useState } from "react";
import { Check } from "lucide-react";
import { useSearchParams } from "react-router";

const productOptions = [
  { value: "all", label: "Help me choose", description: "Find the right starting point across the Jibe portfolio" },
  { value: "pro", label: "Jibe Pro", description: "Frontline predictions, customer feedback, QA, and coaching" },
  { value: "retail", label: "Jibe Retail", description: "In-venue ecommerce, surveys, or both" },
  { value: "ai", label: "Jibe AI", description: "AI-generated structured survey predictions and evidence" },
] as const;

// COPY REVIEW / BLOCKED — CONTACT-01 / D-10:
// The low-commitment framing below is ready for review. A live submission or
// scheduling action must not be added until the owner, routing, duration,
// recipient, and privacy behavior are verified.
export default function BookDemoPage() {
  const [searchParams] = useSearchParams();
  const requestedProduct = searchParams.get("product") ?? "all";
  const initialProduct = productOptions.some((option) => option.value === requestedProduct)
    ? requestedProduct
    : "all";
  const [product, setProduct] = useState(initialProduct);

  const selectedProduct = useMemo(
    () => productOptions.find((option) => option.value === product) ?? productOptions[0],
    [product],
  );

  useEffect(() => {
    const previousTitle = document.title;
    const description = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    const previousDescription = description?.content;

    document.title = "Start a conversation | Jibe";
    if (description) {
      description.content = "Ask a question, share the challenge, or explore which Jibe product fits your operation.";
    }

    return () => {
      document.title = previousTitle;
      if (description && previousDescription) description.content = previousDescription;
    };
  }, []);

  return (
    <main className="min-h-screen bg-[#F5F5F5] px-6 pb-24 pt-36 lg:px-10 lg:pb-32 lg:pt-44">
      <div className="mx-auto grid max-w-[1240px] gap-14 lg:grid-cols-[0.92fr_1.08fr] lg:gap-20">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-[#0076CE]">Start a conversation</p>
          <h1 className="mt-6 font-['Instrument_Serif'] text-[54px] leading-[0.96] tracking-[-0.025em] text-[#243443] sm:text-[70px]">
            See whether Jibe fits your operation.
          </h1>
          <p className="mt-7 max-w-[520px] text-[16px] leading-[1.7] text-[#686A6D]">
            Ask a question, share the challenge, or explore fit—without committing to a full product demo.
          </p>

          <div className="mt-10 space-y-3">
            {[
              "Discuss the outcome or friction you want to understand",
              "Identify the Jibe product most relevant to the question",
              "Decide whether a deeper product conversation makes sense",
            ].map((item) => (
              <div key={item} className="flex items-start gap-3 text-[14px] leading-[1.6] text-[#4E4E4E]">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#EAF3FB] text-[#0076CE]">
                  <Check aria-hidden="true" size={13} />
                </span>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        <section aria-labelledby="conversation-product-heading" className="border-t-2 border-[#0076CE] pt-8">
          <div>
            <p id="conversation-product-heading" className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#777777]">
              What would you like to discuss?
            </p>
            <div className="mt-4 grid gap-px overflow-hidden rounded-xl border border-[#D9D9D9] bg-[#D9D9D9] sm:grid-cols-2">
              {productOptions.map((option) => (
                <button
                  type="button"
                  key={option.value}
                  onClick={() => setProduct(option.value)}
                  aria-pressed={product === option.value}
                  className={`min-h-28 p-4 text-left transition-colors focus-visible:z-10 focus-visible:outline-2 focus-visible:outline-[#0076CE] ${
                    product === option.value ? "bg-[#EAF3FB]" : "bg-white hover:bg-[#F5F8FB]"
                  }`}
                >
                  <span className={`block text-[13px] font-semibold ${product === option.value ? "text-[#0076CE]" : "text-[#2F2F2F]"}`}>
                    {option.label}
                  </span>
                  <span className="mt-1 block text-[11px] leading-relaxed text-[#666666]">{option.description}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="mt-8 rounded-xl border border-[#C9D8E6] bg-white p-6 sm:p-8" role="status" aria-live="polite">
            <p className="font-mono text-[10px] uppercase tracking-[0.19em] text-[#0076CE]">Contact routing in review</p>
            <h2 className="mt-4 text-[26px] font-semibold leading-[1.15] tracking-[-0.025em] text-[#26364A]">
              {selectedProduct.label} is selected.
            </h2>
            <p className="mt-4 max-w-[620px] text-[14px] leading-[1.75] text-[#5F5F5F]">
              Jibe is confirming the correct contact and scheduling channel before this page accepts personal information. No request has been sent and no information has been collected.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
