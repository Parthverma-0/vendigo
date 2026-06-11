"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const TICKETS = [
  "₹1.7L – ₹3L",
  "₹3L – ₹5L",
  "₹5L – ₹10L",
  "₹10L+",
  "Still deciding",
];

type Status = "idle" | "submitting" | "done";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[0-9+\-\s]{8,15}$/;

export default function LeadModal({
  isOpen,
  onClose,
  source,
}: {
  isOpen: boolean;
  onClose: () => void;
  source?: string;
}) {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Lock scroll + close on Escape while open.
  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen, onClose]);

  // Reset to a clean form shortly after closing.
  useEffect(() => {
    if (isOpen) return;
    const t = setTimeout(() => {
      setStatus("idle");
      setErrors({});
    }, 400);
    return () => clearTimeout(t);
  }, [isOpen]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries()) as Record<
      string,
      string
    >;

    // Honeypot — bots fill hidden fields; humans don't.
    if (data.company) return;

    const next: Record<string, string> = {};
    if (!data.name?.trim()) next.name = "Please enter your name.";
    if (!PHONE_RE.test(data.phone || "")) next.phone = "Enter a valid phone number.";
    if (!EMAIL_RE.test(data.email || "")) next.email = "Enter a valid email.";
    if (!data.city?.trim()) next.city = "Please enter your city.";
    if (!data.ticket) next.ticket = "Select a ticket size.";
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    setStatus("submitting");

    const payload = { ...data, source: source ?? "unknown", ts: new Date().toISOString() };

    // TODO: wire to a real destination (API route, CRM, email, or Google Sheet).
    // Until then we just log the captured lead so nothing is silently lost.
    // eslint-disable-next-line no-console
    console.log("[Vendigo lead]", payload);

    await new Promise((r) => setTimeout(r, 700)); // simulate network
    setStatus("done");
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[90] flex items-center justify-center p-4 sm:p-6"
        >
          {/* backdrop */}
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Become an investor"
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-md overflow-hidden rounded-3xl border border-white/10 bg-[#0C0C0E] p-7 shadow-[0_30px_120px_-20px_rgba(0,0,0,0.9)] sm:p-8"
          >
            {/* warm top accent */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent"
            />

            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-white/50 transition-colors hover:bg-white/5 hover:text-white/90"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
                <path d="M6 6l12 12M18 6 6 18" />
              </svg>
            </button>

            {status === "done" ? (
              <div className="py-6 text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-gain/15 text-emerald-gain">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m5 13 4 4L19 7" />
                  </svg>
                </div>
                <h3 className="mt-5 text-2xl font-semibold tracking-tight text-white/90">
                  You&rsquo;re on the list.
                </h3>
                <p className="mt-3 text-[15px] leading-relaxed text-white/55">
                  Thanks for your interest. Our team will reach out within 24
                  hours to walk you through available machine slots.
                </p>
                <button
                  type="button"
                  onClick={onClose}
                  className="mt-7 rounded-full border border-white/15 px-6 py-2.5 text-[14px] font-medium text-white/80 transition-colors hover:border-white/30"
                >
                  Done
                </button>
              </div>
            ) : (
              <>
                <h3 className="text-gold-gradient text-2xl font-semibold tracking-tightest">
                  Become an Investor
                </h3>
                <p className="mt-2 text-[14px] leading-relaxed text-white/50">
                  Tell us a little about you. No obligation — we&rsquo;ll get in
                  touch within 24 hours.
                </p>

                <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-4">
                  {/* honeypot */}
                  <input
                    type="text"
                    name="company"
                    tabIndex={-1}
                    autoComplete="off"
                    className="absolute -left-[9999px] h-0 w-0 opacity-0"
                    aria-hidden
                  />

                  <Field label="Full name" name="name" type="text" placeholder="Your name" error={errors.name} autoComplete="name" />
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <Field label="Phone" name="phone" type="tel" placeholder="98765 43210" error={errors.phone} autoComplete="tel" />
                    <Field label="City" name="city" type="text" placeholder="Jaipur" error={errors.city} autoComplete="address-level2" />
                  </div>
                  <Field label="Email" name="email" type="email" placeholder="you@email.com" error={errors.email} autoComplete="email" />

                  <div>
                    <label htmlFor="ticket" className="mb-1.5 block text-[12px] font-medium tracking-tight text-white/55">
                      Ticket size
                    </label>
                    <select
                      id="ticket"
                      name="ticket"
                      defaultValue=""
                      className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-[14px] text-white/90 outline-none transition-colors focus:border-gold/50"
                    >
                      <option value="" disabled>
                        Select a range
                      </option>
                      {TICKETS.map((t) => (
                        <option key={t} value={t} className="bg-[#0C0C0E]">
                          {t}
                        </option>
                      ))}
                    </select>
                    {errors.ticket && (
                      <p className="mt-1.5 text-[12px] text-red-400/80">{errors.ticket}</p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="group relative mt-2 inline-flex w-full items-center justify-center rounded-full p-px disabled:opacity-70"
                  >
                    <span className="absolute inset-0 rounded-full bg-gold-gradient" />
                    <span className="relative w-full rounded-full bg-[#0a0a0c] px-6 py-3.5 text-center text-[15px] font-semibold tracking-tight text-white transition-all duration-300 group-hover:bg-transparent group-hover:text-[#0a0a0c]">
                      {status === "submitting" ? "Submitting…" : "Request a Call Back"}
                    </span>
                  </button>

                  <p className="text-center text-[11px] leading-relaxed text-white/35">
                    Investments are subject to market risks. Read all investor
                    documents carefully before investing.
                  </p>
                </form>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Field({
  label,
  name,
  type,
  placeholder,
  error,
  autoComplete,
}: {
  label: string;
  name: string;
  type: string;
  placeholder: string;
  error?: string;
  autoComplete?: string;
}) {
  return (
    <div>
      <label htmlFor={name} className="mb-1.5 block text-[12px] font-medium tracking-tight text-white/55">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className={`w-full rounded-xl border bg-black/40 px-4 py-3 text-[14px] text-white/90 placeholder:text-white/25 outline-none transition-colors focus:border-gold/50 ${
          error ? "border-red-400/50" : "border-white/10"
        }`}
      />
      {error && <p className="mt-1.5 text-[12px] text-red-400/80">{error}</p>}
    </div>
  );
}
