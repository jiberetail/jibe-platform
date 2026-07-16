export default function TrustSection() {
  return (
    <section
      className="border-b"
      style={{ background: "#FFFFFF", borderColor: "#D9D9D9" }}
    >
      <div className="max-w-[1320px] mx-auto px-6 lg:px-10 py-5">
        <div className="flex items-center justify-center gap-12 lg:gap-20 flex-wrap">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="h-4 rounded opacity-25"
              style={{
                width: `${56 + (i % 4) * 18}px`,
                background: "#2F2F2F",
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
