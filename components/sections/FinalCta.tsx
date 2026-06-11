import Reveal from "../Reveal";
import LeadButton from "../lead/LeadButton";

export default function FinalCta() {
  return (
    <section id="contact" className="relative z-10 overflow-hidden bg-void py-28 sm:py-36">
      {/* warm radial glow, full-bleed */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 80% at 50% 50%, rgba(233,180,76,0.10) 0%, rgba(233,180,76,0) 60%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent"
      />

      <Reveal className="relative mx-auto max-w-3xl px-6 text-center sm:px-10">
        <h2 className="text-balance text-4xl font-semibold leading-[1.04] tracking-tight text-white/90 sm:text-[56px]">
          Your Machine Could Be Earning Right Now
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-balance text-[17px] leading-relaxed text-white/55">
          Join the founding investors on the Vendigo platform. Limited machine
          slots are available in the first phase.
        </p>

        <div className="mt-10 flex flex-col items-center gap-4">
          <LeadButton variant="large" source="final-cta">
            Claim Your Machine Slot
          </LeadButton>
          <p className="text-[13px] text-white/40">
            No obligation. We&rsquo;ll get in touch within 24 hours.
          </p>
        </div>
      </Reveal>
    </section>
  );
}
