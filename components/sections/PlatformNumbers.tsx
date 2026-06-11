import Reveal from "../Reveal";

// Pre-launch: framed as Phase-1 targets, not live traction — consistent with the
// "transparent, not a chit fund" promise. Don't present projections as live stats.
const METRICS = [
  { value: "25+", label: "Active machines planned across Rajasthan" },
  { value: "50+", label: "Individuals onboarded to earn monthly" },
  { value: "99%", label: "Targeted IoT-monitored machine uptime", accent: true },
  { value: "100%", label: "On-time monthly payouts to investors", accent: true },
];

export default function PlatformNumbers() {
  return (
    <section className="relative z-10 bg-void py-28 sm:py-36">
      <div className="mx-auto max-w-[1320px] px-6 sm:px-10">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/[0.06] px-3 py-1 text-[11px] font-medium uppercase tracking-[0.2em] text-gold">
            Phase-1 Targets
          </span>
          <h2 className="mt-5 text-balance text-4xl font-semibold leading-[1.05] tracking-tight text-white/90 sm:text-5xl">
            Vendigo in Numbers
          </h2>
          <p className="mt-5 text-[15px] leading-relaxed text-white/50">
            Goals for our first phase — not live traction. We&rsquo;ll publish
            real numbers as machines go live, the same way they&rsquo;ll appear
            in your app.
          </p>
        </Reveal>

        <div className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.05] lg:grid-cols-4">
          {METRICS.map((m, i) => (
            <Reveal
              key={m.label}
              delay={i * 0.08}
              className="flex flex-col items-center bg-[#0C0C0E] px-6 py-12 text-center"
            >
              <div
                className={`tabular text-5xl font-semibold tracking-tight sm:text-6xl ${
                  m.accent ? "text-emerald-gain" : "text-white/90"
                }`}
              >
                {m.value}
              </div>
              <div className="mt-4 max-w-[12rem] text-[13px] leading-relaxed text-white/50">
                {m.label}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
