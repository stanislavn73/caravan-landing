"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "motion/react";

const VIDEO_SRC = "/landing-video.webm";
const POSTER_SRC = "/landing-video-poster.webp";

function scheduleIdle(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  const ric = window.requestIdleCallback;
  if (typeof ric === "function") {
    const id = ric(callback, { timeout: 2500 });
    return () => window.cancelIdleCallback?.(id);
  }
  const id = window.setTimeout(callback, 200);
  return () => window.clearTimeout(id);
}

export function HeroVideoBackground() {
  const videoRef = useRef<HTMLVideoElement>(null);
  /** First frame decoded — show video without opacity animation (blending with poster looks stuttery). */
  const [videoReady, setVideoReady] = useState(false);

  const attachAndPlay = useCallback(() => {
    const el = videoRef.current;
    if (!el || el.src) return;

    el.src = VIDEO_SRC;
    el.load();
    void el.play().catch(() => {
      /* autoplay may be deferred; poster stays visible */
    });
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) return;

    return scheduleIdle(attachAndPlay);
  }, [attachAndPlay]);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;

    const onVis = () => {
      if (document.visibilityState === "hidden") el.pause();
      else if (el.src) void el.play().catch(() => {});
    };
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);

  return (
    <div className="absolute inset-0 isolate">
      <video
        ref={videoRef}
        className={`pointer-events-none absolute inset-0 z-1 h-full w-full object-cover backface-hidden transform-gpu ${
          videoReady ? "opacity-100" : "opacity-0"
        }`}
        muted
        playsInline
        loop
        preload="none"
        aria-hidden
        onLoadedData={() => setVideoReady(true)}
      />

      <div
        className={`absolute inset-0 z-2 ${videoReady ? "hidden" : ""}`}
        aria-hidden
      >
        <Image
          src={POSTER_SRC}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </div>

      <div className="absolute inset-0 z-3 bg-black/50 pointer-events-none" />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute bottom-24 left-1/2 transform -translate-x-1/2 z-20 pointer-events-none"
        aria-hidden
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="w-6 h-10 border-2 border-white/50 rounded-full flex items-start justify-center p-2"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="w-1.5 h-1.5 bg-white rounded-full"
          />
        </motion.div>
      </motion.div>
    </div>
  );
}
