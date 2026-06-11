import Reveal from "../Reveal";
import { IconCube, IconCoins, IconEye, IconWallet } from "../icons";

const CARDS = [
  {
    icon: IconCube,
    title: "Real Asset Backing",
    body: "Your money buys a physical vending machine, not a promise. You can see your machine, track it, and know exactly what it earns.",
  },
  {
    icon: IconCoins,
    title: "12–18% Annual Returns",
    body: "Targets returns far above savings-account rates, paid out monthly — not once a year.",
    highlight: "12–18%",
  },
  {
    icon: IconEye,
    title: "Complete Transparency",
    body: "Every transaction from your machine is logged and visible in the app. No black boxes, no verbal assurances.",
  },
  {
    icon: IconWallet,
    title: "Start Small",
    body: "Invest from a ticket size that works for salaried professionals. You don't need to be an HNI to own an income-generating asset.",
  },
];

export default function WhyVendigo() {
  return (
    <section id="why" className="relative z-10 bg-[#060607] py-28 sm:py-36">
      <div className="mx-auto max-w-[1320px] px-6 sm:px-10">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-[11px] font-medium uppercase tracking-[0.3em] text-gold">
            Why Vendigo
          </span>
          <h2 className="mt-5 text-balance text-4xl font-semibold leading-[1.05] tracking-tight text-white/90 sm:text-5xl">
            Why Thousands Will Choose Vendigo
          </h2>
          <p className="mt-5 text-[16px] leading-relaxed text-white/55">
            Real assets. Real returns. Real transparency. This is not a chit
            fund.
          </p>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {CARDS.map((c, i) => {
            const Icon = c.icon;
            return (
              <Reveal
                key={c.title}
                delay={i * 0.08}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-black/55 p-8 backdrop-blur-md transition-colors duration-300 hover:border-gold/30"
              >
                {/* subtle warm wash on hover */}
                <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-gold/[0.06] opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />
                <span className="relative flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-black/40 text-gold">
                  <Icon className="h-[22px] w-[22px]" />
                </span>
                <h3 className="relative mt-6 text-xl font-semibold tracking-tight text-white/90">
                  {c.highlight ? (
                    <>
                      <span className="tabular text-emerald-gain">
                        {c.highlight}
                      </span>{" "}
                      Annual Returns
                    </>
                  ) : (
                    c.title
                  )}
                </h3>
                <p className="relative mt-3 max-w-md text-[15px] leading-relaxed text-white/55">
                  {c.body}
                </p>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
