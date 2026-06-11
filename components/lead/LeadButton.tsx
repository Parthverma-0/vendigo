"use client";

import { useLead } from "./LeadContext";

type Variant = "primary" | "nav" | "hero" | "large";

const SIZES: Record<Variant, string> = {
  nav: "px-4 py-1.5 text-[13px] font-medium",
  primary: "px-6 py-3 text-[14px] font-semibold",
  hero: "px-8 py-3.5 text-[15px] font-semibold",
  large: "px-8 py-4 text-[16px] font-semibold",
};

/**
 * Gold-gradient CTA that opens the shared lead-capture modal. Matches the
 * existing button style across the page. Pass `source` to tag where the lead
 * originated.
 */
export default function LeadButton({
  children,
  variant = "primary",
  source,
  className = "",
  onClick,
}: {
  children: React.ReactNode;
  variant?: Variant;
  source?: string;
  className?: string;
  onClick?: () => void;
}) {
  const { open } = useLead();
  return (
    <button
      type="button"
      onClick={() => {
        onClick?.();
        open(source);
      }}
      className={`group relative inline-flex items-center rounded-full p-px ${className}`}
    >
      <span className="absolute inset-0 rounded-full bg-gold-gradient" />
      <span
        className={`relative rounded-full bg-[#0a0a0c] tracking-tight text-white transition-all duration-300 group-hover:bg-transparent group-hover:text-[#0a0a0c] group-hover:shadow-[0_0_40px_-6px_rgba(233,180,76,0.6)] ${SIZES[variant]}`}
      >
        {children}
      </span>
    </button>
  );
}
