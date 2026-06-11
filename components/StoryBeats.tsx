"use client";

import {
  motion,
  useTransform,
  type MotionValue,
} from "framer-motion";
import LeadButton from "./lead/LeadButton";

/**
 * Build opacity + translate motion values for a storytelling beat that lives
 * between `start` and `end` of the overall scroll progress (0→1).
 * The beat fades/slides in over the first `fade` portion of its range and
 * fades/slides out over the last `fade` portion, holding solid in between.
 */
function useBeat(
  progress: MotionValue<number>,
  start: number,
  end: number,
  fade = 0.28
) {
  const inEnd = start + (end - start) * fade;
  const outStart = end - (end - start) * fade;

  const opacity = useTransform(
    progress,
    [start, inEnd, outStart, end],
    [0, 1, 1, 0]
  );
  const y = useTransform(
    progress,
    [start, inEnd, outStart, end],
    [40, 0, 0, -40]
  );
  return { opacity, y };
}

const EASE = [0.22, 1, 0.36, 1] as const;

function StatCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`relative rounded-2xl border border-white/10 bg-black/55 p-5 backdrop-blur-md ${className}`}
    >
      {children}
    </div>
  );
}

export default function StoryBeats({
  progress,
}: {
  progress: MotionValue<number>;
}) {
  const hero = useBeat(progress, 0.0, 0.15, 0.5);
  const opportunity = useBeat(progress, 0.16, 0.4);
  const transparency = useBeat(progress, 0.41, 0.65);
  const income = useBeat(progress, 0.66, 0.85);
  const cta = useBeat(progress, 0.86, 1.0, 0.22);

  return (
    <div className="pointer-events-none absolute inset-0 z-20">
      <div className="mx-auto h-full max-w-[1320px] px-6 sm:px-10">
        {/* ───────────── HERO (0–15%) — machine closed, centered ───────────── */}
        <motion.section
          style={{ opacity: hero.opacity, y: hero.y }}
          className="absolute inset-0 flex flex-col items-center justify-center text-center"
        >
          <motion.h1
            className="text-gold-fade heading-glow drop-legible text-[15vw] font-semibold leading-[0.9] tracking-tightest sm:text-[clamp(4rem,11vw,11rem)]"
          >
            Vendigo
          </motion.h1>
          <p className="text-legible mt-5 text-balance text-xl font-medium tracking-tight text-white/90 sm:text-[28px]">
            Own the machine. Earn the income.
          </p>
          <p className="text-legible mt-4 max-w-md text-balance text-[15px] leading-relaxed text-white/50">
            Fund a smart, IoT-connected vending machine. Earn transparent,
            monthly passive income — tracked in real time.
          </p>
          <ScrollHint />
        </motion.section>

        {/* ──────────── THE OPPORTUNITY (15–40%) — door begins to open ──────────── */}
        <motion.section
          style={{ opacity: opportunity.opacity, y: opportunity.y }}
          className="absolute inset-y-0 left-0 flex max-w-xl flex-col justify-center pl-1 text-left sm:pl-2"
        >
          <span className="mb-4 text-[11px] font-medium uppercase tracking-[0.3em] text-gold">
            The Opportunity
          </span>
          <h2 className="text-balance text-4xl font-semibold leading-[1.05] tracking-tight text-white/90 sm:text-[44px]">
            We&rsquo;re opening automated retail to everyone.
          </h2>
          <div className="mt-7 space-y-5 text-[15px] leading-relaxed text-white/55">
            <p>
              <span className="tabular font-medium text-white/80">
                ₹180 lakh crore
              </span>{" "}
              sits idle in Indian savings accounts earning 3–4%. Real-asset
              investing has stayed out of reach — until now.
            </p>
            <p>
              India has{" "}
              <span className="tabular font-medium text-white/80">
                1 vending machine per 4,000 people
              </span>
              , versus 1 per 23 in Japan. The opportunity is wide open.
            </p>
          </div>
        </motion.section>

        {/* ──────── RADICAL TRANSPARENCY (40–65%) — door fully open ──────── */}
        <motion.section
          style={{ opacity: transparency.opacity, y: transparency.y }}
          className="absolute inset-y-0 right-0 flex max-w-xl flex-col justify-center pr-1 text-right sm:pr-2"
        >
          <span className="mb-4 text-[11px] font-medium uppercase tracking-[0.3em] text-gold">
            Radical Transparency
          </span>
          <h2 className="text-balance text-4xl font-semibold leading-[1.05] tracking-tight text-white/90 sm:text-[44px]">
            See everything. In real time.
          </h2>
          <ul className="mt-7 space-y-4 text-[15px] leading-relaxed text-white/55">
            <li>
              Each machine reports{" "}
              <span className="text-white/80">every dispense, every sale,</span>{" "}
              every restock — every 30 seconds.
            </li>
            <li>
              Track stock levels, sales velocity, and revenue earned{" "}
              <span className="text-white/80">live from the app.</span>
            </li>
            <li>
              Funds held in a{" "}
              <span className="text-white/80">SEBI-registered escrow.</span>{" "}
              Auto-generated, signed monthly statements. No chit funds, no
              guesswork.
            </li>
          </ul>
        </motion.section>

        {/* ──────── PASSIVE INCOME (65–85%) — flap pushes forward ──────── */}
        <motion.section
          style={{ opacity: income.opacity, y: income.y }}
          className="absolute inset-0 flex flex-col items-center justify-center text-center"
        >
          <span className="mb-4 text-[11px] font-medium uppercase tracking-[0.3em] text-gold">
            Passive Income
          </span>
          <h2 className="text-legible text-balance text-4xl font-semibold leading-[1.05] tracking-tight text-white/90 sm:text-[48px]">
            Passive income, paid every month.
          </h2>

          <div className="pointer-events-auto mt-9 grid w-full max-w-3xl grid-cols-1 gap-3 sm:grid-cols-3">
            <StatCard>
              <div className="tabular text-3xl font-semibold tracking-tight text-white/90">
                ₹45,000
              </div>
              <div className="mt-1 text-[12px] text-white/45">
                avg. monthly gross / machine
              </div>
            </StatCard>
            <StatCard className="gold-glow">
              <div className="tabular text-3xl font-semibold tracking-tight text-emerald-gain">
                ₹9,750
              </div>
              <div className="mt-1 text-[12px] text-white/45">
                your share / month, via UPI
              </div>
            </StatCard>
            <StatCard>
              <div className="tabular text-3xl font-semibold tracking-tight text-emerald-gain">
                13.7% <span className="text-xl text-white/50">p.a.</span>
              </div>
              <div className="mt-1 text-[12px] text-white/45">
                on a ~₹1.7L investment
              </div>
            </StatCard>
          </div>

          <p className="text-legible mt-7 max-w-lg text-balance text-[15px] leading-relaxed text-white/55">
            You own the asset. We handle the restocking, servicing, and
            logistics — your share lands directly in your account.
          </p>
        </motion.section>

        {/* ──────────── REASSURANCE & CTA (85–100%) — fully open ──────────── */}
        <motion.section
          id="cta"
          style={{ opacity: cta.opacity, y: cta.y }}
          className="absolute inset-0 flex flex-col items-center justify-center text-center"
        >
          <h2 className="text-gold-fade heading-glow drop-legible text-balance text-5xl font-semibold leading-[1.0] tracking-tightest sm:text-[clamp(3rem,7vw,6rem)]">
            Your machine is
            <br />
            open for business.
          </h2>
          <p className="text-legible mt-6 max-w-xl text-balance text-[17px] leading-relaxed text-white/55">
            Vendigo. One machine, one investor, one transparent payout at a
            time.
          </p>

          <div className="pointer-events-auto mt-9 flex flex-col items-center gap-5">
            <LeadButton variant="hero" source="hero-cta">
              Start Investing
            </LeadButton>
            <a
              href="#calculator"
              className="text-[13px] tracking-tight text-white/55 underline-offset-4 transition-colors hover:text-white/90 hover:underline"
            >
              See how returns work
            </a>
          </div>

          <p className="text-legible mt-10 max-w-md text-balance text-[12px] leading-relaxed text-white/35">
            Founding investors get a preferential{" "}
            <span className="text-gold">65% profit share.</span> Limited Jaipur
            pilot slots.
          </p>
        </motion.section>
      </div>
    </div>
  );
}

function ScrollHint() {
  return (
    <motion.div
      animate={{ y: [0, 8, 0], opacity: [0.5, 0.9, 0.5] }}
      transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
      className="absolute bottom-10 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2"
    >
      <span className="text-[11px] uppercase tracking-[0.3em] text-white/35">
        Scroll
      </span>
      <span className="block h-9 w-px bg-gradient-to-b from-white/40 to-transparent" />
    </motion.div>
  );
}
