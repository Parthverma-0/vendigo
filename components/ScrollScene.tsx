"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import StoryBeats from "./StoryBeats";
import LoadingScreen from "./LoadingScreen";

const FRAME_COUNT = 240;
const framePath = (i: number) =>
  `/frames/frame_${String(i).padStart(4, "0")}.jpg`;

export default function ScrollScene() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const rafRef = useRef<number | null>(null);
  const currentFrameRef = useRef<number>(-1);

  const [loaded, setLoaded] = useState(false);
  const [progress, setProgress] = useState(0); // 0–100 load progress

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // ── Preload all frames up front ──────────────────────────────────────────
  useEffect(() => {
    let cancelled = false;
    let loadedCount = 0;
    const images: HTMLImageElement[] = new Array(FRAME_COUNT);

    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image();
      img.src = framePath(i + 1);
      img.onload = img.onerror = () => {
        if (cancelled) return;
        loadedCount++;
        setProgress(Math.round((loadedCount / FRAME_COUNT) * 100));
        if (loadedCount === FRAME_COUNT) {
          imagesRef.current = images;
          setLoaded(true);
        }
      };
      images[i] = img;
    }

    return () => {
      cancelled = true;
    };
  }, []);

  // ── Canvas sizing (devicePixelRatio aware) + draw helpers ────────────────
  useEffect(() => {
    if (!loaded) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    const drawFrame = (index: number) => {
      const img = imagesRef.current[index];
      if (!img || !img.complete || img.naturalWidth === 0) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const cw = canvas.clientWidth;
      const ch = canvas.clientHeight;

      // Keep the backing store in sync with CSS size * dpr.
      if (canvas.width !== cw * dpr || canvas.height !== ch * dpr) {
        canvas.width = cw * dpr;
        canvas.height = ch * dpr;
      }

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.fillStyle = "#000000";
      ctx.fillRect(0, 0, cw, ch);

      // "contain" fit — preserve aspect ratio, center the machine; pure-black
      // letterbox blends seamlessly with the page background.
      const scale = Math.min(cw / img.naturalWidth, ch / img.naturalHeight);
      const dw = img.naturalWidth * scale;
      const dh = img.naturalHeight * scale;
      const dx = (cw - dw) / 2;
      const dy = (ch - dh) / 2;
      ctx.drawImage(img, dx, dy, dw, dh);
    };

    const render = (rawIndex: number) => {
      const index = Math.max(0, Math.min(FRAME_COUNT - 1, Math.round(rawIndex)));
      if (index === currentFrameRef.current) return;
      currentFrameRef.current = index;
      drawFrame(index);
    };

    // Initial paint
    render(scrollYProgress.get() * (FRAME_COUNT - 1));

    const onResize = () => {
      currentFrameRef.current = -1; // force redraw at new size
      render(scrollYProgress.get() * (FRAME_COUNT - 1));
    };
    window.addEventListener("resize", onResize);

    // expose render through a ref-less closure via the scroll handler below
    (canvas as any).__render = render;

    return () => {
      window.removeEventListener("resize", onResize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [loaded, scrollYProgress]);

  // ── Scroll → frame, rAF-throttled (never draw more than once per frame) ──
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (!loaded) return;
    const canvas = canvasRef.current as any;
    if (!canvas || !canvas.__render) return;
    if (rafRef.current) return; // already scheduled this frame
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = null;
      canvas.__render(v * (FRAME_COUNT - 1));
    });
  });

  return (
    <>
      <LoadingScreen progress={progress} done={loaded} />

      {/* ~400vh scroll runway; canvas pins inside it */}
      <section
        ref={sectionRef}
        id="top"
        className="relative h-[420vh] w-full bg-void"
      >
        <div className="sticky top-0 h-screen w-full overflow-hidden bg-void">
          {/* Warm radial glow behind the machine */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 z-0"
            style={{
              background:
                "radial-gradient(60% 55% at 50% 48%, rgba(21,16,10,0.9) 0%, rgba(10,8,5,0.5) 35%, #000000 72%)",
            }}
          />

          <motion.canvas
            ref={canvasRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: loaded ? 1 : 0 }}
            transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 z-0 h-full w-full"
          />

          {/* Center scrim — darkens the bed behind pinned text while letting the
              machine show at the edges. Above canvas (z-0), below text (z-20). */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 z-10"
            style={{
              background:
                "radial-gradient(ellipse 90% 70% at 50% 50%, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.55) 35%, rgba(0,0,0,0) 72%)",
            }}
          />

          {/* Subtle vignette for depth */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 z-[15]"
            style={{
              background:
                "radial-gradient(120% 90% at 50% 50%, transparent 55%, rgba(0,0,0,0.55) 100%)",
            }}
          />

          {/* Storytelling overlays, pinned over the canvas */}
          <StoryBeats progress={scrollYProgress} />
        </div>
      </section>
    </>
  );
}
