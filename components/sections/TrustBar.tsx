const BADGES = [
  "DPIIT Registered Startup",
  "SEBI Escrow Account",
  "UPI Payouts",
  "Live IoT Tracking",
  "GST Compliant",
];

export default function TrustBar() {
  return (
    <section className="relative z-10 border-y border-white/[0.05] bg-[#0C0C0E]">
      <div className="mx-auto max-w-[1320px] px-6 py-5 sm:px-10">
        <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 sm:gap-x-12">
          {BADGES.map((b) => (
            <li
              key={b}
              className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.18em] text-white/40"
            >
              <span className="h-1 w-1 rounded-full bg-gold/60" />
              {b}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
