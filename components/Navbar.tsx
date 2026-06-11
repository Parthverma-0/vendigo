"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import LeadButton from "./lead/LeadButton";

const LINKS = [
  { label: "Home", href: "#top" },
  { label: "How It Works", href: "#how" },
  { label: "Why Vendigo", href: "#why" },
  { label: "Locations", href: "#locations" },
  { label: "Blog", href: "#blog" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-x-0 top-0 z-50"
      >
        <div
          className={`mx-auto flex h-14 max-w-[1320px] items-center justify-between px-5 transition-all duration-500 sm:px-8 ${
            scrolled
              ? "border-b border-white/[0.06] bg-[rgba(6,6,7,0.82)] backdrop-blur-xl"
              : "border-b border-transparent bg-[rgba(6,6,7,0.25)] backdrop-blur-sm"
          }`}
        >
          {/* Left — wordmark */}
          <a
            href="#top"
            className="text-gold-gradient text-[18px] font-semibold tracking-tightest transition-opacity hover:opacity-80"
          >
            Vendigo
          </a>

          {/* Center — links */}
          <nav className="hidden items-center gap-7 lg:flex">
            {LINKS.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="group relative text-[13px] font-normal tracking-tight text-white/55 transition-colors hover:text-white/90"
              >
                {l.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-white/40 transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Right — CTA + mobile toggle */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:block">
              <LeadButton variant="nav" source="navbar">
                Become an Investor
              </LeadButton>
            </div>

            {/* Hamburger */}
            <button
              type="button"
              aria-label="Open menu"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen(true)}
              className="flex h-9 w-9 items-center justify-center rounded-full text-white/80 transition-colors hover:bg-white/5 lg:hidden"
            >
              <span className="sr-only">Open menu</span>
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
              >
                <path d="M3 6h18M3 12h18M3 18h18" />
              </svg>
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile full-screen slide-in menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[60] bg-[rgba(6,6,7,0.96)] backdrop-blur-2xl lg:hidden"
          >
            <div className="flex h-14 items-center justify-between px-5 sm:px-8">
              <span className="text-gold-gradient text-[18px] font-semibold tracking-tightest">
                Vendigo
              </span>
              <button
                type="button"
                aria-label="Close menu"
                onClick={() => setMenuOpen(false)}
                className="flex h-9 w-9 items-center justify-center rounded-full text-white/80 transition-colors hover:bg-white/5"
              >
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                >
                  <path d="M6 6l12 12M18 6 6 18" />
                </svg>
              </button>
            </div>

            <motion.nav
              initial="hidden"
              animate="show"
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
              }}
              className="flex flex-col px-6 pt-8 sm:px-10"
            >
              {LINKS.map((l) => (
                <motion.a
                  key={l.label}
                  href={l.href}
                  onClick={() => setMenuOpen(false)}
                  variants={{
                    hidden: { opacity: 0, x: -16 },
                    show: { opacity: 1, x: 0 },
                  }}
                  className="border-b border-white/[0.06] py-5 text-2xl font-medium tracking-tight text-white/85 transition-colors hover:text-white"
                >
                  {l.label}
                </motion.a>
              ))}

              <motion.div
                variants={{
                  hidden: { opacity: 0, x: -16 },
                  show: { opacity: 1, x: 0 },
                }}
                className="mt-10 self-start"
              >
                <LeadButton
                  variant="hero"
                  source="mobile-menu"
                  onClick={() => setMenuOpen(false)}
                >
                  Become an Investor
                </LeadButton>
              </motion.div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
