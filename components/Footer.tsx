import { IconLinkedIn, IconInstagram, IconTwitter } from "./icons";

const QUICK_LINKS = [
  { label: "Home", href: "#top" },
  { label: "How It Works", href: "#how" },
  { label: "Why Vendigo", href: "#why" },
  { label: "Locations", href: "#locations" },
  { label: "Blog", href: "#blog" },
  { label: "Become an Investor", href: "#contact" },
];

const SOCIALS = [
  { label: "LinkedIn", href: "#", Icon: IconLinkedIn },
  { label: "Instagram", href: "#", Icon: IconInstagram },
  { label: "Twitter", href: "#", Icon: IconTwitter },
];

export default function Footer() {
  return (
    <footer
      id="start"
      className="relative z-10 border-t border-white/[0.06] bg-[#060607]"
    >
      <div className="mx-auto max-w-[1320px] px-6 py-20 sm:px-10">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-[1.6fr_1fr_1fr]">
          {/* Brand */}
          <div>
            <div className="text-gold-gradient text-2xl font-semibold tracking-tightest">
              Vendigo
            </div>
            <p className="mt-4 max-w-xs text-[14px] leading-relaxed text-white/45">
              India&rsquo;s Fintech Vending Investment Platform.
            </p>
            <div className="mt-6 flex items-center gap-3">
              {SOCIALS.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-black/40 text-white/55 transition-colors hover:border-gold/40 hover:text-gold"
                >
                  <Icon className="h-[18px] w-[18px]" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <div className="text-[12px] font-medium uppercase tracking-[0.2em] text-white/40">
              Quick Links
            </div>
            <ul className="mt-5 space-y-3">
              {QUICK_LINKS.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    className="text-[14px] text-white/55 transition-colors hover:text-white/90"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <div className="text-[12px] font-medium uppercase tracking-[0.2em] text-white/40">
              Contact
            </div>
            <ul className="mt-5 space-y-3 text-[14px] text-white/55">
              <li>
                <a
                  href="mailto:hello@vendigo.in"
                  className="transition-colors hover:text-white/90"
                >
                  hello@vendigo.in
                </a>
              </li>
              <li>
                <a
                  href="https://vendigo.in"
                  className="transition-colors hover:text-white/90"
                >
                  vendigo.in
                </a>
              </li>
              <li className="text-white/45">Jaipur, Rajasthan, India</li>
            </ul>
          </div>
        </div>

        {/* Legal disclaimer */}
        <p className="mt-16 max-w-3xl text-[12px] leading-relaxed text-white/35">
          Investments are subject to market risks. Please read all investor
          documents carefully before investing.
        </p>

        {/* Bottom strip */}
        <div className="mt-8 flex flex-col gap-4 border-t border-white/[0.06] pt-8 text-[12px] text-white/35 sm:flex-row sm:items-center sm:justify-between">
          <span>© 2025 Vendigo Private Limited. All Rights Reserved.</span>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <a href="#" className="transition-colors hover:text-white/70">
              Privacy Policy
            </a>
            <a href="#" className="transition-colors hover:text-white/70">
              Terms of Use
            </a>
            <a href="#" className="transition-colors hover:text-white/70">
              Investor Agreement
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
