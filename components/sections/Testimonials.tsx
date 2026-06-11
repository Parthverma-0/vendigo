import Reveal from "../Reveal";

const TESTIMONIALS = [
  {
    quote:
      "I was tired of watching my savings earn 4 percent. With Vendigo I can see exactly what my machine sold today. That transparency is rare.",
    name: "Ravi S.",
    city: "Jaipur",
    location: "SMS Medical College",
    monthly: "₹9,400 / mo",
  },
  {
    quote:
      "I invested in one machine as a trial. Within three months I was asking the team about a second slot.",
    name: "Meena R.",
    city: "Jodhpur",
    location: "Jodhpur Railway Station",
    monthly: "₹9,900 / mo",
  },
];

export default function Testimonials() {
  return (
    <section className="relative z-10 bg-[#060607] py-28 sm:py-36">
      <div className="mx-auto max-w-[1320px] px-6 sm:px-10">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-[11px] font-medium uppercase tracking-[0.3em] text-gold">
            Testimonials
          </span>
          <h2 className="mt-5 text-balance text-4xl font-semibold leading-[1.05] tracking-tight text-white/90 sm:text-5xl">
            Investors Who Chose Vendigo
          </h2>
        </Reveal>

        <div className="mx-auto mt-16 grid max-w-4xl grid-cols-1 gap-4 md:grid-cols-2">
          {TESTIMONIALS.map((t, i) => (
            <Reveal
              key={t.name}
              delay={i * 0.1}
              className="flex flex-col rounded-2xl border border-white/10 bg-black/55 p-8 backdrop-blur-md"
            >
              <span className="text-4xl leading-none text-gold/50">&ldquo;</span>
              <p className="mt-3 flex-1 text-[16px] leading-relaxed text-white/75">
                {t.quote}
              </p>
              <div className="mt-7 flex items-center gap-4 border-t border-white/[0.07] pt-5">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gold-gradient text-[15px] font-semibold text-[#0a0a0c]">
                  {t.name.charAt(0)}
                </span>
                <div className="flex-1">
                  <div className="text-[14px] font-medium tracking-tight text-white/90">
                    {t.name} · {t.city}
                  </div>
                  <div className="text-[12px] text-white/45">{t.location}</div>
                </div>
                <div className="text-right">
                  <div className="tabular text-[15px] font-semibold text-emerald-gain">
                    {t.monthly}
                  </div>
                  <div className="text-[11px] text-white/40">received</div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
