"use client";

import { AnimatePresence, motion } from "framer-motion";

export default function LoadingScreen({
  progress,
  done,
}: {
  progress: number;
  done: boolean;
}) {
  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-void"
        >
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center"
          >
            <span className="text-gold-fade text-3xl font-semibold tracking-tightest">
              Vendigo
            </span>
            <span className="mt-2 text-[11px] uppercase tracking-[0.35em] text-white/35">
              Own the machine
            </span>

            <div className="mt-8 h-px w-56 overflow-hidden rounded-full bg-white/10">
              <motion.div
                className="h-full bg-gold-gradient"
                style={{ width: `${progress}%` }}
                transition={{ ease: "linear" }}
              />
            </div>
            <span className="tabular mt-3 text-[12px] tracking-tight text-white/40">
              {progress}%
            </span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
