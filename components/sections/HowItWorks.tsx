import Reveal from "../Reveal";
import {
  IconUserCheck,
  IconGrid,
  IconWallet,
  IconTrendingUp,
} from "../icons";

const STEPS = [
  {
    icon: IconUserCheck,
    title: "Sign Up & Complete KYC",
    body: "Create your account and verify your identity using DigiLocker in under 3 minutes.",
  },
  {
    icon: IconGrid,
    title: "Choose Your Machine",
    body: "Browse available machine slots in the app. See the location, expected footfall, and projected monthly returns.",
  },
  {
    icon: IconWallet,
    title: "Fund & Activate",
    body: "Transfer your investment online. Your machine goes live and begins selling within days of funding.",
  },
  {
    icon: IconTrendingUp,
    title: "Earn Every Month",
    body: "Watch your earnings in real time on the Vendigo app. Receive your payout directly to your bank account or UPI.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how" className="relative z-10 bg-void py-28 sm:py-36">
      <div className="mx-auto max-w-[1320px] px-6 sm:px-10">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-[11px] font-medium uppercase tracking-[0.3em] text-gold">
            How It Works
          </span>
          <h2 className="mt-5 text-balance text-4xl font-semibold leading-[1.05] tracking-tight text-white/90 sm:text-5xl">
            Investing in a Machine is Simpler Than You Think
          </h2>
          <p className="mt-5 text-[16px] leading-relaxed text-white/55">
            Four steps from signup to your first monthly payout.
          </p>
        </Reveal>

        <ol className="mt-16 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.05] sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((s, i) => {
            const Icon = s.icon;
            return (
              <Reveal
                as="li"
                key={s.title}
                delay={i * 0.08}
                className="group relative flex flex-col bg-[#0C0C0E] p-7 transition-colors duration-300 hover:bg-[#101012]"
              >
                <div className="flex items-center justify-between">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-black/40 text-gold">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="tabular text-5xl font-semibold leading-none text-white/[0.06] transition-colors duration-300 group-hover:text-white/10">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="mt-7 text-[17px] font-semibold tracking-tight text-white/90">
                  {s.title}
                </h3>
                <p className="mt-3 text-[14px] leading-relaxed text-white/55">
                  {s.body}
                </p>
              </Reveal>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
