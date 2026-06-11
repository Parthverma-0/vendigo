import Reveal from "../Reveal";
import LeadButton from "../lead/LeadButton";

const CHIPS = [
  "Colleges & Coaching Institutes",
  "Government Hospitals",
  "Metro & Railway Stations",
  "Corporate Parks",
  "Highway Petrol Stations",
  "Gym Chains",
];

// Illustrative pin positions (% of the map canvas) clustered around a Jaipur core.
const PINS = [
  { x: 42, y: 38, big: true },
  { x: 54, y: 30 },
  { x: 60, y: 48 },
  { x: 48, y: 56 },
  { x: 36, y: 50 },
  { x: 66, y: 38 },
  { x: 30, y: 40 },
  { x: 52, y: 66 },
];

export default function Locations() {
  return (
    <section id="locations" className="relative z-10 bg-void py-28 sm:py-36">
      <div className="mx-auto max-w-[1320px] px-6 sm:px-10">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-[11px] font-medium uppercase tracking-[0.3em] text-gold">
            Active Locations
          </span>
          <h2 className="mt-5 text-balance text-4xl font-semibold leading-[1.05] tracking-tight text-white/90 sm:text-5xl">
            Our Machines Are Already Out There
          </h2>
          <p className="mt-5 text-[16px] leading-relaxed text-white/55">
            Vendigo machines are placed at high-footfall hotspots chosen for
            consistent revenue.
          </p>
        </Reveal>

        <Reveal className="mt-16 overflow-hidden rounded-3xl border border-white/[0.08] bg-[#0C0C0E]">
          {/* Illustrated map */}
          <div className="relative h-[360px] w-full overflow-hidden sm:h-[440px]">
            {/* contour grid */}
            <div
              aria-hidden
              className="absolute inset-0 opacity-[0.5]"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
                backgroundSize: "44px 44px",
              }}
            />
            {/* warm core glow over Jaipur */}
            <div
              aria-hidden
              className="absolute left-[42%] top-[38%] h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{
                background:
                  "radial-gradient(circle, rgba(233,180,76,0.16) 0%, rgba(233,180,76,0) 68%)",
              }}
            />

            {/* abstract state outline */}
            <svg
              aria-hidden
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              className="absolute inset-0 h-full w-full"
            >
              <path
                d="M20 30 L40 18 L62 22 L78 34 L74 56 L58 72 L40 70 L26 58 L18 44 Z"
                fill="rgba(255,255,255,0.015)"
                stroke="rgba(233,180,76,0.18)"
                strokeWidth="0.3"
              />
            </svg>

            {/* pins */}
            {PINS.map((p, i) => (
              <div
                key={i}
                className="absolute -translate-x-1/2 -translate-y-1/2"
                style={{ left: `${p.x}%`, top: `${p.y}%` }}
              >
                <span className="relative flex items-center justify-center">
                  <span
                    className="absolute rounded-full bg-gold/40 pin-pulse"
                    style={{
                      width: p.big ? 28 : 18,
                      height: p.big ? 28 : 18,
                      animationDelay: `${i * 0.4}s`,
                    }}
                  />
                  <span
                    className="relative rounded-full bg-gold shadow-[0_0_12px_2px_rgba(233,180,76,0.6)]"
                    style={{ width: p.big ? 12 : 8, height: p.big ? 12 : 8 }}
                  />
                </span>
              </div>
            ))}

            {/* Jaipur label */}
            <div className="absolute left-[42%] top-[38%] ml-5 mt-3 text-[12px] font-medium tracking-tight text-white/70">
              Jaipur
              <span className="ml-2 text-[10px] uppercase tracking-[0.18em] text-gold/80">
                Live
              </span>
            </div>

            <div className="absolute bottom-4 right-5 text-[10px] uppercase tracking-[0.2em] text-white/30">
              Rajasthan · scaling pan-India
            </div>
          </div>

          {/* chips + CTA */}
          <div className="border-t border-white/[0.06] p-6 sm:p-8">
            <div className="flex flex-wrap gap-2.5">
              {CHIPS.map((c) => (
                <span
                  key={c}
                  className="rounded-full border border-white/10 bg-black/40 px-4 py-2 text-[12.5px] tracking-tight text-white/60"
                >
                  {c}
                </span>
              ))}
            </div>

            <div className="mt-7 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-[15px] text-white/55">
                Want your machine in a specific location?
              </p>
              <LeadButton variant="primary" source="locations">
                Talk to Us
              </LeadButton>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
